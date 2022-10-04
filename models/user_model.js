const mongoose = require("mongoose");
const validator = require("validator");

const user_schema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please provide username.."]
    },
    email: {
        type: String,
        required: [true, "Please provide email.."],
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, "Provided email is not in valid form.."]
    },
    password: {
        type: String,
        required: [true, "Please provide password.."],
        minlength: 4
    },
    passwordConfirm: {
        type: String,
        required: [true, "Please re-enter your password.."],
        validate: {
            validator: function (password) {
                return this.password === password;
            },
            message: "re-entered password is not identical.."
        }
    }
});