// Tablas de base de datos
const Cotizaciones = require("../models/Cotizaciones");

exports.getDatos = (req, res) => {
  Cotizaciones.find(
    { cc_o_nit: req.params.cc_o_nit },
    (error, cotizaciones) => {
      if (error) return console.log(error);
      try {
        cliente = cotizaciones[cotizaciones.length - 1];
        const [nombreCorreo, dominio] = cliente.correo.split("@");
        const medioNombre = nombreCorreo.substring(0, nombreCorreo.length / 2);
        const partePrivada = "*".repeat(
          nombreCorreo.length / 2 + (nombreCorreo.length % 2)
        );
        correoPrivado = medioNombre + partePrivada + "@" + dominio;
        cliente["correo"] = correoPrivado;
        res.send(cliente);
      } catch (err) {
        res.send({});
      }
    }
  );
};
