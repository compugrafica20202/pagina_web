// Se importan las librerias que vamos a usar.
const express = require("express");  // Es el framework para la creacion de servidores de aplicaciones web mas usado
const mongoose = require("mongoose");  // Usado para la comunicacion con la base de datos de MongoDB

// App
const port = process.env.PORT || 9000;  // Es el puerto donde se montara el servidor
// Si no se ha desplegado la aplicacion, puedes conectarte al servidor a traves http://localhost:9000

const app = express();

// Base de datos
// los de abajo es la url para acceder a la base de datos. Esta debe ser privada, por eso el repositorio es privado
const mongoDB_url = "mongodb+srv://graphcompuser:graphcomppass@cluster0.yvnfe.mongodb.net/graphcompprojdb?retryWrites=true&w=majority";
const db = mongoose.connection;
db.on("error", console.error.bind(console, "Error conectandose a la base de datos."))  // Si hay un error mostrará un mensaje
mongoose.connect(mongoDB_url, {useNewUrlParser: true, useUnifiedTopology: true});

// Routes
// Son las rutas que van a existir. Ten en cuenta que dentro de "require" esta la ruta al archivo.js 
// del que se importa
const cotizacionRouter = require("./routes/cotizacion");  // http://localhost:9000/cotizacion
const clienteRouter = require("./routes/cliente")  // http://localhost:9000/cliente
const consultaRouter = require("./routes/consulta")  // http://localhost:9000/consulta

// Middleware
app.use(express.json());
app.use("/cotizacion", cotizacionRouter);
app.use("/cliente", clienteRouter);
app.use("/consulta", consultaRouter);

// Esta es la conexion al puerto
app.listen(port, () => {
    console.log(`http://localhost:${port}`)
});