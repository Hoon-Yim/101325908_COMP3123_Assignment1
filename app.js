const express = require("express");
const app = express();

// body parser
app.use(express.json());

// routers
const user_router = require("./routers/user_router");
app.use("/api/user", user_router);

module.exports = app;