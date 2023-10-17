import React, { useState  } from 'react';
import "../Styles/CarFstyle.css";
import db from '../Store/firebase';
import firebase from 'firebase/compat/app';
import { SearchCars } from '../components/CarSearch';
import CarList from "../components/CarList"
import axios from 'axios';

const Identify = ({ onSearch }) => {
  const [formData, setFormData] = useState({ brand: '', style: '', model: '', transmission: '', price: '', fuel:'' , kilometres:'', doors:'',  images: [] });
 
  const [newbrand, setNewbrand] = useState('');
  const [newModel, setNewModel] = useState('');
  const [brands, setbrands] = useState(['Toyota', 'Ford', 'Honda']);
  const [models, setModels] = useState([]);
  const [showNewbrandField, setShowNewbrandField] = useState(false);
  const [showNewModelField, setShowNewModelField] = useState(false);
  const [searchResults, setSearchResults] = useState([]);

  const addcar = ()=>{
    axios.post("http://localhost:3001/create", formData).then(() => {
  alert("Carro registrado");
})
  }
  

  
  const handleButtonAction = () => {
    if (onSearch) {
      // Realizar la búsqueda de automóviles utilizando la función importada
      SearchCars(formData)
        .then((results) => {
          setSearchResults(results);
        });
    } else {
      // Lógica para publicar el anuncio
      addcar(formData); // Llama a sendDataToDatabase
    }
  };
  


  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === "brand") {
      if (value === "NuevaMarca") {
        setShowNewbrandField(true);
        setShowNewModelField(false);
        setFormData({ ...formData, brand: '' });
        setNewbrand('');
        setNewModel('');
      } else {
        setShowNewbrandField(false);
        setShowNewModelField(false);
        setFormData({ ...formData, brand: value });
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
  

  const handleNewbrand = async () => {
    if (newbrand) {
      const brandRef = await db.collection('brands').add({ name: newbrand });
      setbrands([...brands, newbrand]);
      setFormData({ ...formData, brand: brandRef.id });
      setNewbrand('');
    }
  };

  const handleNewModel = async () => {
    if (newModel) {
      const modelRef = await db.collection('models').add({ name: newModel });
      setModels([...models, newModel]);
      setFormData({ ...formData, model: modelRef.id });
      setNewModel('');
    }
  };


  return (
    <div className="car-form-container">
      <h1>{onSearch ? 'Search for Cars' : 'Post new ad'}</h1>
      <form className="car-form">
        <div className="form-group">
          <label>brand:</label>
          <select name="brand" value={formData.brand} onChange={handleInputChange}>
            <option value="">Select brand</option>
            {brands.map((brandOption) => (
              <option key={brandOption} value={brandOption}>
                {brandOption}
              </option>
            ))}
          {onSearch ? null:  <option value="NuevaMarca">Nueva Marca</option>}
          </select>
        </div>
        {showNewbrandField && (
          <div className="form-group">
            <label>Nueva Marca:</label>
            <input
              type="text"
              name="newbrand"
              value={newbrand}
              onChange={(event) => setNewbrand(event.target.value)}
            />
            <button type="button" onClick={handleNewbrand}>Agregar Nueva Marca</button>
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
            {formData.brand === 'Toyota' && (
              <>
                <option value="Camry">Camry</option>
                <option value="Corolla">Corolla</option>
              </>
            )}
            {formData.brand === 'Ford' && (
              <>
                <option value="F-150">F-150</option>
                <option value="Escape">Escape</option>
              </>
            )}
            {formData.brand === 'Honda' && (
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

        <button type="button"  onClick={handleButtonAction} className="submit-button">
          {onSearch ? 'Search' : 'Post Ad'}
        </button>
        {onSearch && searchResults.length > 0 && (
        <div className="search-results">
          <h2>Search Results</h2>
          <div className="card-container">
              {searchResults.map((result, index) => (
                <CarList key={index} data={result} />
              ))}
            </div>
          
        </div>
      )}
        
      </form>
    </div>
  );
};

export default Identify;
