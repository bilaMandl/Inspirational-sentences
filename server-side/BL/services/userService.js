const userRepository = require("../../DAL/repositories/userRepository");
const IdError = require("../errors/IdError");
const sendEmail = require("./sendEmail");
const BaseService = require("./baseService");
const quoteRepository = require("../../DAL/repositories/quoteRepository");
const backgroudRepository = require("../../DAL/repositories/backgroudRepository");
const ValidUser = require("../validation/validUser");
const ParamsError = require("../errors/ParamError");

class UserService extends BaseService {
    constructor() {
        super(userRepository)
    }
    isValidObj(obj) {
        const validationResult = ValidUser(obj);
        if (validationResult.error)
            return validationResult.error;
        return true;
    }
    async addNewUser(newUser) {
        try {
            let result = await this.insert(newUser);
            let html = `<div dir="rtl"><p> שלום ל${newUser.name}</p>
            <p>הצטרפותך לאתר איידיבליזי מג'יק בוצעה בהצלחה</p>
            <p>מחכים לקבל ממך השראה וקסם</p>
            <p> צוות איידיבליזי מג'יק</p></div>`
            sendEmail(
                newUser.mail,
                null,
                "הי! הצטרפת בהצלחה לאיידיבליזי מג'יק",
                html
            )
            return result;
        }
        catch (err) {
            throw err;
        }
    }
    async postNewSuggest(id, sugg) {
        try {
            let user = await userRepository.getById(id);
            if (user) {
                let quote = { id: sugg.quoteId, text: sugg.text, title: sugg.title, groupId: sugg.groupId, priority: 0, status: false }
                let suggest = await quoteRepository.insert(quote)
                await userRepository.postNewSuggest(id, suggest.id);
                user = await userRepository.getById(id);
                return user;
            }
            else
                throw new IdError("the id is invalid");
        } catch (e) {
            throw e;
        }
    }
    async postNewBackground(id, background) {
        try {
            let user = await userRepository.getById(id);
            if (user) {
                await userRepository.postNewBackground(id, background);
                user = await userRepository.getById(id);
                return user;
            }
            else
                throw new IdError("the id is invalid");
        } catch (e) {
            throw e;
        }
    }
    async loginUser(name,pass){
        try{
            let result = await userRepository.login(name,pass)
            if(!result)
                throw new ParamsError("the pass word or name is invalid");
            else 
                return result;
        }
        catch(e){
            throw e;
        }
    }
    async deleteSuggest(id, sugg) {
        try {
            let user = await userRepository.getById(id);
            if (user) {
                await quoteRepository.delete(sugg.id);
                await userRepository.deleteSuggest(id, sugg.id);
                user = await userRepository.getById(id);
                return user;
            }
            else
                throw new IdError("the id is invalid");
        } catch (e) {
            throw e;
        }
    }
    async deleteBackground(id, background) {
        try {
            let user = await userRepository.getById(id);
            if (user) {
                await userRepository.deleteBackground(id, background);
                user = await userRepository.getById(id);
                return user;
            }
            else
                throw new IdError("the id is invalid");
        } catch (e) {
            throw e;
        }
    }
    async postNewQuote(id, quote) {
        try {
            let user = await userRepository.getById(id);
            if (user) {
                await userRepository.postNewQuote(id, quote);
                user = await userRepository.getById(id);
                return user;
            }
            else
                throw new IdError("the id is invalid");
        } catch (e) {
            throw e;
        }
    }
    async deleteQuote(id, quote) {
        try {
            let user = await userRepository.getById(id);
            if (user) {
                await userRepository.deleteQuote(id, quote);
                user = await userRepository.getById(id);
                return user;
            }
            else
                throw new IdError("the id is invalid");
        } catch (e) {
            throw e;
        }
    }
}

let userService = new UserService();
module.exports = userService;