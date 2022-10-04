const cookie_parser = require("cookie-parser");
const express = require("express");
const app = express();

// body parser
app.use(express.json());
app.use(cookie_parser());

// routers
const user_router = require("./routers/user_router");
app.use("/api/user", user_router);

// global error handling controller
const error_controller = require("./controllers/error_controller");
app.use(error_controller);

module.exports = app;