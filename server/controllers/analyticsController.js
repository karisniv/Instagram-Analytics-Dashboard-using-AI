const InstagramAnalytics = require("../models/InstagramAnalytics");

// Get all available account IDs
const getAccountNumbers = async (req, res) => {
  try {
    const accounts = await InstagramAnalytics.distinct("account_id");

    accounts.sort((a, b) => a - b);

    res.status(200).json(accounts);
  } catch (error) {
    console.error("Error fetching account IDs:", error.message);

    res.status(500).json({
      message: "Failed to fetch account IDs",
      error: error.message,
    });
  }
};

// Get analytics for a specific account
const getAccountAnalytics = async (req, res) => {
  try {
    const { accountId } = req.params;

    const analytics = await InstagramAnalytics.find({
      account_id: Number(accountId),
    }).sort({ post_datetime: 1 });

    if (!analytics.length) {
      return res.status(404).json({
        message: "No analytics data found for this account",
      });
    }

    res.status(200).json(analytics);
  } catch (error) {
    console.error("Error fetching analytics:", error.message);

    res.status(500).json({
      message: "Failed to fetch analytics",
      error: error.message,
    });
  }
};

module.exports = {
  getAccountNumbers,
  getAccountAnalytics,
};