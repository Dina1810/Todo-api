const express = require('express');
const winston = require('winston');

const app = express();

require('dotenv').config();
require('./config/db');

const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const taskRoutes = require('./routes/task');


app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/', (req, res) => {
    return res.write("<h1>hi there</h1>");
});



const port = process.env.PORT || 3000;

app.listen(port, () => {
    winston.info(`listening on port ${port}`);
});