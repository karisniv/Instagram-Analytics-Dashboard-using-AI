const fs = require("fs");
const path = require("path");

const InstagramAnalytics = require("../models/InstagramAnalytics");
const Report = require("../models/Report");
const generatePDF = require("../utils/pdfGenerator");

const generateReport = async (req, res) => {
  try {
    const {
      analystName,
      account_id,
      summary,
      postAnalysis,
      contentAnalysis,
      aiInsights,
    } = req.body;

    if (!analystName || !account_id) {
      return res.status(400).json({
        message: "Analyst name and account ID are required",
      });
    }

    const accountData = await InstagramAnalytics.find({
      account_id: Number(account_id),
    });

    if (!accountData.length) {
      return res.status(404).json({
        message: "No analytics data found for this account",
      });
    }

    const reportsDirectory = path.join(
      __dirname,
      "..",
      "reports"
    );

    if (!fs.existsSync(reportsDirectory)) {
      fs.mkdirSync(reportsDirectory, {
        recursive: true,
      });
    }

    const fileName = `instagram-report-${account_id}-${Date.now()}.pdf`;

    const filePath = path.join(
      reportsDirectory,
      fileName
    );

    const reportData = {
      analystName,
      account_id: Number(account_id),
      summary: summary || {},
      postAnalysis: postAnalysis || {},
      contentAnalysis: contentAnalysis || {},
      aiInsights: aiInsights || [],
    };

    await Report.create({
      ...reportData,
      reportFileName: fileName,
    });

    const outputStream = fs.createWriteStream(filePath);

    generatePDF(reportData, outputStream);

    outputStream.on("finish", () => {
      res.download(
        filePath,
        fileName,
        (error) => {
          if (error) {
            console.error(
              "Error downloading report:",
              error.message
            );
          }
        }
      );
    });

    outputStream.on("error", (error) => {
      console.error(
        "PDF generation error:",
        error.message
      );

      if (!res.headersSent) {
        res.status(500).json({
          message: "Failed to generate PDF",
          error: error.message,
        });
      }
    });
  } catch (error) {
    console.error(
      "Error generating report:",
      error.message
    );

    res.status(500).json({
      message: "Failed to generate report",
      error: error.message,
    });
  }
};

module.exports = {
  generateReport,
};