// for DB connection
const mongoose = require("mongoose");
// for using environmental variables in .env file
const dotenv = require("dotenv");

const app = require(`${__dirname}/app`);

dotenv.config({ path: `${__dirname}/config.env` });

// DB connection
const DB = process.env.DB.replace("<password>", process.env.DB_PASSWORD);
mongoose.connect(DB, {
    useNewUrlParser: true
}).then(() => console.log("DB has been successfully connected.."));

// opening server and listening any events
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log("Server is running on port ", PORT, "..");
});