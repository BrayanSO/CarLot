import React, { useState, useEffect } from 'react';
import "../Styles/CarListSyle.css";
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import firebase from 'firebase/compat/app';
import Canvas from './OffCanvas';
import { Link } from 'react-router-dom';



const CarList = () => {
  const [cars, setCars] = useState([]);

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

  const handleDeleteClick = async (index) => {
  try {
    const carToDelete = cars[index];
    const db = firebase.firestore();
    const carCollection = db.collection('cars');
    const brandCollection = db.collection('brands');
    const modelCollection = db.collection('models');

    // Check if the car has a brand associated
    if (carToDelete.brand) {
      // Get the brand document
      const brandDoc = await brandCollection.doc(carToDelete.brand).get();
      if (brandDoc.exists) {
        // Check if the brand has any other associations
        const brandQuerySnapshot = await carCollection.where('brands', '==', carToDelete.brand).get();
        if (brandQuerySnapshot.empty) {
          // Delete the brand if it has no other associations
          await brandDoc.ref.delete();
        }
      }
    }

    // Check if the car has a model associated
    if (carToDelete.model) {
      // Get the model document
      const modelDoc = await modelCollection.doc(carToDelete.model).get();
      if (modelDoc.exists) {
        // Check if the model has any other associations
        const modelQuerySnapshot = await carCollection.where('models', '==', carToDelete.model).get();
        if (modelQuerySnapshot.empty) {
          // Delete the model if it has no other associations
          await modelDoc.ref.delete();
        }
      }
    }

    // Delete the car document
    await carCollection.doc(carToDelete.id).delete();

    const updatedCars = [...cars];
    updatedCars.splice(index, 1); // Remove the car from the local state
    setCars(updatedCars);
  } catch (error) {
    console.error('Error deleting the car:', error);
  }
};
  const isLoggedIn = firebase.auth().currentUser !== null;

  return (
    <div className="car-list-container">
        <Canvas/> 
      <div className="car-card-container">
        {cars.map((car, index) => (
          <div key={index} className="car-card">
            <Carousel autoPlay interval={3000} showThumbs={false}>
            {car.images.map((image, imageIndex) => (
  <div key={image.id}> {/* Utiliza el ID de la imagen como clave */}
    <img src={image.url} alt={`${car.brand} ${car.model}`} />
  </div>
))}

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

