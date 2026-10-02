const express = require("express");

const {
  generateReport,
} = require("../controllers/reportController");

const router = express.Router();

// Generate analytics report
router.post("/generate", generateReport);

module.exports = router;