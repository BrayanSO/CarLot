const express = require("express");
const app = express();
const { PrismaClient } = require('@prisma/client');
const multer = require("multer");
const cors = require("cors");

const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage: storage });

app.post("/create", upload.array("images", 5), async (req, res) => {
  const { brandId, modelId, style, transmission, price, fuel, doors, kilometres } = req.body;

  // Verifica que req.files esté definido antes de usar map
  const images = req.files ? req.files.map(file => file.filename) : [];

  try {
    const createdCar = await prisma.cars.create({
      data: {
        brandId: parseInt(brandId),
        modelId: parseInt(modelId),
        style,
        transmission,
        price: parseFloat(price),
        fuel,
        doors: parseInt(doors),
        kilometres: parseFloat(kilometres),
        images: JSON.stringify(images),
      },
    });

    console.log("Coche agregado exitosamente:", createdCar);
    res.status(200).send("Coche agregado exitosamente");
  } catch (error) {
    console.error("Error al agregar el coche:", error);
    res.status(500).send("Error al agregar el coche");
  }
});

// Obtener todas las marcas
app.get("/brands", async (req, res) => {
  try {
    const brands = await prisma.brands.findMany();
    res.json(brands);
  } catch (error) {
    console.error("Error al obtener la lista de marcas:", error);
    res.status(500).send("Error al obtener la lista de marcas");
  }
});

// Obtener todos los modelos
app.get("/models", async (req, res) => {
  try {
    const models = await prisma.models.findMany();
    res.json(models);
  } catch (error) {
    console.error("Error al obtener la lista de modelos:", error);
    res.status(500).send("Error al obtener la lista de modelos");
  }
});

// Eliminar un coche con el ID especificado
app.delete("/cars/:carId", async (req, res) => {
  const carId = parseInt(req.params.carId);

  try {
    await prisma.cars.delete({
      where: { id: carId },
    });

    res.status(200).send("Coche eliminado exitosamente");
  } catch (error) {
    console.error("Error al eliminar el coche:", error);
    res.status(500).send("Error al eliminar el coche");
  }
});

// Eliminar un modelo con el ID especificado
app.delete("/models/:modelId", async (req, res) => {
  const modelId = parseInt(req.params.modelId);

  try {
    await prisma.models.delete({
      where: { id: modelId },
    });

    res.status(200).send("Modelo eliminado exitosamente");
  } catch (error) {
    console.error("Error al eliminar el modelo:", error);
    res.status(500).send("Error al eliminar el modelo");
  }
});

// Eliminar una marca con el ID especificado
app.delete("/brands/:brandId", async (req, res) => {
  const brandId = parseInt(req.params.brandId);

  try {
    await prisma.brands.delete({
      where: { id: brandId },
    });

    res.status(200).send("Marca eliminada exitosamente");
  } catch (error) {
    console.error("Error al eliminar la marca:", error);
    res.status(500).send("Error al eliminar la marca");
  }
});

// Agregar una nueva marca
app.post("/brands", async (req, res) => {
  const newBrand = req.body.name;

  try {
    const createdBrand = await prisma.brands.create({
      data: {
        name: newBrand,
      },
    });

    console.log("Marca registrada con éxito:", createdBrand);
    res.status(201).json({ message: "Marca registrada con éxito", id: createdBrand.id });
  } catch (error) {
    console.error("Error al insertar la nueva marca:", error);
    res.status(500).send("Error al insertar la nueva marca");
  }
});

// Agregar un nuevo modelo
app.post("/models", async (req, res) => {
  const modelName = req.body.name;

  try {
    const createdModel = await prisma.models.create({
      data: {
        name: modelName,
      },
    });

    console.log("Modelo registrado con éxito:", createdModel);
    res.status(201).json({ message: "Modelo registrado con éxito", id: createdModel.id });
  } catch (error) {
    console.error("Error al insertar el nuevo modelo:", error);
    res.status(500).send("Error al insertar el nuevo modelo");
  }
});

