<?php
/* Establece la conexión con la base de datos MySQL
$servername = "nombre_del_servidor";
$username = "nombre_de_usuario";
$password = "contraseña";
$database = "cars";

$conn = new mysqli($servername, $username, $password, $database);

if ($conn->connect_error) {
    die("Error de conexión a la base de datos: " . $conn->connect_error);
}

// Obtén los datos enviados desde la aplicación React (pueden ser a través de POST o GET, según tu necesidad)
$json = file_get_contents('php://input');
$data = json_decode($json, true);

$brand_id = $data['brand'];
$model_id = $data['model'];
$style = $data['style'];
$transmission = $data['transmission'];
$price = $data['price'];
$fuel = $data['fuel'];
$doors = $data['doors'];
$kilometres = $data['kilometres'];
$images = json_encode($data['images']); // Asumiendo que las imágenes se envían como un arreglo

// Consulta preparada para obtener la ID de la marca
$brandQuery = $conn->prepare("SELECT id FROM brands WHERE name = ?");
$brandQuery->bind_param("s", $brand_id);
$brandQuery->execute();
$brandResult = $brandQuery->get_result();
$brandRow = $brandResult->fetch_assoc();
$brandId = $brandRow['id'];

// Consulta preparada para obtener la ID del modelo
$modelQuery = $conn->prepare("SELECT id FROM models WHERE name = ?");
$modelQuery->bind_param("s", $model_id);
$modelQuery->execute();
$modelResult = $modelQuery->get_result();
$modelRow = $modelResult->fetch_assoc();
$modelId = $modelRow['id'];

// Realiza la inserción en la base de datos
$sql = $conn->prepare("INSERT INTO autos (brand_id, model_id, estilo, transmision, precio, combustible, puertas, kilometraje, imagenes) 
                       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)");

$sql->bind_param("iisssssss", $brand_id, $model_id, $style, $transmission, $price, $fuel, $doors, $kilometres, $images);

if ($sql->execute()) {
    echo "Datos insertados correctamente";
} else {
    echo "Error al insertar datos: " . $sql->error;
}

// Cierra la conexión y las consultas preparadas
$sql->close();
$brandQuery->close();
$modelQuery->close();
$conn->close();
?>
