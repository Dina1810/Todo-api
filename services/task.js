const { Task } = require('../models/Task');

const PAGE_LIMIT = 5;

/**
 * To create a task  
 * @param {Object} task 
 * @returns {Task} task
 */
const createTask = async (task) => {
    try {
        task = new Task(task);
        task = await task.save();

        return task;
    } catch (error) {
        throw error;
    }
}

/**
 * To get task by Id
 * @param {ObjectId} taskId 
 * @returns {Task} Task
 */
const getTaskById = async (taskId) => {
    try {

        const task = await Task.findById(taskId);

        return task;

    } catch (error) {
        throw error;
    }
}

/**
 * 
 * @param {ObjectId} taskId 
 * @param {Object} fields 
 * @returns {Task}
 */
const updateTask = async (taskId, fields) => {
    try {
        let task = await Task.findByIdAndUpdate(taskId, fields);

        task = await getTaskById(task.id);

        return task;
    } catch (error) {
        throw error;
    }
}


/**
 * To remove task from the database 
 * @param {ObjectId} taskId 
 * @returns {Task} 
 */
const deleteTask = async (taskId) => {
    try {

        const task = await Task.findByIdAndDelete(taskId);

        return task;

    } catch (error) {
        throw error;
    }
}

/**
 * To change the status of the task given taskId
 * @param {ObjectId} taskId 
 * @param {String} status 
 * @returns {Task} 
 */
const changeStatus = async (taskId, status) => {
    try {

        let task = await getTaskById(taskId);
        task.status = status;
        task = await task.save();

        return task;

    } catch (error) {
        throw error;
    }
}

/**
 *To list all the user tasks with the given status 
 * @param {ObjectId} userId 
 * @param {String} status 
 * @returns {Task[]}
 */
const listUserTaskByStatus = async (userId, status, pageNo = 0, sortBy = 'date', order = 'desc') => {
    try {

        const sort = {};
        sort[sortBy] = order;

        const tasks = await Task.find({ userId: userId, status: status })
            .skip(PAGE_LIMIT * pageNo)
            .sort(sort);

        return tasks;

    } catch (error) {
        throw error;
    }
}

/**
 * 
 * @param {ObjectId} userId 
 * @param {Number} pageNo 
 * @param {String} sortBy 
 * @param {String} order 
 * @returns 
 */
const getUserTasks = async (userId, pageNo = 0, sortBy = 'date', order = 'desc') => {
    try {
        const sort = {};
        sort[sortBy] = order;

        const tasks = await Task.find({ userId: userId })
            .skip(PAGE_LIMIT * pageNo)
            .sort(sort);

        return tasks;

    } catch (error) {
        throw error;
    }
}

module.exports = {
    createTask,
    changeStatus,
    updateTask,
    getTaskById,
    getUserTasks,
    listUserTaskByStatus,
    deleteTask
}