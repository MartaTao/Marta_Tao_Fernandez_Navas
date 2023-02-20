const express = require('express');
const bodyParser  = require('body-parser');
const app = express();
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
require('dotenv').config();
const port = process.env.PORT;
//Conexión a base de datos
const mongoose = require('mongoose');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.h5usq7k.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`; //URL de conexión
mongoose.connect(uri,
  { useNewUrlParser: true, useUnifiedTopology: true }
)
.then(() => console.log('Base de datos conectada'))
.catch(e => console.log(e));
//Plantilla
app.set('views',__dirname+'/views');
app.set('view engine','ejs');
//Middleware
app.use(express.static(__dirname+'/public'));
// Llamadas a las rutas
app.use("/", require("./router/rutas"));
app.use("/mayores", require("./router/mayores"));
app.use("/voluntarios", require("./router/voluntarios"));
app.use("/acciones", require("./router/acciones"));
app.use("/contactos", require("./router/contactos"));
// Si no se encuentra el recurso (Error 404) con página personalizada
app.use( (req, res) => {
    res.status(404).render("404",{
        cabecera:"404",
        titulo:"Error 404",
        descripcion:"Page Not Found"
    });
})
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})