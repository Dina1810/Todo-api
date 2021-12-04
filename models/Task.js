const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        min: 3,
        required: 'Task must have a Title!'
    },
    description: {
        type: String,
        min: 3,
        required: 'Task must have description'
    },
    status: {
        type: String,
        enum: ['created', 'started', 'completed', 'cancelled'],
        default: 'created'
    },
    date: {
        type: Date,
        default: Date.now()
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

const Task = mongoose.model('Task', taskSchema);

module.exports = {
    Task
}


