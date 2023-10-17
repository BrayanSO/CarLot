CREATE DATABASE IF NOT EXISTS tu_base_de_datos;
USE tu_base_de_datos;

CREATE TABLE IF NOT EXISTS tabla1 (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255),
    ... otros campos ...
);

CREATE TABLE IF NOT EXISTS tabla2 (
    id INT AUTO_INCREMENT PRIMARY KEY,
    ...
);
