const winston = require('winston');
const { User } = require('../models/User');

const PAGE_LIMIT = 10;


/**
 * To create a user and add it to db
 * @param {Object} user
 * @returns {Object} 
 */
const createUser = async (user) => {
    try {

        user = new User(user);
        user = await user.save();

        return user;

    } catch (error) {
        throw error;
    }
};

/**
 * To get user details given Id
 * @param {ObjectId} id 
 * @returns {Object} user 
 */
const getUserById = async (id) => {
    try {
        let user = await User.findById(id);

        return user;
    } catch (error) {
        throw error;
    }
}

/**
 * To get user by email
 * @param {String} email 
 * @returns 
 */
const getUserByEmail = async (email) => {
    try {
        let user = await User.findOne({ email: email });

        return user;
    } catch (error) {
        throw error;
    }
}

/**
 * 
 * @param {ObjectId} id 
 * @param {Object} user 
 * @returns {Object} User
 */
const updateUserDetails = async (id, user) => {
    try {

        user = await User.findByIdAndUpdate(id, user);

        user = await getUserById(id);

        return user;

    } catch (error) {
        throw error;
    }
}

/**
 * 
 * @param {ObjectId} userId 
 * @param {String} newPassword 
 * @returns {User}
 */
const updatePassword = async (userId, newPassword) => {
    try {
        let user = await getUserById(userId);
        user.password = newPassword;
        user = user.save();
        return user;
    } catch (error) {
        throw error
    }
}

/**
 * to list all the users 
 * @param {Number} pageNo 
 * @param {String} sortBy 
 * @param {String} orderBy 
 * @returns {Users[]} list of users
 */

const getAllUsers = async (pageNo = 0, sortBy = 'firstName', order = 'asc') => {
    try {

        const sort = {};
        sort[sortBy] = order;

        const users = await User.find().select('id email firstName lastName phoneNumber')
            .skip(pageNo * PAGE_LIMIT)
            .sort(sort);

        return users;

    } catch (error) {
        throw error;
    }
}

/**
 * to remove user given id
 * @param {ObjectId} id 
 * @returns {Object}
 */
const removeUser = async (id) => {
    try {

        const user = await User.findByIdAndRemove(id);

        return user;

    } catch (error) {
        throw error;
    }
}

module.exports = {
    createUser,
    removeUser,
    updateUserDetails,
    getUserById,
    getUserByEmail,
    getAllUsers,
    updatePassword
}