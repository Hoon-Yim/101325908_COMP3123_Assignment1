const express = require("express");
const router = express.Router();

const user_controller = require("../controllers/user_controller");
const employee_controller = require("../controllers/employee_controller");

// checks if the user is logged in
// if not, the app will not let the user access routes below
router.use(user_controller.protect);

router
    .route("/employees")
    .get(employee_controller.get_all_employees)
    .post(employee_controller.create_employee);

router
    .route("/employees/:eid")
    .get(employee_controller.get_employee)
    .put(employee_controller.update_employee);

module.exports = router;