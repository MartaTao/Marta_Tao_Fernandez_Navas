const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const mayoresSchema = new Schema({
    nombre: String,
    apellidos: String,
    edad: String,
    movil: String,
    contacto: String,
    patologias: String,
    direccion: String,
})

//Creamos el modelo
const Mayores = mongoose.model('mayores', mayoresSchema, "mayores");

module.exports = Mayores;