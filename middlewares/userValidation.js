const winston = require('winston');
const { userSchema, userProfileSchema, userPasswordSchema } = require('../schemas/user');

const validateUser = (req, res, next) => {

    const { error } = userSchema.validate(req.body);
    console.log(req.body)
    if (error) {
        winston.error("Error:", error);
        return res.status(400).send(error.details);
    }

    next();
}

const validateUserPersonalDetails = (req, res, next) => {

    const { error } = userProfileSchema.validate(req.body);

    if (error) {
        winston.error("Error:", error);
        return res.status(400).send(error.details);
    }

    next();
}

const validateUserChangePasswordFields = (req, res, next) => {
    const { error } = userPasswordSchema.validate(req.body);


    if (error) {
        winston.error("Error:", error);
        return res.status(400).send(error.details);
    }

    next();
}

module.exports = {
    validateUser,
    validateUserPersonalDetails,
    validateUserChangePasswordFields
}