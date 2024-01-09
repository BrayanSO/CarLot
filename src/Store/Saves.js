const express = require ("express");
const app = express ();
const mysql = require("mysql");
const cors = require("cors");
app.use(cors());
app.use(express.json());

const db = mysql.createConnection ({
  host: "localhost",
  user:"root",
  password:"",
  database:"cars_list"
});

app.post("/create",(req,res)=>{
  const brandId = req.body.brandId;
  const modelId = req.body.modelId;
 const style = req.body.style;
 const transmission = req.body.transmission;
 const  price = req.body.price;
 const fuel = req.body.fuel;
 const doors = req.body.doors;
 const kilometres = req.body.kilometres;


// Add a new post car
 db.query('INSERT INTO cars(brand_id,model_id,style,transmission,price,fuel,doors,kilometres) Values(?,?,?,?,?,?,?,?)',[brandId,modelId,style,transmission,price,fuel,doors,kilometres], (err,result)=>{
  if (err){
    console.log(err);
  } else {
    res.send("Auro Registrado con exito")
  }
 });
});

//get the posts
app.get("/cars",(req,res)=>{
  db.query('SELECT * FROM cars',
   (err,result)=>{
   if (err){
     console.log(err);
   } else {
     res.send(result);
   }
  }
  );
 });

 //get the brands
app.get("/brands", (req, res) => {
  db.query('SELECT * FROM brands', (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error al obtener la lista de marcas.");
    } else {
      res.json(result); // Enviar la lista de marcas como respuesta en formato JSON
    }
  });
});
 //get the models
 app.get("/models", (req, res) => {
  db.query('SELECT * FROM models', (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error al obtener la lista de models.");
    } else {
      res.json(result); // Enviar la lista de marcas como respuesta en formato JSON
    }
  });
});

/*

  // Realiza una consulta DELETE para eliminar el coche con el ID especificado
 app.delete("/cars/:carId", (req, res) => {
  const carId = req.params.carId;
  db.query('DELETE FROM cars WHERE id = ?', carId, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send("Error al eliminar el coche");
    } else {
      res.status(200).send("Coche eliminado exitosamente");
    }
  });
});

// Realiza una consulta DELETE para eliminar el brand con el ID especificado
app.delete("/models/:modelId", (req, res) => {
  const modelId = req.params.modelId;
  db.query('DELETE FROM models WHERE id = ?', modelId, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send("Error al eliminar el modelo");
    } else {
      res.status(200).send("Modelo eliminado exitosamente");
    }
  });
});

// Realiza una consulta DELETE para eliminar el brand con el ID especificado
app.delete("/brands/:brandId", (req, res) => {
  const brandId = req.params.brandId;
  db.query('DELETE FROM brands WHERE id = ?', brandId, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send("Error al eliminar la marca");
    } else {
      res.status(200).send("Marca eliminada exitosamente");
    }
  });
});

*/
// add a new brands
app.post("/brands", (req, res) => {
  const newBrand = req.body.name; 

  db.query('INSERT INTO brands (name) VALUES (?)', [newBrand], (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send("Error al insertar la nueva marca.");
    } else {
      const newBrandId = result.insertId; // Obtiene la ID de la nueva marca creada
      console.log("Marca registrada con éxito");
      res.status(201).json({ message: "Marca registrada con éxito", id: newBrandId });
    }
  });
});


// add a new Models
app.post("/models", (req, res) => {
  const model = req.body.name; 

  db.query('INSERT INTO models (name) VALUES (?)', [model], (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send("Error al insertar la nueva modelo.");
    } else {
      console.log("Modelo registrada con éxito");
      res.send("modelo registrada con éxito");
    }
  });
});

const multer = require('multer'); // Para gestionar la carga de archivos
const upload = multer({ dest: 'uploads/' }); // Directorio donde se guardarán las imágenes

app.post('/upload', upload.single('image'), (req, res) => {
  // req.file contiene la información de la imagen subida
  // Aquí puedes guardar req.file en la base de datos y devolver una respuesta al cliente
});

app.listen(3001, () => {
  console.log("Corriendo en el puerto 3001");
});


