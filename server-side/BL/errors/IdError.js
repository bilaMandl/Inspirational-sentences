class IdError extends Error {
    constructor(msg) {
        super(msg)
        this.name = "IdError";
    }
}

module.exports = IdError;