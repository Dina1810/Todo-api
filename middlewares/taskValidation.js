const winston = require('winston');
const { taskSchema, statusSchema, updateTaskSchema } = require('../schemas/task');

const validateTask = (req, res, next) => {

    const { error } = taskSchema.validate(req.body);

    if (error) {
        winston.error("Error:", error);
        return res.status(400).send(error.details);
    }

    next();
}

const validateTaskUpdation = (req, res, next) => {
    const { error } = updateTaskSchema.validate(req.body);

    if (error) {
        winston.error("Error:", error);
        return res.status(400).send(error.details);
    }

    next();

}

const validateTaskStatus = (req, res, next) => {
    const { error } = statusSchema.validate(req.body);
    if (error) {
        winston.error("Error:", error);
        return res.status(400).send(error.details);
    }

    next();
}


module.exports = {
    validateTask,
    validateTaskStatus,
    validateTaskUpdation
}