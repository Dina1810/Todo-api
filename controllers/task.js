const taskServices = require('../services/task');
const winston = require('winston');

/**
 * To handle post request to create a task
 * @param {Object} req 
 * @param {Object} res 
 * @returns 
 */
exports.postTask = async (req, res) => {
    try {
        const user = req.user;
        const { title, description } = req.body;

        task = await taskServices.createTask({ title: title, description: description, userId: user.id });

        return res.status(201).send(task);

    } catch (error) {
        return res.status(500).send("Something went wrong!");
    }
};

/**
 * To get a particular user task by Id
 * @param {Object} req 
 * @param {Object} res 
 * @returns 
 */
exports.getTask = async (req, res) => {
    try {
        const taskId = req.params.id;

        const task = await taskServices.getTaskById(taskId);

        if (!task) return res.status(404).send("Task not found!");

        if (task.userId != req.user.id) return res.status(403).send("Unauthorized access!");

        return res.status(200).send(task);

    } catch (error) {
        console.log(error);
        return res.status(500).send("Something went wrong!");
    }

}

/**
 * to handle patch request to update fields of user task
 * @param {Object} req 
 * @param {Object} res 
 * @returns 
 */
exports.updateTask = async (req, res) => {
    try {
        const taskId = req.params.id;
        const fields = req.body;

        let task = await taskServices.getTaskById(taskId);

        if (!task) return res.status(404).send("Task not found!");

        if (task.userId != req.user.id) return res.status(403).send("Unauthorized access!");

        task = await taskServices.updateTask(taskId, fields);

        return res.status(200).send(task);


    } catch (error) {
        console.log(error);
        return res.status(500).send("Something went wrong!");
    }
}

/**
 * To handle patch req to change the status of the given user task
 * @param {Object} req 
 * @param {Object} res 
 * @returns 
 */
exports.updateTaskStatus = async (req, res) => {
    try {
        const status = req.body.status;
        const taskId = req.params.id;

        let task = await taskServices.getTaskById(taskId);

        if (!task) return res.status(404).send("Task not found!");

        if (task.userId != req.user.id) return res.status(403).send("Unauthorized access");

        task = await taskServices.changeStatus(taskId, status);

        return res.status(200).send(task);

    } catch (error) {
        winston.error(error);
        return res.status(500).send("Something went wrong!");
    }
}

/**
 * To list all the user tasks
 * @param {Object} req 
 * @param {Object} res 
 * @returns 
 */
exports.listUserTasks = async (req, res) => {
    try {
        const userId = req.user.id;
        const pageNo = req.query.pageNo;
        const sortBy = req.query.sortBy;
        const order = req.query.order;
        const status = req.query.status;

        let tasks = [];
        if (status) {
            tasks = await taskServices.listUserTaskByStatus(userId, status, pageNo, sortBy, order);
        } else {
            tasks = await taskServices.getUserTasks(userId, pageNo, sortBy, order);
        }

        if (tasks.length == 0) return res.status(404).send("No tasks available!");

        return res.status(200).send(tasks);

    } catch (error) {
        console.log(error);
        return res.status(500).send("Something went wrong!");
    }
}

/**
 * To list all the user tasks of the given status
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
exports.getUserTaskByStatus = async (req, res) => {
    try {
        const userId = req.user.id;
        const status = req.params.status;

        const tasks = await taskServices.listUserTaskByStatus(userId, status);

        if (!tasks) return res.status(404).send("Tasks with the given status not found!");

        return res.status(200).send(tasks);

    } catch (error) {

    }
}

/**
 * To delete given user task
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
exports.deleteTask = async (req, res) => {
    try {
        const taskId = req.params.id;

        let task = await taskServices.getTaskById(taskId);

        if (!task) return res.status(404).send("Task not found!");

        if (task.userId != req.user.id) return res.status(403).send("Unauthorized access!");

        task = await taskServices.deleteTask(taskId);

        return res.status(200).send(task);

    } catch (error) {
        winston.error(error);
        return res.status(500).send("Something went wrong!");
    }
}