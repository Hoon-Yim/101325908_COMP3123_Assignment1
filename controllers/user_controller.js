const JWT = require("jsonwebtoken");

const User = require("../models/user_model");
const AppError = require("../utils/app_error");
const catch_async = require("../utils/catch_async");

// singing token using _id
const sign_token = id => {
    return JWT.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    });
}

const create_and_send_token = (user, status_code, res) => {
    const token = sign_token(user._id);
    const cookie_options = {
        expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000),
        httpOnly: true
    }

    // setting cookie to check if the user is logged in or not
    res.cookie("jwt", token, cookie_options);

    res.status(status_code).json({
        status: true,
        token,
        user
    });
}

exports.signup = catch_async(async (req, res) => {
    const new_user = await User.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        password_confirm: req.body.password_confirm
    });

    create_and_send_token(new_user, 201, res);
});

exports.login = catch_async(async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return next(new AppError("Please provide email and password.."), 400);
    }

    const user = await User.findOne({ email });

    if (!user || !(await user.isPasswordCorrect(password, user.password))) {
        return next(new AppError("Incorrect Email or Password", 401));
    }

    create_and_send_token(user, 200, res);
});