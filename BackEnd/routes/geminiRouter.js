const express = require("express");
const router = express.Router();
const geminiController = require("../controllers/geminiController");
const authenticateToken = require("../middlewares/authenticateToken");


// New trip planning endpoint
router.post("/plan-trip", geminiController.generateTripPlan);

module.exports = router;
