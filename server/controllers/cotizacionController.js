// Tablas de base de datos
const Cotizaciones = require("../models/Cotizaciones")

exports.crearCotizacion = (req, res) => {
    
    console.log(req.body);
    
    const cotizacion = new Cotizaciones(req.body);

    console.log(cotizacion);
    // cotizacion.save((error) => console.log(error))

    /*
    Cotizaciones.findOneAndDelete({correo: "correo@prueba.com"}, (error, cotizacion) => {
        if (error) return console.log(error);
        console.log(cotizacion);
    });
    */

    Cotizaciones.find((error, cotizacion) => {
        if (error) return console.log(error);
        console.log(cotizacion);
    });

};