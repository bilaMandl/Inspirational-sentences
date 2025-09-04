const quoteRepository = require("../../DAL/repositories/quoteRepository");
const IdError = require("../errors/IdError");
const ValidQuote = require("../validation/validQuote");
const BaseService = require("./baseService");

class QuoteService extends BaseService {
    constructor() {
        super(quoteRepository)
    }
    isValidObj(obj) {
        const validationResult = ValidQuote(obj);
        if (validationResult.error)
            return validationResult.error;
        return true;
    }
    async getAllStatus(pass) {
        if (pass == "123") {
            let result = await quoteRepository.getAllStatus();
            return result;
        }
        else
            return null;
    }
    async updateStatus(id) {
        try {
            let result = await quoteRepository.updateStatus(Number(id));
            if (result == null) {
                throw new IdError("The Id is not exist");
            }
            return result;
        }
        catch (err) {
            console.log("error " + err.name);
            throw err;
        }
    }
    async updatePriority(id) {
        try {
            let result = await quoteRepository.updatePriority(Number(id));
            if (result == null) {
                throw new IdError("The Id is not exist");
            }
            return result;
        }
        catch (err) {
            console.log("error " + err.name);
            throw err;
        }
    }
    async addQuote(obj) {
        try {
            let quote = { id: newId, text: obj.text, title: obj.title, groupId: obj.groupId, priority: 0, status: false }
            let result = await quoteRepository.insert(quote);
            return result;
        }
        catch (e) {
            throw e;
        }
    }
}
let quoteService = new QuoteService();
module.exports = quoteService;