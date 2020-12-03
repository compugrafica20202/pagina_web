const express = require("express");
const mongoose = require("mongoose");

// Routes
const cotizacionRouter = require("./routes/cotizacion");

// Base de datos
const mongoDB_url = "mongodb+srv://graphcompuser:graphcomppass@cluster0.yvnfe.mongodb.net/graphcompprojdb?retryWrites=true&w=majority";
const db = mongoose.connection;
db.on("error", console.error.bind(console, "Error conectandose a la base de datos. "))
mongoose.connect(mongoDB_url, {useNewUrlParser: true, useUnifiedTopology: true});

// App
const port = process.env.PORT || 9000;
const app = express();

app.use(express.json());
app.use("/cotizacion", cotizacionRouter);

/*
app.get("/", (req, res) => {
    res.redirect("http://localhost:3000");
});
*/

app.listen(port, () => {
    console.log(`http://localhost:${port}`)
});