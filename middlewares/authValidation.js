const { userLoginSchema } = require('../schemas/auth');
const jwt = require('jsonwebtoken');
const { getUserById } = require('../services/user');

const validateAuthUser = (req, res, next) => {

    const { error } = userLoginSchema.validate(req.body);

    if (error) {
        return res.status(400).send(error.details);
    }

    next();
}

const verifyUser = async (req, res, next) => {
    const auth_token = req.headers.authorization ? req.headers.authorization : null;

    if (!auth_token) return res.status(401).send("Token required!");

    const token = auth_token.split(' ')[1];

    const secret_key = process.env.TODO_APP_SECRET;

    const payload = jwt.verify(token, secret_key);

    const user = await getUserById(payload.id);

    if (!user) return res.status(401).send("Invalid User!");

    req.user = user;

    next();

}

module.exports = {
    validateAuthUser,
    verifyUser
}