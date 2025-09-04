class ParamsError extends Error {
    constructor(msg) {
        super(msg);
        this.name = 'ParamsError'; 
    }
}

module.exports = ParamsError;