const express = require ("express");
const app = express ();
const mysql = require("mysql");
const cors = require("cors");
app.use(cors());
app.use(express.json());

const db = mysql.createConnection ({
  host: "localhost",
  user:"root",
  passwords:"",
  database:"cars_list"
});

app.post("/create",(req,res)=>{
 const brand = req.body.brand;
 const model = req.body.model;
 const style = req.body.style;
 const transmission = req.body.transmission;
 const  price = req.body.price;
 const fuel = req.body.fuel;
 const doors = req.body.doors;
 const kilometres = req.body.kilometres;


// Add a new post car
 db.query('INSERT INTO cars(brand,model,style,transmission,price,fuel,doors,kilometres) Values(?,?,?,?,?,?,?,?)',[brand,model,style,transmission,price,fuel,doors,kilometres], (err,result)=>{
  if (err){
    console.log(err);
  } else {
    res.send("Auro Registrado con exito")
  }
 });
});
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

// add a new brands
app.post("/brands", (req, res) => {
  const brand = req.body.name; 

  db.query('INSERT INTO brands (name) VALUES (?)', [brand], (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send("Error al insertar la nueva marca.");
    } else {
      console.log("Marca registrada con éxito");
      res.send("Marca registrada con éxito");
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

app.listen(3001, () => {
  console.log("Corriendo en el puerto 3001");
});


