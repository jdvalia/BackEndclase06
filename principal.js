const Contenedor = require('./contenedor');
const express = require('express')
const app = express();


app.get("/productos", (req, res) => {
  const lista = new Contenedor();
  lista.getAll()
  .then(utiles => res.send(utiles))
  .catch( err => res.send(err))
})

app.get("/productosRandom", (req, res) => {
  const producto = new Contenedor();
  producto.getById(Math.round(Math.random()*2))
  .then(utiles => res.send(utiles))
  .catch( err => res.send(err))
})

const server = app.listen(8080, () => {
  console.log(`Server iniciado en el port:${server.address().port}`);
})