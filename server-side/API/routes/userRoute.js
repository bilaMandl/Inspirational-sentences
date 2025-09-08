const express = require('express');
const userService = require('../../BL/services/userService');
const ParamsError = require('../../BL/errors/ParamError');
const IdError = require('../../BL/errors/IdError');
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        let result = await userService.getAll();
        res.json(result);
    }
    catch (err) {
        res.status(500).send(err.message);
    }
})

router.get('/:id', async (req, res) => {
    try {
        let result = await userService.getById(req.params.id);
        res.json(result);
    }
    catch (err) {
        res.status(500).send(err.message);
    }
})

router.post('/', async (req, res) => {
    try {
        let result = await userService.addNewUser(req.body);
        res.json(result);
    }
    catch (err) {
        if (!err instanceof ParamsError)
            res.status(500).send();
        res.status(422).send({ "message": err.name + " " + err.message });

    }
})
router.post('/log',async(req,res)=>{
    try{
        let result = await userService.loginUser(req.body.name,req.body.pass)
        res.json(result)
    }
    catch(e){
        if (!e instanceof ParamsError)
            res.status(500).send(e.message);
        res.status(422).send({ "message": e.name + " " + e.message });
    }
})

router.put('/suggest/:id', async (req, res) => {
    try {
        let result = await userService.postNewSuggest(req.params.id, req.body);
        res.json(result);
    }
    catch (err) {
        if (err instanceof IdError)
            res.status(404).send({ "message": err.name + " " + err.message })
        res.status(500).send(err.message);
    }
})

router.put('/background/:id', async (req, res) => {
    try {
        let result = await userService.postNewBackground(req.params.id, req.body);
        res.json(result);
    }
    catch (err) {
        if (err instanceof IdError)
            res.status(404).send({ "message": err.name + " " + err.message })
        res.status(500).send(err.message);
    }
})
router.put('/quote/:id', async (req, res) => {
    try {
        let result = await userService.postNewQuote(req.params.id, req.body);
        res.json(result);
    }
    catch (err) {
        if (err instanceof IdError)
            res.status(404).send({ "message": err.name + " " + err.message })
        res.status(500).send(err.message);
    }
})

router.put('/quote/d/:id', async (req, res) => {
    try {
        let result = await userService.deleteQuote(req.params.id, req.body);
        res.json(result);
    }
    catch (err) {
        if (err instanceof IdError)
            res.status(404).send({ "message": err.name + " " + err.message })
        res.status(500).send(err.message);
    }
})

router.put('/suggest/d/:id', async (req, res) => {
    try {
        let result = await userService.deleteSuggest(req.params.id, req.body);
        res.json(result);
    }
    catch (err) {
        if (err instanceof IdError)
            res.status(404).send({ "message": err.name + " " + err.message })
        res.status(500).send(err.message);
    }
})

router.put('/background/d/:id', async (req, res) => {
    try {
        let result = await userService.deleteBackground(req.params.id, req.body);
        res.json(result);
    }
    catch (err) {
        if (err instanceof IdError)
            res.status(404).send({ "message": err.name + " " + err.message })
        res.status(500).send(err.message);
    }
})

module.exports = router;