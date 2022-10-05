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

exports.create_employee = catch_async(async (req, res, next) => {
    const new_employee = await Employee.create({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        gender: req.body.gender,
        salary: req.body.salary,
    });

    res.status(201).json({
        status: true,
        employee: new_employee
    });
});

exports.get_employee = catch_async(async (req, res, next) => {
    const employee = await Employee.findById(req.params.eid);

    res.status(200).json({
        status: true,
        employee
    });
});

exports.update_employee = catch_async(async (req, res, next) => {
    // the "new" option in the 3rd argument is to make it return updated document, not the original one
    const updated_employee = await Employee.findByIdAndUpdate(req.params.eid, req.body, { new: true, runValidators: true });

    res.status(200).json({
        status: true,
        message: `An employee ${req.params.eid} has been successfully updated`,
        employee: updated_employee
    });
});