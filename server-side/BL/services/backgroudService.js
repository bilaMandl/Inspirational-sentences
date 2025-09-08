const backgroudRepository = require("../../DAL/repositories/backgroudRepository");
const BaseService = require("./baseService");

class BackgroudService extends BaseService{
    constructor(){
        super(backgroudRepository)
    }
}
let backgroudService =new BackgroudService();
module.exports = backgroudService;