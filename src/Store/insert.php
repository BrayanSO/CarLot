<?php
// Establece la conexión con la base de datos MySQL
$servername = "nombre_del_servidor";
$username = "nombre_de_usuario";
$password = "contraseña";
$database = "cars";

$conn = new mysqli($servername, $username, $password, $database);

if ($conn->connect_error) {
    die("Error de conexión a la base de datos: " . $conn->connect_error);
}

// Obtén los datos enviados desde la aplicación React (pueden ser a través de POST o GET, según tu necesidad)
$brand = $_POST['brand'];
$model = $_POST['model'];
$style = $_POST['style'];
$transmission = $_POST['transmission'];
$price = $_POST['price'];
$fuel = $_POST['fuel'];
$doors = $_POST['doors'];
$kilometres = $_POST['kilometres'];
$images = json_encode($_POST['images']); // Asumiendo que las imágenes se envían como un arreglo

// Realiza la inserción en la base de datos
$sql = "INSERT INTO autos (marca_id, modelo_id, estilo, transmision, precio, combustible, puertas, kilometraje, imagenes) VALUES ('$brand', '$model', '$style', '$transmission', '$price', '$fuel', '$doors', '$kilometres', '$images')";

if ($conn->query($sql) === TRUE) {
    echo "Datos insertados correctamente";
} else {
    echo "Error al insertar datos: " . $conn->error;
}

$conn->close();
?>
