const express = require("express");
const app = express();

// body parser
app.use(express.json());

module.exports = app;