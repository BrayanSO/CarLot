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
$brandName = $_POST['brand'];
$modelName = $_POST['model'];
$style = $_POST['style'];
$transmission = $_POST['transmission'];
$price = $_POST['price'];
$fuel = $_POST['fuel'];
$doors = $_POST['doors'];
$kilometres = $_POST['kilometres'];
$images = json_encode($_POST['images']); // Asumiendo que las imágenes se envían como un arreglo

// Consulta preparada para obtener la ID de la marca
$brandQuery = $conn->prepare("SELECT id FROM brands WHERE name = ?");
$brandQuery->bind_param("s", $brandName);
$brandQuery->execute();
$brandResult = $brandQuery->get_result();
$brandRow = $brandResult->fetch_assoc();
$brandId = $brandRow['id'];

// Consulta preparada para obtener la ID del modelo
$modelQuery = $conn->prepare("SELECT id FROM models WHERE name = ?");
$modelQuery->bind_param("s", $modelName);
$modelQuery->execute();
$modelResult = $modelQuery->get_result();
$modelRow = $modelResult->fetch_assoc();
$modelId = $modelRow['id'];

// Realiza la inserción en la base de datos
$sql = $conn->prepare("INSERT INTO autos (marca_id, modelo_id, estilo, transmision, precio, combustible, puertas, kilometraje, imagenes) 
                       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)");

$sql->bind_param("iisssssss", $brandId, $modelId, $style, $transmission, $price, $fuel, $doors, $kilometres, $images);

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
