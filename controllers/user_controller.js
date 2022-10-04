const User = require("../models/user_model");
const catch_async = require("../utils/catch_async");

exports.signup = catch_async(async (req, res) => {
    const new_user = await User.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        password_confirm: req.body.password_confirm
    });

    res.status(201).json({
        status: true,
        data: new_user
    });
});

exports.login = catch_async(async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return next(new AppError("Please provide email and password.."), 400);
    }

    const user = await User.findOne({ email });

    res.status(200).json({
        status: true
    });
});