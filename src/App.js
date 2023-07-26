import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [cars, setCars] = useState([]);
  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');
  const [imageURL, setImageURL] = useState('');

  useEffect(() => {
    // Obtener la lista de autos desde el servidor al cargar la página
    axios.get('/api/cars')
      .then((response) => setCars(response.data))
      .catch((error) => console.error('Error al obtener la lista de autos:', error));
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();

    // Agregar el nuevo auto al servidor
    axios.post('/api/cars', {
      brand,
      model,
      imageURLs: [imageURL],
    })
      .then(() => {
        // Actualizar la lista de autos en el cliente
        axios.get('/api/cars')
          .then((response) => setCars(response.data))
          .catch((error) => console.error('Error al obtener la lista de autos:', error));

        // Limpiar el formulario
        setBrand('');
        setModel('');
        setImageURL('');
      })
      .catch((error) => console.error('Error al agregar el auto:', error));
  };

  return (
    <div>
      <header>
        <h1>Página de Venta de Autos</h1>
      </header>

      <main>
        <section id="car-list">
          <h2>Lista de Autos</h2>
          {cars.map((car) => (
            <div key={car.id} className="car-card">
              <img src={car.image_url} alt={`${car.brand} ${car.model}`} />
              <p>{`Marca: ${car.brand}\nModelo: ${car.model}`}</p>
            </div>
          ))}
        </section>

        <section id="car-form">
          <h2>Formulario de Autos</h2>
          <form onSubmit={handleSubmit}>
            <label htmlFor="brand">Marca:</label>
            <input type="text" id="brand" value={brand} onChange={(e) => setBrand(e.target.value)} required />

            <label htmlFor="model">Modelo:</label>
            <input type="text" id="model" value={model} onChange={(e) => setModel(e.target.value)} required />

            <label htmlFor="imageURL">URL de la imagen:</label>
            <input type="text" id="imageURL" value={imageURL} onChange={(e) => setImageURL(e.target.value)} required />

            <button type="submit">Guardar</button>
          </form>
        </section>
      </main>
    </div>
  );
}

export default App