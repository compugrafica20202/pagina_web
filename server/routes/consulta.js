const express = require("express");
const router = express.Router();

// Controller modules

const consulta_controller = require("../controllers/consultaController");

router.get("/", consulta_controller.allCotizaciones);

router.get("/eliminar/:cc_o_nit", consulta_controller.eliminarCotizacion);

router.get("/:cc_o_nit", consulta_controller.getCotizaciones);

module.exports = router;
