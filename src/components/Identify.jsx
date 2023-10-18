import React, { useState, useEffect  } from 'react';
import "../Styles/CarFstyle.css";
import { SearchCars } from '../components/CarSearch';
import CarList from "../components/CarList"
import axios from 'axios';

const Identify = ({ onSearch }) => {
  const [formData, setFormData] = useState({ brand: '', style: '', model: '', transmission: '', price: '', fuel:'' , kilometres:'', doors:'',  images: [] });
 
  const [newbrand, setNewbrand] = useState('');
  const [newModel, setNewModel] = useState('');
  const [brands, setbrands] = useState([]);
  const [models, setModels] = useState([]);
  const [showNewbrandField, setShowNewbrandField] = useState(false);
  const [showNewModelField, setShowNewModelField] = useState(false);
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    // Cargar la lista de marcas
    axios.get("http://localhost:3001/brands")
      .then((response) => {
        setbrands(response.data);
      })
      .catch((error) => {
        console.error('Error al cargar la lista de marcas:', error);
      });

    // Cargar la lista de modelos
    axios.get("http://localhost:3001/models")
      .then((response) => {
        setModels(response.data);
      })
      .catch((error) => {
        console.error('Error al cargar la lista de modelos:', error);
      });
  }, []);

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


  const handleNewbrand = async () => {
    if (newbrand) {
      // Verificar si la marca ya existe
      const isBrandExists = brands.some((brand) => brand.name === newbrand);
  
      if (isBrandExists) {
        // La marca ya existe, muestra una alerta
        alert("La marca ya existe");
      } else {
        // La marca no existe, puedes agregarla
        axios.post("http://localhost:3001/brands", { name: newbrand })
          .then((response) => {
            // Obtén la ID de la marca creada desde la respuesta del servidor (si la devuelve).
            const newBrandId = response.data.id; // Ajusta esto según la estructura de respuesta de tu API.
            setbrands([...brands, { id: newBrandId, name: newbrand }]); // Agregar la marca a la lista de marcas
            setFormData({ ...formData, brand: newBrandId });
            setNewbrand('');
          })
          .catch((error) => {
            console.error('Error al guardar la nueva marca:', error);
          });
      }
    }
  };
  
  
  const handleNewModel = async () => {
    if (newModel) {
      // Verificar si el modelo ya existe
      const isModelExists = models.some((model) => model.name === newModel);
  
      if (isModelExists) {
        // El modelo ya existe, muestra una alerta
        alert("El modelo ya existe");
      } else {
        // El modelo no existe, puedes agregarlo
        axios.post("http://localhost:3001/models", { name: newModel })
          .then((response) => {
            // Obtén la ID del modelo creado desde la respuesta del servidor (si la devuelve).
            const newModelId = response.data.id; // Ajusta esto según la estructura de respuesta de tu API.
            setModels([...models, { id: newModelId, name: newModel }]); // Agregar el modelo a la lista de modelos
            setFormData({ ...formData, model: newModelId });
            setNewModel('');
          })
          .catch((error) => {
            console.error('Error al guardar el nuevo modelo:', error);
          });
      }
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
             <option key={brandOption.id} value={brandOption.name}>
                {brandOption.name}
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
              <option key={modelOption.id} value={modelOption.name}>
                {modelOption.name}
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
            <input type="file" name="image" accept="image/*" multiple={true} />
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
