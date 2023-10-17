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

  useEffect(() => {
    // Realiza una solicitud GET para obtener la lista de coches
    axios.get("http://localhost:3001/cars")
      .then((response) => {
        setCars(response.data);
      })
      .catch((error) => {
        console.error('Error fetching cars:', error);
      });
  }, []);

  const handleDeleteClick = (index) => {
    const carToDelete = cars[index];
    
    // Realiza una solicitud DELETE para eliminar el coche por su ID
    axios.delete(`http://localhost:3001/cars/${carToDelete.id}`)
      .then(() => {
        const updatedCars = [...cars];
        updatedCars.splice(index, 1); // Elimina el coche del estado local
        setCars(updatedCars);
      })
      .catch((error) => {
        console.error('Error deleting the car:', error);
      });
  };
  const isLoggedIn = firebase.auth().currentUser !== null;

  return (
    <div className="car-list-container">
      <Canvas />
      <div className="car-card-container">
      {cars !== null && cars.map((car, index) => (
          <div key={car.id} className="car-card">
            <Carousel autoPlay interval={3000} showThumbs={false}>
            </Carousel>
            <div className="car-info">
              <p>
                <strong>brand:</strong> {car.brand} <br />
                <strong>Model:</strong> {car.model} <br />
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
