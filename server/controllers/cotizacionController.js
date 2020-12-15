// Este archivo es el determinante para enviar a la base de datos una cotizacion

// Importa el esquema de la tabla de Cotizaciones en la base de datos
const Cotizaciones = require("../models/Cotizaciones");

exports.crearCotizacion = async (req, res) => {
  // En esta funcion llega una peticion que contiene los datos de la cotizacion que el cliente
  // genero en su navegador (vienen desde el front). Estos datos no estan filtrados y pueden
  // contener informacion de invernaderos y codornices. Por ello:

  // Se limpia la informacion que no corresponde con la solicitud final (invernadero y su modelo o alimentadora)
  // De esta forma se usaran los datos por defectos para las cotizaciones como se ha planteado (revisar
  // models/Cotizaciones)
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
    // Idealmente no se deberia llegar aca pero se debe estar preparado
    return res.status(400).send({
      message: "Solicitud rechazada",
    }); // Envia un error al cliente
  }
  // Cuando el cliente accede a usar los datos de la ultima cotizacion, desde la solicitud (como el correo
  // solo se tiene censurado del lado del cliente) se envia un correo vacio. Entonces se debe buscar el que
  // corresponda a la CC/ NIT para completar la cotizacion
  if (req.body.correo == "") {
    // Si no llega correo (cliente ya registrado, lo que dice arriba)
    await Cotizaciones.find(
      // Encuentre en la base de datos
      { cc_o_nit: req.body.cc_o_nit }, // Todas las cotizaciones del cliente CC/NIT
      (error, cotizaciones) => {
        if (error) {
          console.log(error); // Si hay un error que lo muestre
          return res.status(400).send({
            // Y que ademas devuelva un error al cliente
            message: "Solicitud rechazada",
          });
        }
        // Si se pudieron encontrar, coja el ultimo correo que uso que fue el que se le pregunto queria usar
        req.body.correo = cotizaciones[cotizaciones.length - 1].correo;
      }
    );
  }

  // Crea una cotizacion con la informacion que llego y que ha sido filtrada
  const cotizacion = new Cotizaciones({ ...req.body }); 

  // Guarde la cotizacion en la base de datos
  cotizacion.save((error) => { 
    if (error) {
      res.status(400).send({ // Si hubo un error guardando en la base de datos haga al cliente saberlo
        message: "Solicitud rechazada",
      });
      return console.log(error);  // Si hay un error muestrelo en la consola del servidor
    }
    // Si se guardo exitosamente muestrelo en consola del servidor
    console.log(`Cotización recibida. CC/NIT: ${req.body.cc_o_nit}`);  
  });
};
