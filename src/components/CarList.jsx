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
  
      // Eliminar las imágenes del almacenamiento
      for (const image of carToDelete.images) {
        const imageName = image.id;
        const storageRef = firebase.storage().ref().child(imageName);
        await storageRef.delete();
      }
  
      // Eliminar la entrada en Firestore
      await carCollection.doc(carToDelete.id).delete();
  
      const updatedCars = [...cars];
      updatedCars.splice(index, 1); // Elimina el elemento del estado local
      setCars(updatedCars);
    } catch (error) {
      console.error('Error al eliminar el automóvil:', error);
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
    <img src={image.url} alt={`${car.make} ${car.model}`} />
  </div>
))}

            </Carousel>
            <div className="car-info">
              <p>
                <strong>Make:</strong> {car.make} <br />
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

