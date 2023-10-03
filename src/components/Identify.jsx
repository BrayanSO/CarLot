import React, { useState } from 'react';
import "../Styles/CarFstyle.css";
import db from '../Store/firebase';
import firebase from 'firebase/compat/app';

const Identify = ({ onSearch }) => {
  const [formData, setFormData] = useState({ make: '', style: '', model: '', transmission: '', price: '', fuel:'' , kilometres:'', doors:'',  images: [] });
  const [newMake, setNewMake] = useState('');
  const [newModel, setNewModel] = useState('');
  const [makes, setMakes] = useState(['Toyota', 'Ford', 'Honda']);
  const [models, setModels] = useState([]);
  const [showNewMakeField, setShowNewMakeField] = useState(false);
  const [showNewModelField, setShowNewModelField] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === "make") {
      if (value === "NuevaMarca") {
        setShowNewMakeField(true);
        setShowNewModelField(false);
        setFormData({ ...formData, make: '' });
        setNewMake('');
        setNewModel('');
      } else {
        setShowNewMakeField(false);
        setShowNewModelField(false);
        setFormData({ ...formData, make: value });
      }
    } else if (name === "model") {
      if (value === "NuevoModelo") {
        setShowNewModelField(true);
        setFormData({ ...formData, model: '' });
        setNewModel('');
      } else {
        setShowNewModelField(false);
        setFormData({ ...formData, model: value });
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleImageChange = async (event) => {
    const imageFiles = event.target.files;
    const imageUrls = [];

    const storageRef = firebase.storage().ref();

    for (const file of imageFiles) {
      const imageName = `${Date.now()}_${file.name}`;

      const imageRef = storageRef.child(imageName);

      try {
        await imageRef.put(file);
        const imageUrl = await imageRef.getDownloadURL();
        imageUrls.push({ id: imageName, url: imageUrl });
      } catch (error) {
        console.error('Error al cargar la imagen al Storage de Firebase:', error);
      }
    }

    setFormData({ ...formData, images: [...formData.images, ...imageUrls] });
  };


  const handleNewMake = async () => {
    if (newMake) {
      const makeRef = await db.collection('marcas').add({ name: newMake });
      setMakes([...makes, newMake]);
      setFormData({ ...formData, make: makeRef.id });
      setNewMake('');
    }
  };

  const handleNewModel = async () => {
    if (newModel) {
      const modelRef = await db.collection('modelos').add({ name: newModel });
      setModels([...models, newModel]);
      setFormData({ ...formData, model: modelRef.id });
      setNewModel('');
    }
  };

  const handleSubmit = () => {
    if (onSearch) {
      onSearch(formData);
    } else {
      db.collection('cars')
        .add(formData)
        .then(() => {
          console.log('Datos del automóvil agregados a Firestore correctamente.');
          setFormData({ make: '', style: '', model: '', price: '', transmission: '', fuel:'', doors:'', kilometres:'', images: [] });
        })
        .catch((error) => {
          console.error('Error al agregar datos del automóvil a Firestore:', error);
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
          {onSearch ? null:  <option value="NuevaMarca">Nueva Marca</option>}
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
            {!onSearch && <option value="NuevoModelo">Nuevo Modelo</option> }
            {formData.make === 'Toyota' && (
              <>
                <option value="Camry">Camry</option>
                <option value="Corolla">Corolla</option>
              </>
            )}
            {formData.make === 'Ford' && (
              <>
                <option value="F-150">F-150</option>
                <option value="Escape">Escape</option>
              </>
            )}
            {formData.make === 'Honda' && (
              <>
                <option value="Civic">Civic</option>
                <option value="Accord">Accord</option>
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
          <select name="style" value={formData.style} onChange={handleInputChange}>
            <option value="">Select Style</option>
            <option value="Sedan">Sedan</option>
            <option value="Hatchback">Hastback</option>
            <option value="Suv">SUV</option>
          </select>
        </div>
        <div className="form-group">
          <label>Transmission:</label>
          <select name="transmission" value={formData.transmission} onChange={handleInputChange}>
            <option value="">Select Transmission</option>
            <option value="Manual">Manual</option>
            <option value="Automatic">Automatic</option>
            <option value="CVT Automatic">CVT Automatic</option>
          </select>
        </div>
        <div className="form-group">
          <label>Price:</label>
          <input type="number" placeholder="$" name="price" value={formData.price} onChange={handleInputChange} />
        </div>
        <div className="form-group">
          <label>Fuel: </label>
          <select name="fuel" value={formData.fuel} onChange={handleInputChange}>
            <option value="">Select fuel</option>
            <option value="Manual">Gasoline</option>
            <option value="Automatic">Diesel</option>
            <option value="CVT Automatic">hybrid</option>
          </select>
        </div>
        <div className="form-group">
          <label>Puertas: </label> 
          <select name="doors" value={formData.doors} onChange={handleInputChange}>
            <option value=""># doors</option>
            <option value="Manual">2 - 3 </option>
            <option value="Automatic">4 or more</option>
          </select>
          <div className="form-group">
          <label>kilometres:</label>
          <input type="number" placeholder="" name="kilometres" value={formData.kilometres} onChange={handleInputChange} />
        </div>
        </div>
        {!onSearch && (
          <div className="form-group">
            <label>Photos:</label> <br />
            <input type="file" name="image" accept="image/*" onChange={handleImageChange} multiple={true} />
          </div>
        )}
       {formData.images.length > 0 && !onSearch && (
  <div className="image-preview">
    {formData.images.map((image, index) => (
      <img key={image.id} src={image.url} alt={`Preview ${index}`} />
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
