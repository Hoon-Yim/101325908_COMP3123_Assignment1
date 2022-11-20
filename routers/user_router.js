const express = require("express");
const router = express.Router();

const user_controller = require("../controllers/user_controller");

router.get("/get_logged_in_user", user_controller.protect, user_controller.get_logged_in_user);
router.post("/signup", user_controller.signup);
router.post("/login", user_controller.login);

module.exports = router;