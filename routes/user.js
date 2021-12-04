const express = require('express');
const usersController = require('../controllers/users');
const usersMiddleware = require('../middlewares/userValidation');
const { verifyUser } = require('../middlewares/authValidation');
const router = express.Router();

router.post('/', usersMiddleware.validateUser, usersController.postUser);

router.get('/', usersController.getUsers);

router.get('/:id', usersController.getUserById);

router.patch('/', verifyUser, usersMiddleware.validateUserPersonalDetails, usersController.updateUserData);

router.patch('/passwordReset', verifyUser, usersMiddleware.validateUserChangePasswordFields, usersController.changeUserPassword);

router.delete('/:id', usersController.deleteUser);


module.exports = router;