const Joi = require("joi");

function ValidArt(bodyParams) {
    const artSchema = Joi.object({
        title: Joi.string().required(),
        userId: Joi.number().required(),
        famous: Joi.boolean().required(),
        backroundId: Joi.number().required(),
        textId: Joi.number().required()
    });
    return artSchema.validate(bodyParams);
}

module.exports = ValidArt;