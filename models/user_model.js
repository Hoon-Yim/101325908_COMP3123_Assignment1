const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const user_schema = new mongoose.Schema({
    // username is unique because the instruction says it should be primary key
    username: {
        type: String,
        unique: true,
        maxlength: 100,
        required: [true, "Please provide username.."]
    },
    email: {
        type: String,
        required: [true, "Please provide email.."],
        unique: true,
        lowercase: true,
        maxlength: 50,
        validate: [validator.isEmail, "Provided email is not in valid form.."]
    },
    password: {
        type: String,
        required: [true, "Please provide password.."],
        maxlength: 50
    },
    password_confirm: {
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

// encrypting user's password whenever it is added in DB
// this function will be automatically invoked when I use mongoose.create() method
user_schema.pre("save", async function (next) {
    this.password = await bcrypt.hash(this.password, 12);
    // Since password_confirm is only used when a user signs up,
    // there is no reason to store it in DB
    this.password_confirm = undefined;

    next();
});

// this function is used when a user logs in
// it will check if the password that a user entered is correct
user_schema.methods.isPasswordCorrect = async function (inputted_password, password_in_db) {
    return await bcrypt.compare(inputted_password, password_in_db);
}

module.exports = mongoose.model("user", user_schema);