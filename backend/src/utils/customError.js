class CustomApiError extends Error {
    constructor(statusCode, message) {
        super(message);
        this.stausCode = statusCode;
        this.status = 'fail';
    }
}

function customError(statusCode, message){
    return new CustomApiError(statusCode, message)
}

module.exports = {
    CustomApiError,
    customError
}