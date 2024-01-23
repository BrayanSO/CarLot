import React, { useState, useEffect } from 'react';
import "../Styles/CarListSyle.css";
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import Canvas from './OffCanvas';
import { Link } from 'react-router-dom';
import axios from 'axios';
import firebase from 'firebase/compat/app';



const CarList = () => {
  const [cars, setCars] = useState([]);
  const [brands, setBrands] = useState([]);
  const [models, setModels] = useState([]);

  useEffect(() => {
    // Realiza una solicitud GET para obtener la lista de coches
    axios.get('/cars')
      .then((response) => {
        setCars(response.data);
      })
      .catch((error) => {
        console.error('Error fetching cars:', error);
      });

    // Realiza una solicitud GET para obtener la lista de marcas
    axios.get("/brands")
      .then((response) => {
        setBrands(response.data);
      })
      .catch((error) => {
        console.error('Error fetching brands:', error);
      });

    // Realiza una solicitud GET para obtener la lista de modelos
    axios.get("/models")
      .then((response) => {
        setModels(response.data);
      })
      .catch((error) => {
        console.error('Error fetching models:', error);
      });
  }, []);

  const handleDeleteClick = async (index) => {
    const carToDelete = cars[index];

    // Verificar si la marca y el modelo del automóvil están en uso por otros automóviles.
    const brandInUse = cars.some((car) => car.brand === carToDelete.brand);
    const modelInUse = cars.some((car) => car.model === carToDelete.model);

    // Mostrar un cuadro de diálogo de confirmación antes de eliminar
    let isConfirmed = true;

    if (brandInUse || modelInUse) {
      isConfirmed = window.confirm(
        "Esta marca o modelo está siendo utilizada por otros automóviles. ¿Aún deseas eliminar este automóvil?"
      );
    }

    if (isConfirmed) {
      try {
        // Realiza una solicitud DELETE para eliminar el coche por su ID
        await axios.delete(`/cars/${carToDelete.id}`);
        const updatedCars = [...cars];
        updatedCars.splice(index, 1); // Elimina el coche del estado local
        setCars(updatedCars); // Actualiza la vista eliminando el coche

        // Si la marca y el modelo no están en uso, elimina también de la lista de marcas y modelos
        if (!brandInUse) {
          // Realiza una solicitud DELETE para eliminar la marca (ajusta la URL según tu API)
          await axios.delete(`/brands/${carToDelete.brand}`);
          // Actualiza la lista de marcas local
          const updatedBrands = brands.filter((brand) => brand.id !== carToDelete.brand);
          setBrands(updatedBrands);
        }

        if (!modelInUse) {
          // Realiza una solicitud DELETE para eliminar el modelo (ajusta la URL según tu API)
          await axios.delete(`/models/${carToDelete.model}`);
          // Actualiza la lista de modelos local
          const updatedModels = models.filter((model) => model.id !== carToDelete.model);
          setModels(updatedModels);
        }
      } catch (error) {
        console.error('Error deleting the car:', error);
      }
    }
  };

  const isLoggedIn = firebase.auth().currentUser !== null;

  return (
    <div className="car-list-container">
      <Canvas />
      <div className="car-card-container">
      {cars !== null && cars.map((car, index) => (
        <div key={car.id} className="car-card">
          <Carousel key={`carousel-${car.id}`} autoPlay interval={3000} showThumbs={false}>
          {Array.isArray(car.images) && car.images.map((image, imgIndex) => (
  <div key={`image-${imgIndex}`}>
    <img src={image} alt={`Car ${index + 1} - ${imgIndex + 1}`} />
  </div>
))}

          </Carousel>
            <div className="car-info">
              <p>
              <strong>Brand:</strong> {brands.find(brand => brand.id === car.brand_id)?.name || "Unknown Brand"} <br />
              <strong>Model:</strong> {models.find(model => model.id === car.model_id)?.name || "Unknown Model"} <br />
                <strong>Price :</strong> ${car.price}<br/>
                <strong>Style :</strong> {car.style}<br/>
                <strong>Transmission :</strong> {car.transmission}<br/>
              </p>
              <Link to={`/CarDetails/${car.id}`}>
                <button>Details</button>
              </Link>
              {isLoggedIn && (
                <button onClick={() => handleDeleteClick(index)}>Eliminar</button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CarList;
