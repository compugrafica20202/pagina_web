// El proposito de este archivo es definir las acciones que se deben realizar en funcion de 
// los metodos de peticion HTTP. Por ahora solo se han usado GET y POST (Googleenlos)

const express = require("express");
const router = express.Router();

// Carga el controlador para esta ruta, es decir, donde estan definidas las verdaderas acciones.
const cotizacion_controller = require("../controllers/cotizacionController")

// Esta es una peticion POST. No puedes llamarla desde la barra de navegacion, se hace mediante
// "fetchs" que envia el cliente (front-end), para los cuales se usa la libreria "axio". Estas
// peticiones POST buscan enviar informacion al servidor (back-end, donde estamos).
// Dirigete a controllers/cotizacionController para saber que hace la funcion
router.post("/", cotizacion_controller.crearCotizacion);

module.exports = router;