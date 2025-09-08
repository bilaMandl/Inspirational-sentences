
const artRepository = require("../../DAL/repositories/artRepository");
const backgroudRepository = require("../../DAL/repositories/backgroudRepository");
const quoteRepository = require("../../DAL/repositories/quoteRepository");
const userRepository = require("../../DAL/repositories/userRepository");
const IdError = require("../errors/IdError");
const ParamsError = require("../errors/ParamError");
const ValidArt = require("../validation/validArt");
const backgroudService = require("./backgroudService");
const BaseService = require("./baseService");
const { processImage } = require("./createArt");
const quoteService = require("./quoteService");
const userService = require("./userService");

class ArtService extends BaseService {
    constructor() {
        super(artRepository)
    }
    isValidObj(obj) {
        const validationResult = ValidArt(obj);
        if (validationResult.error)
            return validationResult.error;
        return true;
    }
    async newArt(obj) {
        try {
            let backgound = await backgroudService.getById(obj.backroundId);
            let quote = await quoteService.getById(obj.textId);
            let user = await userService.getById(obj.userId);            
            let url = await processImage(user.mail, backgound[0].url, quote[0].text, obj.color, obj.size);
            console.log(url);
            let result = await this.insert({ title: obj.title, userId: obj.userId, famous: obj.famous, backroundId: obj.backroundId, textId: obj.textId, url: url })
            return result;
        } catch (e) {
            throw e;
        }
    }
    async insert(objToInsert) {
        try {
            let backgroud = await backgroudRepository.getById(objToInsert.backroundId);
            let quote = await quoteRepository.getById(objToInsert.textId);
            if (quote != null && backgroud != null) {
                let answer = this.isValidObj(objToInsert)
                if (answer) {
                    let result = await artRepository.insert(objToInsert);
                    await userRepository.postNewArt(result.userId, result.id);
                    return result;
                } else
                    throw new ParamsError(answer)
            }
            else
                throw new IdError("the id quote or backgound is invalid")
        } catch (err) {
            throw err;
        }
    }
    async updatePriority(id) {
        try {
            let result = await artRepository.updatePriority(Number(id));
            if (result == null) {
                console.log("my error");
                throw new IdError("The Id is not exist");
            }
            return result;
        }
        catch (err) {
            console.log("error" + err.name);

            throw err;
        }
    }
    async updateFamous(id) {
        try {
            let result = await artRepository.updateFamous(Number(id));
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
    async getMyArt(userId) {
        try {
            let user = await artRepository.getById(userId);
            if (user) {
                let result = await artRepository.getMyArt(userId);
                return result;
            }
            else
                return null;
        } catch (e) {
            throw e;
        }
    }
}
let artService = new ArtService();
module.exports = artService;