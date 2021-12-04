const express = require('express');
const taskMiddleware = require('../middlewares/taskValidation');
const taskController = require('../controllers/task');

const { verifyUser } = require('../middlewares/authValidation');

const router = express.Router();

router.post('/', verifyUser, taskMiddleware.validateTask, taskController.postTask);

router.get('/', verifyUser, taskController.listUserTasks);

router.get('/:id', verifyUser, taskController.getTask);

router.patch('/:id/status', verifyUser, taskMiddleware.validateTaskStatus, taskController.updateTaskStatus);

router.patch('/:id', verifyUser, taskMiddleware.validateTaskUpdation, taskController.updateTask);

router.delete('/:id', verifyUser, taskController.deleteTask);

module.exports = router;