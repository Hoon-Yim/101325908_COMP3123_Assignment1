const mongoose = require("mongoose");
const validator = require("validator");

const employee_schema = new mongoose.Schema({
    first_name: {
        type: String,
        maxlength: 100,
        required: [true, "An employee must have a first name.."]
    },
    last_name: {
        type: String,
        maxlength: 50,
        required: [true, "An employee must have a last name.."]
    },
    email: {
        type: String,
        unique: true,
        lowercase: true,
        maxlength: 50,
        validate: [validator.isEmail, "Provided email is no in valid format.."]
    },
    gender: {
        type: String,
        maxlength: 25,
        enum: ["male", "female", "other"],
        default: "other"
    },
    salary: {
        type: Number,
        required: [true, "An employee must have a salary"]
    }
});

module.exports = mongoose.model("employee", employee_schema);