const Joi = require('joi');

const userSchema = Joi.object({
    firstName: Joi.string().min(3).max(255).required(),
    lastName: Joi.string().min(3).max(255).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
    phoneNumber: Joi.string().min(10).max(10).required()
});

const userProfileSchema = Joi.object({
    firstName: Joi.string().min(3).max(255),
    lastName: Joi.string().min(3).max(255),
    phoneNumber: Joi.string().min(10).max(10)
})

const userPasswordSchema = Joi.object({
    password: Joi.string().min(8).required()
})

module.exports = {
    userSchema,
    userProfileSchema,
    userPasswordSchema
}