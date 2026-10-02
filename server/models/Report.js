const mongoose = require("mongoose");

const ReportSchema = new mongoose.Schema(
  {
    analystName: {
      type: String,
      required: true,
      trim: true,
    },

    account_id: {
      type: Number,
      required: true,
      index: true,
    },

    summary: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },

    postAnalysis: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },

    contentAnalysis: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },

    aiInsights: {
      type: [String],
      default: [],
    },

    reportFileName: {
      type: String,
    },

    generatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Report", ReportSchema);