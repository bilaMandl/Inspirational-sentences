const express = require('express');
const quoteService = require('../../BL/services/quoteService');
const ParamsError = require('../../BL/errors/ParamError');
const IdError = require('../../BL/errors/IdError');
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        let result = await quoteService.getAll();
        res.json(result);
    }
    catch (e) {
        res.status(500).send(e.message);
    }
});
router.get('/status/:pass', async (req, res) => {
    try {
        let result = await quoteService.getAllStatus(req.params.pass);
        res.json(result);
    }
    catch (e) {
        res.status(500).send(e.message);
    }
})

router.get('/:id', async (req, res) => {
    try {
        let result = await quoteService.getById(req.params.id);
        res.json(result);
    }
    catch (e) {
        if(e instanceof IdError)
            res.status(404).send(e.message)
        res.status(500).send(e.message);
    }
})

router.post('/', async (req, res) => {
    try{
    let result = await quoteService.insert(req.body);
    res.json(result);}
    catch (err) {
        if (!err instanceof ParamsError)
            res.status(500).send(err);
        res.status(422).send({ "message": err.name + " " + err.message });
    }
})

router.put('/sta/:id', async (req, res) => {
    try{
    let result = await quoteService.updateStatus(req.params.id);
    res.json(result);}
    catch (e) {
        if(e instanceof IdError)
            res.status(404).send(e.message)
        res.status(500).send(e.message);
    }
})

router.put('/pri/:id', async (req, res) => {
    try{
    let result = await quoteService.updatePriority(req.params.id);
    res.json(result);
    }  catch (e) {
        if(e instanceof IdError)
            res.status(404).send(e.message)
        res.status(500).send(e.message);
    }
})

router.delete('/:id', async (req, res) => {
    try{
    let result = await quoteService.delete(req.params.id);
    res.json(result);
    }  catch (e) {
        if(e instanceof IdError)
            res.status(404).send(e.message)
        res.status(500).send(e.message);
    }
})

module.exports = router;