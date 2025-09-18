const express = require("express");
const router = express.Router();
const geminiController = require("../controllers/geminiController");


// New trip planning endpoint
router.post("/plan-trip", geminiController.generateTripPlan);

module.exports = router;
