const Backgroud = require("../models/backgroud");

class BackgroudRepository {
    async getAll() {
        let result = await Backgroud.find();
        return result;
    }
    async getById(id) {
        let result = await Backgroud.find({ id: id });
        return result;
    }
}

const backgroudRepository = new BackgroudRepository();
module.exports = backgroudRepository;