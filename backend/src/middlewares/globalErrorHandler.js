const { BaseError } = require('sequelize');
const { CustomApiError } = require('../utils/customError');

async function globalErrorHandler(err, req, res, next) {
    // custom error respone
    if (err instanceof CustomApiError) {
        return res.status(err.stausCode).json({
            status: err.status,
            message: err.message,
        });
    }

    // sequelize validation error
    if (err instanceof BaseError) {
        return res.status(400).json({
            status: 'fail',
            message: err.message,
        });
    }

    // default error repsponse
    return res.status(500).json({
        status: 'error',
        message: 'something went wrong',
    });
}

module.exports = globalErrorHandler;
