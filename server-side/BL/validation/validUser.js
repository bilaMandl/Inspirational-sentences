const Joi = require("joi");

function ValidUser(bodyParams) {
    const userSchema = Joi.object({
        name: Joi.string().required(),
        password: Joi.string().required(),
        mail: Joi.string().email().required(),
    });
    return userSchema.validate(bodyParams);
}

module.exports = ValidUser;