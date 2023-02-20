const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const accionesSchema = new Schema({
    fecha: String,
    estado: String,
    mayor: String,
    voluntario: String
})

//Creamos el modelo
const Acciones = mongoose.model('acciones', accionesSchema, "acciones");

module.exports = Acciones;