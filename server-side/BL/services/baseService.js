const IdError = require("../errors/IdError");
const ParamsError = require("../errors/ParamError");

class BaseService {
    constructor(repository) {
        this.repository = repository;
    }
    async getAll() {
        try {
            let result = await this.repository.getAll();
            return result;
        }
        catch (err) {
            throw err;
        }
    }
    async getById(id) {
        try {
            let result = await this.repository.getById(Number(id));
            if (result.length == 0)
                throw new IdError('the id is invalid')
            return result;
        }
        catch (err) {
            throw err;
        }
    }
    async insert(objToInsert) {
        try {
            let answer =this.isValidObj(objToInsert)
            if (answer) {
                let result = await this.repository.insert(objToInsert);
                return result;
            }
            else
                throw new ParamsError(answer);
        } catch (err) {
            throw err;
        }
    }
    async update(id, objToUpdate) {
        try {
            let result = await this.repository.update(Number(id), objToUpdate);
            return result;
        } catch (err) {
            throw err;
        }
    }
    async delete(id) {
        try {
            let result = await this.repository.delete(Number(id));
            return result;
        } catch (err) {
            throw err;
        }
    }
    isValidObj(obj) {
        if (obj)
            return true;
        return false;
    }
}
module.exports = BaseService;