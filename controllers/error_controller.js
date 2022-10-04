const AppError = require("../utils/app_error");

const SendError = (err, req, res, next) => {
    return res.status(err.status_code).json({
        status: err.status,
        error: err,
        message: err.message,
        error_stack: err.stack
    });
}

module.exports = (err, req, res, next) => {
    err.status_code = err.status_code || 500;
    err.status = err.status || "error";

    let error = { ...err };
    error.message = err.message;

    SendError(error, req, res, next);
}