const express = require("express");

const {
  getAccountNumbers,
  getAccountAnalytics,
} = require("../controllers/analyticsController");

const router = express.Router();

// Get all available account IDs
router.get("/accounts", getAccountNumbers);

// Get analytics for a specific account ID
router.get("/:accountId", getAccountAnalytics);

module.exports = router;