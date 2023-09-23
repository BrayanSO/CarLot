import React, { useState } from 'react';
import "../Styles/CarFstyle.css";
import db from '../Store/firebase';
import firebase from 'firebase/compat/app';
var storage = firebase.app().storage("gs://my-custom-bucket");

const Identify = ({ onSearch }) => {
  const [formData, setFormData] = useState({ make: '', style: '', model: '', transmission: '', price: '', images: [] });
  const [newMake, setNewMake] = useState(''); // Estado para la nueva marca
  const [newModel, setNewModel] = useState(''); // Estado para el nuevo modelo
  const [makes, setMakes] = useState(['Toyota', 'Ford', 'Honda']); // Estado para las marcas existentes
  const [models, setModels] = useState([]); // Estado para los modelos existentes
  const [showNewMakeField, setShowNewMakeField] = useState(false); // Estado para mostrar u ocultar el campo de nueva marca
  const [showNewModelField, setShowNewModelField] = useState(false); // Estado para mostrar u ocultar el campo de nuevo modelo

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === "make") {
      if (value === "NuevaMarca") {
        setShowNewMakeField(true); // Mostrar el campo de entrada de nueva marca
        setShowNewModelField(false); // Ocultar el campo de entrada de nuevo modelo
        setFormData({ ...formData, make: '' }); // Limpia la selección anterior
        setNewMake(''); // Limpia el campo de entrada de nueva marca
        setNewModel(''); // Limpia el campo de entrada de nuevo modelo
      } else {
        setShowNewMakeField(false); // Ocultar el campo de entrada de nueva marca
        setShowNewModelField(false); // Ocultar el campo de entrada de nuevo modelo
        setFormData({ ...formData, make: value });
      }
    } else if (name === "model") {
      if (value === "NuevoModelo") {
        setShowNewModelField(true); // Mostrar el campo de entrada de nuevo modelo
        setFormData({ ...formData, model: '' }); // Limpia la selección anterior
        setNewModel(''); // Limpia el campo de entrada de nuevo modelo
      } else {
        setShowNewModelField(false); // Ocultar el campo de entrada de nuevo modelo
        setFormData({ ...formData, model: value });
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleImageChange = (event) => {
    const imageFiles = event.target.files;
    const imageUrls = Array.from(imageFiles).map((file) => URL.createObjectURL(file));
    setFormData({ ...formData, images: [...formData.images, ...imageUrls] });
  };

  const handleNewMake = () => {
    if (newMake) {
      // Si hay una nueva marca, agrégala a las opciones de marca
      setMakes([...makes, newMake]);
      setFormData({ ...formData, make: newMake }); // Establece la nueva marca en el formulario
      setNewMake(''); // Limpia el campo de entrada de nueva marca
    }
  };
  const handleNewModel = () => {
    if (newModel) {
      // Si hay un nuevo modelo, agrégalo a las opciones de modelo
      setModels([...models, newModel]);
      setFormData({ ...formData, model: newModel }); // Establece el nuevo modelo en el formulario
      setNewModel(''); // Limpia el campo de entrada de nuevo modelo
    }
  };

  const handleSubmit = () => {
    if (onSearch) {
      onSearch(formData);
    } else {
      // Si es una publicación de anuncio, puedes agregar datos a Firestore.
      // Suponiendo que tienes una colección "cars" en Firestore.
      db.collection('cars')
        .add(formData)
        .then(() => {
          console.log('Datos del automóvil agregados a Firestore correctamente.');
          // Limpia el formulario u realiza otras acciones después de enviar los datos con éxito.
          setFormData({ make: '', style: '', model: '', price: '', transmission: '', images: [] });
        })
        .catch((error) => {
          console.error('Error al agregar datos del automóvil a Firestore:', error);
        });
        // Obtiene la referencia al Storage de Firebase
const storageRef = storage.ref();

// Itera sobre las imágenes y las carga al Storage
formData.images.forEach((image) => {
  // Genera un nombre único para cada imagen
  const imageName = `${Date.now()}_${image.name}`;

  // Crea una referencia para la imagen en el Storage
  const imageRef = storageRef.child(imageName);

  // Sube la imagen al Storage
  imageRef.put(image)
    .then((snapshot) => {
      console.log('Imagen cargada al Storage de Firebase correctamente.');
      // Aquí puedes realizar cualquier acción adicional después de cargar la imagen
    })
    .catch((error) => {
      console.error('Error al cargar la imagen al Storage de Firebase:', error);
    });
});
    }
  };

  return (
    <div className="car-form-container">
      <h1>{onSearch ? 'Search for Cars' : 'Post new ad'}</h1>
      <form className="car-form">
        <div className="form-group">
          <label>Make:</label>
          <select name="make" value={formData.make} onChange={handleInputChange}>
            <option value="">Select Make</option>
            {makes.map((makeOption) => (
              <option key={makeOption} value={makeOption}>
                {makeOption}
              </option>
            ))}
            <option value="NuevaMarca">Nueva Marca</option> {/* Opción para agregar una nueva marca */}
          </select>
        </div>
        {showNewMakeField && (
          <div className="form-group">
            <label>Nueva Marca:</label>
            <input
              type="text"
              name="newMake"
              value={newMake}
              onChange={(event) => setNewMake(event.target.value)}
            />
            <button type="button" onClick={handleNewMake}>Agregar Nueva Marca</button>
          </div>
        )}
<div className="form-group">
          <label>Model:</label>
          <select name="model" value={formData.model} onChange={handleInputChange}>
            <option value="">Select Model</option>
            {models.map((modelOption) => (
              <option key={modelOption} value={modelOption}>
                {modelOption}
              </option>
            ))}
            <option value="NuevoModelo">Nuevo Modelo</option> {/* Opción para agregar un nuevo modelo */}
            {/* Agrega opciones de modelo según la marca seleccionada */}
            {formData.make === 'Toyota' && (
              <>
                <option value="Camry">Camry</option>
                <option value="Corolla">Corolla</option>
                {/* Agrega más modelos de Toyota según tus necesidades */}
              </>
            )}
            {formData.make === 'Ford' && (
              <>
                <option value="F-150">F-150</option>
                <option value="Escape">Escape</option>
                {/* Agrega más modelos de Ford según tus necesidades */}
              </>
            )}
            {formData.make === 'Honda' && (
              <>
                <option value="Civic">Civic</option>
                <option value="Accord">Accord</option>
                {/* Agrega más modelos de Honda según tus necesidades */}
              </>
            )}
          </select>
        </div>
        {showNewModelField && (
          <div className="form-group">
            <label>Nuevo Modelo:</label>
            <input
              type="text"
              name="newModel"
              value={newModel}
              onChange={(event) => setNewModel(event.target.value)}
            />
            <button type="button" onClick={handleNewModel}>Agregar Nuevo Modelo</button>
          </div>
        )}


        <div className="form-group">
          <label>Style:</label>
          <select  name="style" value={formData.style} onChange={handleInputChange} >
          <option value="">Select Style</option>
          <option value="Sedan">Sedan</option>
          <option value="Hatchback">Hastback</option>
          <option value="Suv">SUV</option>
          </select>
        </div>
        <div className="form-group">
          <label>Transmission:</label>
          <select  name="transmission" value={formData.transmission} onChange={handleInputChange}>
          <option value="">Select Model</option>
          <option value="Manual">Manual</option>
          <option value="Automatic">Automatic</option>
          <option value="CVT Automatic">CVT Automatic</option>
          </select>
        </div>
        

        <div className="form-group">
          <label>Price:</label>
          <input type="number" placeholder="$" name="price" value={formData.price} onChange={handleInputChange} />
        </div>
        
        {!onSearch && (
  <div className="form-group">
    <label>Photos:</label> <br/>
    <input type="file" name="image" accept="image/*" onChange={handleImageChange} multiple={true} />
  </div>
)}

        {formData.images.length > 0 && !onSearch && (
          <div className="image-preview">
            {formData.images.map((imageUrl, index) => (
              <img key={index} src={imageUrl} alt={`Preview ${index}`} />
            ))}
          </div>
        )}

        <button type="button" onClick={handleSubmit} className="submit-button">
          {onSearch ? 'Search' : 'Post Ad'}
        </button>
      </form>
    </div>
  );
};

export default Identify;
