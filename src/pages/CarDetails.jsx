import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // Importa useParams para obtener los parámetros de la URL
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import firebase from 'firebase/compat/app'; // Asegúrate de importar Firebase correctamente
import "../Styles/CarDetails.css"

const CarDetails = () => {
  const { id } = useParams(); // Obtén el ID del automóvil desde la URL
  const [cars, setCars] = useState([]); // Estado para almacenar los detalles de los autos

  useEffect(() => {
    // Obtener la lista de autos desde Firebase Firestore
    const db = firebase.firestore();
    const carCollection = db.collection('cars');

    const fetchData = async () => {
      try {
        const querySnapshot = await carCollection.get();
        const carsData = [];

        querySnapshot.forEach((doc) => {
          carsData.push({ id: doc.id, ...doc.data() });
        });
        setCars(carsData);
      } catch (error) {
        console.error('Error al obtener datos de automóviles desde Firestore:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="car-list-container">
      {cars.map((car, index) => {
        if (car.id === id) { // Verifica si el automóvil coincide con el ID seleccionado
          return (
            <div key={index} className="car-card-container">
              <Carousel autoPlay interval={3000} showThumbs={false}>
                {car.images.map((image, imageIndex) => (
                  <div key={image.id}>
                    <img src={image.url} alt={`${car.brand} ${car.model}`} />
                  </div>
                ))}
              </Carousel>
              <div className="car-info">
                <p>
                  <strong>Brand:</strong> {car.brand} <br />
                  <strong>Model:</strong> {car.model} <br />
                  <strong>Price:</strong> ${car.price} <br />
                  <strong>Style:</strong> {car.style} <br />
                  <strong>Transmission:</strong> {car.transmission} <br />
                  <strong>Fuel:</strong> {car.fuel} <br/>
                  <strong>Doors:</strong> {car.doors} <br/>
                  <strong>Kilometres:</strong> {car.kilometres} <br/>

                  
                  
                </p>
              </div>
            </div>
          );
        }
        return null;
      })}
    </div>
  );
};

export default CarDetails;
