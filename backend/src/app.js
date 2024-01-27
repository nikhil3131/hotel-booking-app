// js packages
require('dotenv').config();
require('express-async-errors');
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const { connect } = require('./db/config');
const app = express();

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser());

// api routes
app.use('/api/v1/user', require('./routes/user.route'))

// route doesnot exists
app.use('*', function(req, res){
    res.send("route does not exists")
})

// global error handler
app.use(require('./middlewares/globalErrorHandler'))

/*
first connecting with the database 
then we are moving forward 
*/
const PORT = process.env.PORT || 3000;
(async function () {
    try {
        await connect();
        app.listen(PORT, function () {
            console.log('server is listening at port', PORT);
        });
    } catch (error) {
        console.log('unable to connect with the database', error);
    }
})();
