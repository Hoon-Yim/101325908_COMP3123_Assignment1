// for using environmental variables in .env file
const dotenv = require("dotenv");

const app = require(`${__dirname}/app`);

dotenv.config({ path: `${__dirname}/config.env` });

// opening server and listening any events
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log("Server is running on port ", PORT, "..");
});