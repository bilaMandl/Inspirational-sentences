const express = require('express');
const artService = require('../../BL/services/artService');
const IdError = require('../../BL/errors/IdError');
const ParamsError = require('../../BL/errors/ParamError');

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        let result = await artService.getAll();
        res.json(result);
    } catch (e) {
        res.status(500).send(e.message);
    }
});

router.get('/:id', async (req, res) => {
    try {

        let result = await artService.getById(req.params.id);
        res.json(result);
    } catch (e) {
        if (e instanceof IdError)
            res.status(404).send({ "message": e.name + " " + e.message })
        res.status(500).send(e.message);
    }
});

router.put('/priority/:id', async (req, res) => {
    try {
        let result = await artService.updatePriority(req.params.id);
        if ("message" in result)
            res.status(403).send(result);
        else
            res.json(result);
    } catch (e) {
        if (e instanceof IdError)
            res.status(404).send({ "message": e.name + " " + e.message })
        res.status(500).send(e.message);
    }

});

router.put('/fms/:id', async (req, res) => {
    try {
        let result = await artService.updateFamous(req.params.id);
        res.json(result);
    } catch (e) {
        if (e instanceof IdError)
            res.status(404).send({ "message": e.name + " " + e.message })
        res.status(500).send(e.message);
    }
})

router.post('/', async (req, res) => {
    try {
        console.log(req.body);
        let result = await artService.newArt(req.body);
        res.json(result);
    }
    catch (e) {
        if (e instanceof ParamsError)
            res.status(422).send({ "message": e.name + " " + e.message })
        res.status(500).send(e.message);
    }
})

router.get('/myarts/:id', async (req, res) => {
    try {
        let result = await artService.getMyArt(req.params.id);
        res.json(result);
    } catch (e) {
        if (e instanceof IdError)
            res.status(404).send({ "message": e.name + " " + e.message })
        res.status(500).send(e.message);
    }

})

module.exports = router;
