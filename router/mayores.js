const express = require('express');
const router = express.Router();
const Mayores = require('../models/mayores');
router.get('/', async (req, res) => {
    try {
        const arrayMayoresDB = await Mayores.find();
        console.log(arrayMayoresDB);
        res.render("mayores", {
            arrayMayores: arrayMayoresDB
        })
    } catch (error) {
        console.error(error)
    }
})
router.get('/aniadirMayor', (req, res) => {
    res.render('aniadirMayor'); 
})
router.post('/', async (req, res) => {
    const body = req.body;
    console.log(body)
    try {
        const mayorDB = new Mayores(body) 
        await mayorDB.save() 
        res.redirect('/mayores')
    } catch (error) {
        console.log('error', error)
    }
})
router.get('/:id', async(req, res) => { 
    const id = req.params.id;
    try {
        const mayorDB= await Mayores.findOne({ _id: id });
        res.render('detalleMayor', {
            mayor: mayorDB,
            error: false
        })
    } catch (error) {
        console.log('Se ha producido un error', error)
        res.render('detalleMayor', {
            error: true,
            mensaje: 'Persona mayor no encontrada!'
        })
    }
})
router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    console.log('id desde backend', id)
    try {
        const mayorDB = await Mayores.findByIdAndDelete({ _id: id });
        console.log(mayorDB)
        if (!mayorDB) {
            res.json({ 
                estado: false,
                mensaje: 'No se puede eliminar.'
            })
        } else {
            res.json({
                estado: true,
                mensaje: 'Persona eliminada.'
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
        const mayorDB = await Mayores.findByIdAndUpdate(
            id, body, { useFindAndModify: false }
        )
        console.log(mayorDB)
        res.json({
            estado: true,
            mensaje: 'Persona editada.'
        })
    } catch (error) {
        console.log(error)
        res.json({
            estado: false,
            mensaje: 'Problema al editar a la persona.'
        })
    }
})
module.exports = router;