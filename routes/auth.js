const express = require('express');
const authController = require('../controllers/auth');
const authMiddleware = require('../middlewares/authValidation');

const router = express.Router();

router.post('/', authMiddleware.validateAuthUser, authController.userLogin);

module.exports = router;