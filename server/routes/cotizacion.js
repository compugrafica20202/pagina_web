const express = require("express");
const router = express.Router();

// Controller modules

const cotizacion_controller = require("../controllers/cotizacionController")

router.post("/", cotizacion_controller.crearCotizacion);

module.exports = router;