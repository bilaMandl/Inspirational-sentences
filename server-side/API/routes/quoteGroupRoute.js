const express = require('express');
const quoteGroupService = require('../../BL/services/quoteGroupService');

const router = express.Router();

router.get('/', async (req, res) => {   
    let result = await quoteGroupService.getAll();
    res.json(result);
})

module.exports = router;
