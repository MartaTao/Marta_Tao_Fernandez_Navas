const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const voluntariosSchema = new Schema({
    nombre: String,
    apellidos: String,
    edad: String,
    movil: String,
    formacion: String,
    experiencia: String,
})

//Creamos el modelo
const Voluntarios = mongoose.model('voluntarios', voluntariosSchema, "voluntarios");
module.exports = Voluntarios;