const express = require('express');
const router = express.Router();
const Acciones = require('../models/acciones');
router.get('/', async (req, res) => {
    try {
        const arrayAccionesDB = await Acciones.find();
        console.log(arrayAccionesDB);
        res.render("acciones", {
            arrayAcciones: arrayAccionesDB
        })
    } catch (error) {
        console.error(error)
    }
})
router.get('/aniadirAccion', (req, res) => {
    res.render('aniadirAccion'); 
})
router.post('/', async (req, res) => {
    const body = req.body;
    console.log(body)
    try {
        const accionDB = new Acciones(body) 
        await accionDB.save() 
        res.redirect('/acciones')
    } catch (error) {
        console.log('error', error)
    }
})
router.get('/:id', async(req, res) => { 
    const id = req.params.id;
    try {
        const accionDB= await Acciones.findOne({ _id: id });
        res.render('detalleAccion', {
            accion: accionDB,
            error: false
        })
    } catch (error) {
        console.log('Se ha producido un error', error)
        res.render('detalleAccion', {
            error: true,
            mensaje: 'Accion no encontrada!'
        })
    }
})
router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    console.log('id desde backend', id)
    try {
        const accionDB = await Acciones.findByIdAndDelete({ _id: id });
        console.log(accionDB)
        if (!accionDB) {
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
        const accionDB = await Acciones.findByIdAndUpdate(
            id, body, { useFindAndModify: false }
        )
        console.log(accionDB)
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