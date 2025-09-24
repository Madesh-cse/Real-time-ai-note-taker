const express = require("express");
const router = express.Router();
const meetingSummary = require("../controller/meetingSummary");

// POST /meetings/summary
router.post("/summary", meetingSummary.getSummary);

// POST /meetings/highlights
router.post("/highlights", meetingSummary.getHighlights);

module.exports = router;
