// Tablas de base de datos
const Cotizaciones = require("../models/Cotizaciones");

exports.crearCotizacion = async (req, res) => {
  if (req.body.es_invernadero === true) {
    delete req.body.cantidad_lineas;
    delete req.body.cantidad_jaulas_por_linea;
    delete req.body.cantidad_niveles;
    delete req.body.cantidad_aves;
    delete req.body.lineas_enfrentadas;
  } else if (req.body.es_invernadero === false) {
    delete req.body.tipo_invernadero;
    delete req.body.profundidad;
    delete req.body.altura;
    delete req.body.ancho;
  } else {
    return res.status(400).send({
      message: "Solicitud rechazada",
    });
  }
  if (req.body.correo == "") {
    await Cotizaciones.find(
      { cc_o_nit: req.body.cc_o_nit },
      (error, cotizaciones) => {
        if (error) {
          console.log(error);
          return res.status(400).send({
            message: "Solicitud rechazada",
          });
        }
        req.body.correo = cotizaciones[cotizaciones.length - 1].correo;
      }
    );
  }
  const cotizacion = new Cotizaciones({ ...req.body });
  
  cotizacion.save((error) => {
    if (error) return console.log(error);
    console.log(`Cotización recibida. CC/NIT: ${req.body.cc_o_nit}`)
    return res.status(400).send({
      message: "Solicitud rechazada",
    });
  });

};
