const express = require('express');
const router = express.Router();
const Contactos = require('../models/contactos');
router.get('/', async (req, res) => {
    try {
        const arrayContactosDB = await Contactos.find();
        console.log(arrayContactosDB);
        res.render("contactos", {
            arrayContactos: arrayContactosDB
        })
    } catch (error) {
        console.error(error)
    }
})
router.get('/aniadirContacto', (req, res) => {
    res.render('aniadirContacto'); 
})
router.post('/', async (req, res) => {
    const body = req.body;
    console.log(body)
    try {
        const contactosDB = new Contactos(body) 
        await contactosDB.save() 
        res.redirect('/contactos')
    } catch (error) {
        console.log('error', error)
    }
})
router.get('/:id', async(req, res) => { 
    const id = req.params.id;
    try {
        const contactosDB= await Contactos.findOne({ _id: id });
        res.render('detalleContacto', {
            contacto: contactosDB,
            error: false
        })
    } catch (error) {
        console.log('Se ha producido un error', error)
        res.render('detalleContacto', {
            error: true,
            mensaje: 'Accion no encontrada!'
        })
    }
})
router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    console.log('id desde backend', id)
    try {
        const contactosDB = await Contactos.findByIdAndDelete({ _id: id });
        console.log(contactosDB)
        if (!contactosDB) {
            res.json({ 
                estado: false,
                mensaje: 'No se puede eliminar.'
            })
        } else {
            res.json({
                estado: true,
                mensaje: 'Accion eliminada.'
            })
        } 
    } catch (error) {
        console.log(error)
    }
})
router.put('/:id', async (req, res) => {
    const id = req.params.id;
    const body = req.body;
    console.log(id)
    console.log('body', body)
    try {
        const contactosDB = await Contactos.findByIdAndUpdate(
            id, body, { useFindAndModify: false }
        )
        console.log(contactosDB)
        res.json({
            estado: true,
            mensaje: 'Accion editada.'
        })
    } catch (error) {
        console.log(error)
        res.json({
            estado: false,
            mensaje: 'Problema al editar la accion.'
        })
    }
})
module.exports = router;