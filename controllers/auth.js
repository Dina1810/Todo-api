const userServices = require('../services/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

exports.userLogin = async (req, res) => {
    try {

        const { email, password } = req.body;

        const user = await userServices.getUserByEmail(email);

        if (!user) return res.status(400).send("Invalid email!");

        const matched = await bcrypt.compare(password, user.password);

        if (!matched) return res.status(400).send("Invalid password!");

        const secret_key = process.env.TODO_APP_SECRET;

        const token = jwt.sign({ id: user.id }, secret_key);

        return res.status(200).send({ token: token });

    } catch (error) {

        return res.status(500).send("Something went wrong!");
    
    }

};

