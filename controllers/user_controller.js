const User = require("../models/user_model");

exports.signup = async (req, res) => {
    const new_user = await User.create({
        username: "Hoon",
        email: "yimsh4507@gmail.com",
        password: "something",
        passwordConfirm: "something"
    });

    res.status(201).json({
        status: true,
        message: "signup() not implemented yet",
        data: new_user
    });
}

exports.login = (req, res) => {
    res.status(201).json({
        status: true,
        message: "login() not implemented yet"
    });
}