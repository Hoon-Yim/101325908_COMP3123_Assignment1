const AppError = require("../utils/app_error");

const SendError = (err, req, res, next) => {
    return res.status(err.status_code).json({
        status: err.status,
        message: err.message,
        error: err,
        error_stack: err.stack
    });
}

const handleDuplicateFieldsDB = err => {
    const key = Object.keys(err.keyValue);
    const value = Object.values(err.keyValue);
    const message = `Someone is already signed up with ${key} as ${value}. Please use another ${key}!`;
    return new AppError(message, 400);
}

const handleJWTError = () => new AppError("Invalid token.", 401);

module.exports = (err, req, res, next) => {
    err.status_code = err.status_code || 500;
    err.status = err.status == undefined ? "error" : err.status;

    let error = { ...err };
    error.message = err.message;

    if (error.code === 11000) error = handleDuplicateFieldsDB(error);
    if (error.name === "JsonWebTokenError") error = handleJWTError();

    SendError(error, req, res, next);
}