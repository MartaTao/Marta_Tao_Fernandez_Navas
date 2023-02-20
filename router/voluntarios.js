const express = require('express');
const router = express.Router();
const Voluntarios = require('../models/voluntarios');
router.get('/', async (req, res) => {
    try {
        const arrayVoluntariosDB  = await Voluntarios.find();
        console.log(arrayVoluntariosDB );
        res.render("Voluntarios", {
            arrayVoluntarios: arrayVoluntariosDB 
        })
    } catch (error) {
        console.error(error)
    }
})
router.get('/aniadirVoluntario', (req, res) => {
    res.render('aniadirVoluntario'); 
})
router.post('/', async (req, res) => {
    const body = req.body;
    console.log(body)
    try {
        const voluntarioDB = new Voluntarios(body) 
        await voluntarioDB.save() 
        res.redirect('/voluntarios')
    } catch (error) {
        console.log('error', error)
    }
})
router.get('/:id', async(req, res) => { 
    const id = req.params.id;
    try {
        const voluntarioDB= await Voluntarios.findOne({ _id: id });
        res.render('detalleVoluntario', {
            voluntario: voluntarioDB,
            error: false
        })
    } catch (error) {
        console.log('Se ha producido un error', error)
        res.render('detalleVoluntario', {
            error: true,
            mensaje: 'Persona mayor no encontrada!'
        })
    }
})
router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    console.log('id desde backend', id)
    try {
        const voluntarioDB = await Voluntarios.findByIdAndDelete({ _id: id });
        console.log(voluntarioDB)
        if (!voluntarioDB) {
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
        const voluntarioDB = await Voluntarios.findByIdAndUpdate(
            id, body, { useFindAndModify: false }
        )
        console.log(voluntarioDB)
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