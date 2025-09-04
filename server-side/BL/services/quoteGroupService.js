const quoteGroupRepository = require("../../DAL/repositories/quoteGroupRepository");
const BaseService = require("./baseService");

class QuoteGroupService extends BaseService{
    constructor(){
        super(quoteGroupRepository)
    }
}
let quoteGroupService =new QuoteGroupService();
module.exports = quoteGroupService;