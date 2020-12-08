// Tablas de base de datos
const Cotizaciones = require("../models/Cotizaciones")

exports.getDatos = (req, res) => {
    
    console.log(req.params.cc_o_nit);
    
    Cotizaciones.find({cc_o_nit: req.params.cc_o_nit}, (error, cotizaciones) => {
        if (error) return console.log(error);
        console.log(cotizaciones)
        try {
            cliente = cotizaciones[cotizaciones.length - 1]
            console.log(cliente.correo.split("@"))
            const [nombreCorreo, dominio] = cliente.correo.split("@")
            correoPrivado = nombreCorreo.substring(0, nombreCorreo.length/2) + "*".repeat(nombreCorreo.length/2) + "@" + dominio 
            cliente["correo"] = correoPrivado
            res.send(cliente)
        } catch (err) {
            res.send({})
        }
    })

    /*
    Cotizaciones.find((error, cotizacion) => {
        if (error) return console.log(error);
        console.log(cotizacion);
    });
    */
};