import db from '../Store/firebase';

export const SearchCars = async (formData) => {
  try {
    let query = db.collection('cars');

    if (formData.brand) {
      query = query.where('brands', '==', formData.name);
    }

    if (formData.model) {
      query = query.where('models', '==', formData.name);
    }

    // Agrega otras condiciones de búsqueda según los campos de formData

    const querySnapshot = await query.get();
    const results = [];
    querySnapshot.forEach((doc) => {
      results.push(doc.data());
    });

    return results;
  } catch (error) {
    console.error('Error en la búsqueda de automóviles:', error);
    return [];
  }
};
