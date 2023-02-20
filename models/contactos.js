const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const contactosSchema = new Schema({
    nombre: String,
    apellidos: String,
    movil: String,
    relacion: String,
    mayor: String
})

//Creamos el modelo
const Contactos = mongoose.model('contactos', contactosSchema, "contactos");

module.exports = Contactos;