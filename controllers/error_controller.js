const SendError = (err, req, res, next) => {
    return res.status(err.status_code).json({
        status: err.status,
        message: err.message,
        error: err,
        error_stack: err.stack
    });
}

module.exports = (err, req, res, next) => {
    err.status_code = err.status_code || 500;
    err.status = err.status == undefined ? "error" : err.status;

    let error = { ...err };
    error.message = err.message;

    SendError(error, req, res, next);
}