// method that catches an error for async functions
module.exports = func => {
    return (req, res, next) => {
        func(req, res, next).catch(next);
    }
}