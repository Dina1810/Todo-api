const mongoose = require('mongoose');
const winston = require('winston');

/**
 * Code to connect to database
 */
const db_url = process.env.DB_URL;
mongoose.connect(db_url, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(result => {
        winston.info("DB Connected!");
    }).catch(error => {
        winston.error("Errors:", error);
    });
