// Tablas de base de datos
const Cotizaciones = require("../models/Cotizaciones");

exports.allCotizaciones = async (req, res) => {
  Cotizaciones.find((error, cotizaciones) => {
    if (error) return console.log(error);
    res.send(cotizaciones);
  });
};

exports.eliminarCotizacion = async (req, res) => {
  Cotizaciones.deleteOne({ cc_o_nit: req.params.cc_o_nit }, (error) => {
    if (error) return console.log(error);
    res.send("Eliminado de forma correcta");
  });
};

exports.getCotizaciones = async (req, res) => {
  Cotizaciones.find(
    { cc_o_nit: req.params.cc_o_nit },
    (error, cotizaciones) => {
      if (error) return console.log(error);
      res.send(cotizaciones);
    }
  );
};
