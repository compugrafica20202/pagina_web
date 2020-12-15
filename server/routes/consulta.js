// El proposito de este archivo es definir las acciones que se deben realizar en funcion de 
// los metodos de peticion HTTP. Por ahora solo se han usado GET y POST (Googleenlos)

const express = require("express");
const router = express.Router();

// Carga el controlador para esta ruta, es decir, donde estan definidas las verdaderas acciones.
const consulta_controller = require("../controllers/consultaController");

// Cuando se hace una peticion GET se ejecuta la funcion allCotizaciones 
// (Ve a controllers/consultaController)
// Por ejemplo, como estamos en la ruta "consulta", si vamos a http://localhost:9000/consulta/ , 
// se ejecutara esto. Dirigete a la funcion para saber que hace
router.get("/", consulta_controller.allCotizaciones);

// Cuando se hace una peticion GET para el parametro cc_o_nit a la funcion eleminarCotizaciones
// definida en el controlador
// Por ejemplo, si vamos a http://localhost:9000/consulta/eliminar/1234567890 , se ejecutara
// una accion para la CC/NIT 1234567890. Dirigete a la funcion para saber que hace
router.get("/eliminar/:cc_o_nit", consulta_controller.eliminarCotizacion);

// Cuando se haga una peticion GET pasa el parametro cc_o_nit a la funcion getCotizaciones 
// definida en el controlador.  Dirigete a la funcion para saber que hace
// Por ejemplo, si vamos a http://localhost:9000/consulta/1234567890 , se ejecutara esto
router.get("/:cc_o_nit", consulta_controller.getCotizaciones);

module.exports = router;
