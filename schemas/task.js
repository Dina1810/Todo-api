const Joi = require('joi');


const taskSchema = Joi.object({
    title: Joi.string().min(3).required(),
    description: Joi.string().min(3).required()
});

const statusSchema = Joi.object({
    status: Joi.string().valid('created', 'started', 'completed', 'cancelled').required()
})

const updateTaskSchema = Joi.object({
    title: Joi.string().min(3),
    description: Joi.string().min(3)
})
module.exports = {
    taskSchema,
    statusSchema,
    updateTaskSchema
}