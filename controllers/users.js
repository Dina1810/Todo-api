const winston = require('winston');
const _ = require('lodash');
const userServices = require('../services/user');
const { User } = require('../models/User');

/**
 * To handle post req to create a user
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
exports.postUser = async (req, res) => {
    try {
        let user = _.pick(req.body, ['email', 'password', 'firstName', 'lastName', 'phoneNumber']);

        const exists = await userServices.getUserByEmail(user.email);

        if (exists) return res.status(400).send("User already exists!");

        user = await userServices.createUser(user);

        return res.status(201).send(user);

    } catch (error) {
        winston.error("Error:", error);
        return res.status(500).send("Something went wrong!");
    }
}

/**
 * To handle get req to get user details given Id
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
exports.getUserById = async (req, res) => {
    try {

        const userId = req.params.id;

        let user = await userServices.getUserById(userId);

        if (!user) return res.status(404).send("User with the given Id not found!");

        const { id, email, firstName, lastName, phoneNumber } = user;

        return res.status(200).send({ id, email, firstName, lastName, phoneNumber });


    } catch (error) {
        winston.error("Error:", error);
        return res.status(500).send("Something went wrong!");
    }
}

/**
 * To handle patch req to update user personal details
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
exports.updateUserData = async (req, res) => {
    try {
        const userId = req.user.id;

        let user = _.pick(req.body, ['firstName', 'lastName', 'phoneNumber']);

        user = await userServices.updateUserDetails(userId, user);

        const { id, email, firstName, lastName, phoneNumber } = user;

        return res.status(200).send({ id, email, firstName, lastName, phoneNumber });

    } catch (error) {
        winston.error("Error:", error);
        return res.status(500).send("Something went wrong!");
    }
}


/**
 * lists all the users in the database
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
exports.getUsers = async (req, res) => {
    try {
        const pageNo = req.query.pageNo;
        const sortBy = req.query.sortBy;
        const sortIn = req.query.sortIn;

        const users = await userServices.getAllUsers(pageNo, sortBy, sortIn);

        if (users.length == 0) return res.status(404).send("No users found!");

        return res.status(200).send(users);

    } catch (error) {
        winston.error("Error:", error);
        return res.status(500).send("Something went wrong!");
    }
}

/**
 *To handle user req to change the password 
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
exports.changeUserPassword = async (req, res) => {
    try {
        const newPassword = req.body.password;
        const userId = req.user.id;

        const user = await userServices.updatePassword(userId, newPassword);

        return res.status(200).send(user);

    } catch (error) {
        winston.error("Error:", error);
        return res.status(500).send("Something went wrong!");
    }
}

/**
 * To remove the user from the database
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
exports.deleteUser = async (req, res) => {
    try {
        const userId = req.params.id;

        const user = await userServices.removeUser(userId);

        if (!user) return res.status(404).send("User with the given id not found!");

        const { id, email, firstName, lastName, phoneNumber } = user;

        return res.status(200).send({ id, email, firstName, lastName, phoneNumber });

    } catch (error) {
        winston.error("Error:", error);
        return res.status(500).send("Something went wrong!");
    }
}