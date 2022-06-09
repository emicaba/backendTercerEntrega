const express = require("express");
const Contenedor = require("./Contenedor");

const app = express();
const puerto = 8080;
const productos = new Contenedor("productos.txt");

app.get("/productos", async (req, res) => {
  const products = await productos.getAll();
  res.send(products);
});

app.get("/productoRandom", async (req, res) => {
  const product = await productos.getById(
    Math.floor(Math.random() * (4 - 1) + 1)
  );
  res.send(product);
});

app.listen(puerto, () => {
  console.log(`servidor escuchando ${puerto}`);
});
