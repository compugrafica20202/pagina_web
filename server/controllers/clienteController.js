// Importa el esquema de la tabla de Cotizaciones en la base de datos
const Cotizaciones = require("../models/Cotizaciones");

exports.getDatos = (req, res) => {
  // Esta funcion es empleada para consultar si ya existe el cliente en la base de datos
  // (lo busca por su CC/ NIT). En caso de SI EXISTIR, envia su informacion personal "censurada"
  // (el correo no se envia completo) y el usuario decidira si quiere repetir con esos datos la cotizacion.
  // En el caso de NO EXISTIR enviara informacion vacia y el cliente debera ingresar sus datos por primera vez
  
  // En la base de datos encuentre(find) ...
  Cotizaciones.find(
    { cc_o_nit: req.params.cc_o_nit }, // Donde vea que la CC/NIT es lo que llega desde la ruta
    // Por ejemplo http://localhost:9000/cliente/1234567890 -> CC/NIT = 1234567890
    (error, cotizaciones) => {
      if (error) return console.log(error);  // Si hubo un error al buscar muestrelo.
      try { // Intente hacer ESTO
        cliente = cotizaciones[cotizaciones.length - 1];  // Coge la informacion de la ultima cotizacion (mirar en models/Cotizaciones)
        const [nombreCorreo, dominio] = cliente.correo.split("@");  // separa el correo en dos partes: micorreo | unal.edu.co
        const medioNombre = nombreCorreo.substring(0, nombreCorreo.length / 2); // Toma la mitad del nombre del correo
        const partePrivada = "*".repeat(
          nombreCorreo.length / 2 + (nombreCorreo.length % 2)
        ); // Crea la segunda mitad
        correoPrivado = medioNombre + partePrivada + "@" + dominio; // Une las dos partes anteriores el domino
        // Lo que se hizo basicamente fue -> micorreo@unal.edu.co para a ser mico****@unal.edu.co
        cliente["correo"] = correoPrivado; // A la informacion de la ultima cotizacion le sobreescribe el correo censurado SOLO
        // para el envio de informacion al cliente
        res.send(cliente); // Envio de informacion (res -> response)
      } catch (err) { // Si llega a haber un error intentando "ESTO" (mira en try)
        res.send({}); // Envia informacion vacia como si el cliente no existiese
      }
    }
  );
};
