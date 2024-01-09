import React, { useState, useEffect } from 'react';
import "../Styles/CarFstyle.css";
import { SearchCars } from '../components/CarSearch';
import CarList from "../components/CarList";
import axios from 'axios';

const Identify = ({ onSearch }) => {
  const [formData, setFormData] = useState({
    brandId: '', modelId: '', style: '', transmission: '', price: '', fuel: '', kilometres: '', doors: '', images: []
  });

  const [newBrand, setNewBrand] = useState('');
  const [newModel, setNewModel] = useState('');
  const [brands, setBrands] = useState([]);
  const [models, setModels] = useState([]);
  const [showNewBrandField, setShowNewBrandField] = useState(false);
  const [showNewModelField, setShowNewModelField] = useState(false);
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const brandsResponse = await axios.get("http://localhost:3001/brands");
        setBrands(brandsResponse.data);

        const modelsResponse = await axios.get("http://localhost:3001/models");
        setModels(modelsResponse.data);
      } catch (error) {
        console.error('Error al cargar la lista de marcas y modelos:', error);
      }
    };

    fetchData();
  }, []);

  const handleButtonAction = () => {
    const carData = { ...formData, brandId: formData.brandId, modelId: formData.modelId };
  
    if (onSearch) {
      SearchCars(carData)
        .then((results) => {
          setSearchResults(results);
        });
    } else {
      axios.post("http://localhost:3001/create", carData)
        .then(() => {
          alert("Carro registrado");
          // Puedes realizar alguna acción adicional después de agregar el carro
        })
        .catch((error) => {
          console.error('Error al registrar el carro:', error);
        });
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    if (name === "brandId") {
      if (value === "NuevaMarca") {
        setShowNewBrandField(true);
        setShowNewModelField(false);
        setFormData({ ...formData, brandId: '' });
        setNewBrand('');
        setNewModel('');
      } else {
        setShowNewBrandField(false);
        setShowNewModelField(false);
        setFormData({ ...formData, brandId: value });
      }
    } else if (name === "modelId") {
      if (value === "NuevoModelo") {
        setShowNewModelField(true);
        setFormData({ ...formData, modelId: '' });
        setNewModel('');
      } else {
        setShowNewModelField(false);
        setFormData({ ...formData, modelId: value });
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleNewBrand = async () => {
    if (newBrand) {
      try {
        const response = await axios.post("http://localhost:3001/brands", { name: newBrand });
        const newBrandId = response.data.id;
  
        const updatedBrands = await axios.get("http://localhost:3001/brands");
        setBrands(updatedBrands.data);
  
        setFormData({ ...formData, brandId: newBrandId });
        setNewBrand('');
      } catch (error) {
        console.error('Error al guardar la nueva marca:', error);
      }
    }
  };  

  const handleNewModel = async () => {
  if (newModel && formData.brandId) {
    try {
      const response = await axios.post("http://localhost:3001/models", {
        name: newModel,
        brandId: formData.brandId, // Establece la relación con la marca seleccionada
      });

      const newModelId = response.data.id;
      const updatedModels = await axios.get("http://localhost:3001/models");
      setModels(updatedModels.data);

      setFormData({ ...formData, modelId: newModelId });
      setNewModel('');
    } catch (error) {
      console.error('Error al guardar el nuevo modelo:', error);
    }
  }
};

  const handleImageChange = (event) => {
    const imageFiles = event.target.files;
    const imageArray = Array.from(imageFiles).map((file) => ({
      id: file.name,
      url: URL.createObjectURL(file),
    }));
    setFormData({ ...formData, images: imageArray });
  };

  return (
    <div className="car-form-container">
      <h1>{onSearch ? 'Search for Cars' : 'Post new ad'}</h1>
      <form className="car-form">
        <div className="form-group">
          
          <label>Brand:</label>
          <select name="brandId" value={formData.brandId} onChange={handleInputChange}>
            <option key="" value="">Select brand</option>
            {brands.map((brandOption) => (
              <option key={brandOption.id} value={brandOption.id}>
                {brandOption.name}
              </option>
            ))}
            {!onSearch && <option key="NuevaMarca" value="NuevaMarca">Nueva Marca</option>}
          </select>
        </div>

        {showNewBrandField && (
          <div className="form-group">
            <label>Nueva Marca:</label>
            <input
              type="text"
              name="newBrand"
              value={newBrand}
              onChange={(event) => setNewBrand(event.target.value)}
            />
            <button type="button" onClick={handleNewBrand}>Agregar Nueva Marca</button>
          </div>
        )}

        <div className="form-group">
          <label>Model:</label>
          <select name="modelId" value={formData.modelId} onChange={handleInputChange}>
            <option value="">Select Model</option>
            {models.map((modelOption) => (
              <option key={modelOption.id} value={modelOption.id}>
                {modelOption.name}
              </option>
            ))}
            {!onSearch && <option key="NuevoModelo" value="NuevoModelo">Nuevo Modelo</option>}
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
          <div />
          <div className="form-group">
          <label>kilometres:</label>
          <input type="number" placeholder="" name="kilometres" value={formData.kilometres} onChange={handleInputChange} />
        </div>
        </div>
        {!onSearch && (
          <div className="form-group">
            <label>Photos:</label> <br />
            <input type="file" name="image" accept="image/*" multiple={true} onChange={handleImageChange} />
          </div>
        )}

{formData.images.length > 0 && !onSearch && (
      <div className="image-preview">
        {formData.images.map((image) => (
      <img key={image.id} src={image.url} alt={image.id} />
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
              {searchResults.map((result , index) => (
                <CarList key={result.id} data={result} />
              ))}
            </div>
          
        </div>
      )}
        
      </form>
    </div>
  );
};

export default Identify;
