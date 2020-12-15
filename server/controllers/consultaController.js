// Importa el esquema de la tabla de Cotizaciones en la base de datos
const Cotizaciones = require("../models/Cotizaciones");

exports.allCotizaciones = async (req, res) => {
  // Esta funcion envia la informacion de todas las cotizaciones de la base de datos
  // Su proposito es exclusivo PARA PRODUCCION. NO QUEDARA EN LA VERSION FUNCIONAL
  Cotizaciones.find((error, cotizaciones) => {
    if (error) return console.log(error);
    res.send(cotizaciones);
  });
};

exports.eliminarCotizacion = async (req, res) => {
  // Esta funcion elimina todas las cotizaciones para una CC/NIT en la base de datos
  // Su proposito es exclusivo PARA PRODUCCION. NO QUEDARA EN LA VERSION FUNCIONAL
  Cotizaciones.deleteOne({ cc_o_nit: req.params.cc_o_nit }, (error) => {
    if (error) return console.log(error);
    res.send("Eliminado de forma correcta");
  });
};

exports.getCotizaciones = async (req, res) => {
  // Esta funcion envia todas las cotizaciones para una CC/NIT en la base de datos
  // Su proposito es exclusivo PARA PRODUCCION. NO QUEDARA EN LA VERSION FUNCIONAL
  Cotizaciones.find(
    { cc_o_nit: req.params.cc_o_nit },
    (error, cotizaciones) => {
      if (error) return console.log(error);
      res.send(cotizaciones);
    }
  );
};
