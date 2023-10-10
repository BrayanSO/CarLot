import db from '../Store/firebase';



const deleteCollection = async (collectionRef, referencesCollection, referenceField) => {
  const batchSize = 10;
  const query = collectionRef.orderBy('__name__').limit(batchSize);

  return new Promise((resolve, reject) => {
    deleteQueryBatch(query, batchSize, resolve, reject);
  }).then(async () => {
    // Verificar si la colección de modelos está referenciada por documentos en la colección de cars
    const referencesQuerySnapshot = await referencesCollection.where(referenceField, '==', true).get();
    if (referencesQuerySnapshot.empty) {
      // Si no hay referencias, eliminar la colección de modelos
      return deleteCollection(collectionRef);
    }
  });
};

const deleteQueryBatch = (query, batchSize, resolve, reject) => {
  query.get().then((snapshot) => {
    if (snapshot.size === 0) {
      resolve();
      return;
    }

    const batch = db.batch();
    snapshot.docs.forEach((doc) => {
      batch.delete(doc.ref);
    });

    batch.commit().then(() => {
      setTimeout(() => {
        deleteQueryBatch(query, batchSize, resolve, reject);
      }, 0); // Agregar un pequeño retraso para asegurar que sea asíncrono
    });
  }).catch(reject);
};


// Utilizar deleteCollection para eliminar la colección de marcas
const brandCollection = db.collection('brands');
deleteCollection(brandCollection, db.collection('cars'), 'brandReference')
  .then(() => {
    console.log('Colección de marcas eliminada con éxito');
  })
  .catch((error) => {
    console.error('Error al eliminar la colección de marcas:', error);
  });

// Utilizar deleteCollection para eliminar la colección de modelos
const modelCollection = db.collection('models');
deleteCollection(modelCollection, db.collection('cars'), 'modelReference')
  .then(() => {
    console.log('Colección de modelos eliminada con éxito');
  })
  .catch((error) => {
    console.error('Error al eliminar la colección de modelos:', error);
  });

  
export default deleteCollection;
