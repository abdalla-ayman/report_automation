const express = require("express");
const appControllers = require("../controllers/index");
const router = express.Router();

router.post("/report", appControllers.report);

router.post("/register", appControllers.register);

router.post("/generate_report", appControllers.generateWeekReport);

// define the about route

module.exports = router;
