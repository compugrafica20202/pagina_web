const mongoose = require("mongoose");

const cotizacionSchema = new mongoose.Schema({
    // Informacion del cliente
    nombre_cliente: String,
    cc_o_nit: Number,
    es_empresa: Boolean,
    correo: String,
    departamento: String,
    municipio: String,
    // Informacion de compra
    es_invernadero: Boolean,
    tipo_invernadero: {type: Boolean, default: 0},
    profundidad: {type: Number, default: 0},
    altura: {type: Number, default: 0},
    ancho: {type: Number, default: 0},
    cantidad_lineas: {type: Number, default: 0},
    cantidad_jaulas_por_linea: {type: Number, default: 0},
    cantidad_niveles: {type: Number, default: 0},
    cantidad_aves: {type: Number, default: 0},
    lineas_enfrentadas: {type: Boolean, default: false},
    // Procesamiento
    ha_sido_revisado: {type: Boolean, default: false}
}, {versionKey: false});

module.exports = mongoose.model("Cotizaciones", cotizacionSchema);