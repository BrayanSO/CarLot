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

 db.query('INSERT INTO cars(brand,model,style,transmission,price,fuel,doors,kilometres) Values(?,?,?,?,?,?,?,?)',[brand,model,style,transmission,price,fuel,doors,kilometres], (err,result)=>{
  if (err){
    console.log(err);
  } else {
    res.send("Auro Registrado con exito")
  }
 });
});

app.listen(3001,()=>{
    console.log("corriendo en el puerto 3001");

})
