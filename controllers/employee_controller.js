const Employee = require("../models/employee_model");
const AppError = require("../utils/app_error");
const catch_async = require("../utils/catch_async");

exports.get_all_employees = catch_async(async (req, res, next) => {
    const employees = await Employee.find();

    res.status(200).json({
        status: true,
        results: employees.length,
        employees
    });
});