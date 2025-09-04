const Joi = require("joi");

function ValidQuote(bodyParams) {
    const quoteSchema = Joi.object({
        text: Joi.string().required(),
        title: Joi.string().required(),
        groupId: Joi.number().required(),
    });
    return quoteSchema.validate(bodyParams);
}

module.exports = ValidQuote;