const express = require("express");
const router = express.Router();

// Controller modules

const cliente_controller = require("../controllers/clienteController")

router.get("/:cc_o_nit", cliente_controller.getDatos);

module.exports = router;