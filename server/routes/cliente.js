// El proposito de este archivo es definir las acciones que se deben realizar en funcion de 
// los metodos de peticion HTTP. Por ahora solo se han usado GET y POST (Googleenlos)

const express = require("express");
const router = express.Router();

// Carga el controlador para esta ruta, es decir, donde estan definidas las verdaderas acciones.
const cliente_controller = require("../controllers/clienteController")

// Cuando se haga una peticion GET pasa el parametro cc_o_nit a la funcion getDatos 
// definida en el controlador. 
// Como estamos en la ruta "cliente", entonces si vamos a http://localhost:9000/cliente/1234567890 ,
// alguna accion se ejecutara con este CC/ NIT. Ve a controllers/clienteController para saber que hace.
router.get("/:cc_o_nit", cliente_controller.getDatos);

module.exports = router;