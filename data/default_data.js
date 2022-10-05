// this file is for importing default data into DB
const fs = require("fs");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const Employee = require("../models/employee_model");
const User = require("../models/user_model");

dotenv.config({ path: "./config.env" });

const DB = process.env.DB.replace("<password>", process.env.DB_PASSWORD);
mongoose.connect(DB, {
    useNewUrlParser: true
}).then(() => console.log("DB has been successfully connected.."));

const employees = JSON.parse(fs.readFileSync(`${__dirname}/employees.json`, "utf-8"));
const users = JSON.parse(fs.readFileSync(`${__dirname}/users.json`, "utf-8"));

const import_data = async () => {
    try {
        await Employee.create(employees);
        await User.create(users);

        console.log("Data Successfully Imported");
        process.exit();
    } catch (err) {
        console.log(err);
    }
};

const delete_data = async () => {
    try {
        await Employee.deleteMany();
        await User.deleteMany();

        console.log("Data Successfully Deleted");
        process.exit();
    } catch (err) {
        console.log(err);
    }
}

if (process.argv[2] === "--import") import_data();
else if (process.argv[2] === "--delete") delete_data();