const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');

const app = express();
const port = 4000;

// Crear una conexión a la base de datos
const db = new sqlite3.Database('cars.db');

// Crear la tabla "cars" si no existe
db.run(`
  CREATE TABLE IF NOT EXISTS cars (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    brand TEXT NOT NULL,
    model TEXT NOT NULL,
    image_url TEXT NOT NULL
  )
`);

// Middleware para parsear el cuerpo de las peticiones en formato JSON
app.use(bodyParser.json());

// Obtener todos los autos de la base de datos
app.get('/api/cars', (req, res) => {
  db.all('SELECT * FROM cars', (err, rows) => {
    if (err) {
      console.error('Error al obtener los autos:', err.message);
      res.status(500).send({ error: 'Error al obtener los autos' });
    } else {
      res.json(rows);
    }
  });
});

// Agregar un auto a la base de datos
app.post('/api/cars', (req, res) => {
  const { brand, model, imageURLs } = req.body;
  db.run('INSERT INTO cars (brand, model, image_url) VALUES (?, ?, ?)', [brand, model, imageURLs[0]], (err) => {
    if (err) {
      console.error('Error al agregar el auto:', err.message);
      res.status(500).send({ error: 'Error al agregar el auto' });
    } else {
      res.send({ message: 'Auto agregado correctamente a la base de datos.' });
    }
  });
});

app.listen(port, () => {
  console.log(`Servidor en funcionamiento en http://localhost:${port}`);
});