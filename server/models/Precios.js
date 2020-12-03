const mongoose = require("mongoose");

const precioSchema = new mongoose.Schema({
    _id: mongoose.SchemaTypes.ObjectId,
    nombre_parte: String,
    precio_und: Number
});

module.exports = mongoose.model("Precios", precioSchema);