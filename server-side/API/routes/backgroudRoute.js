const express = require('express');
const backgroudService = require('../../BL/services/backgroudService');
const IdError = require('../../BL/errors/IdError');

const router = express.Router();

router.get('/', async (req, res) => {  
    let result = await backgroudService.getAll();
    res.json(result);
})

router.get('/:id', async (req,res)=>{
    try{
    let result = await backgroudService.getById(req.params.id);
    res.json(result);
    }
    catch(e){
        if(e instanceof IdError)
            res.status(404).send(e.name+": "+e.message);
        else
            res.status(500).send(e.name+": "+e.message);        
    }
})
module.exports = router;
