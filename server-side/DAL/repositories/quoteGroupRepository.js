const QuoteGroup = require('../models/quoteGroup');

class QuoteGroupRepository{
    async getAll(){        
        let result = await QuoteGroup.find();
        return result;
    }
    async insert(newQuoteGroup){
        let last = await QuoteGroup.findOne().sort({ id: -1 });
        let newId = last ? last.id + 1 : 0;
        let result = await QuoteGroup.insertOne({id : newId, name : newQuoteGroup.name});
        return result;
    }
}

const quoteGroupRepository = new QuoteGroupRepository();
module.exports = quoteGroupRepository;