// js packages
require('dotenv').config();
require('express-async-errors');
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const app = express();

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser());

/*
first connecting with the database 
then we are moving forward 
*/
const PORT = process.env.PORT || 3000;
(async function () {
    try {
        app.listen(PORT, function () {
            console.log('server is listening at port', PORT);
        });
    } catch (error) {
        console.log('unable to connect with the database', error);
    }
})();
