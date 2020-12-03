const mongoose = require("mongoose");

const salidaInvernaderoSchema = new mongoose.Schema({
    _id: mongoose.SchemaTypes.ObjectId,
    id_cotizacion: Number,
    precio_total: Number,
    ha_sido_revisado: Boolean
});

module.exports = mongoose.model("Salida_modelacion_invernadero", salidaInvernaderoSchema);