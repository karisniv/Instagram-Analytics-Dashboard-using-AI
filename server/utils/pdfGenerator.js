const PDFDocument = require("pdfkit");

const generatePDF = (reportData, outputStream) => {
  const doc = new PDFDocument({
    margin: 50,
    size: "A4",
  });

  doc.pipe(outputStream);

  const {
    analystName,
    account_id,
    summary = {},
    postAnalysis = {},
    contentAnalysis = {},
    aiInsights = [],
  } = reportData;

  // Title
  doc
    .fontSize(22)
    .font("Helvetica-Bold")
    .text("Instagram Analytics Report", {
      align: "center",
    });

  doc.moveDown();

  doc
    .fontSize(11)
    .font("Helvetica")
    .text(`Generated Date: ${new Date().toLocaleDateString()}`, {
      align: "center",
    });

  doc.moveDown(2);

  // Analyst details
  doc
    .fontSize(14)
    .font("Helvetica-Bold")
    .text("Analyst Details");

  doc.moveDown(0.5);

  doc
    .fontSize(11)
    .font("Helvetica")
    .text(`Analyst Name: ${analystName || "N/A"}`)
    .text(`Account ID: ${account_id || "N/A"}`);

  doc.moveDown(1.5);

  // Summary
  doc
    .fontSize(14)
    .font("Helvetica-Bold")
    .text("Performance Summary");

  doc.moveDown(0.5);

  doc
    .fontSize(11)
    .font("Helvetica")
    .text(`Total Posts: ${summary.totalPosts ?? "N/A"}`)
    .text(`Total Likes: ${summary.totalLikes ?? "N/A"}`)
    .text(`Total Comments: ${summary.totalComments ?? "N/A"}`)
    .text(`Total Shares: ${summary.totalShares ?? "N/A"}`)
    .text(`Total Saves: ${summary.totalSaves ?? "N/A"}`)
    .text(`Average Engagement Rate: ${summary.averageEngagementRate ?? "N/A"}`);

  doc.moveDown(1.5);

  // Post analysis
  doc
    .fontSize(14)
    .font("Helvetica-Bold")
    .text("Post Analysis");

  doc.moveDown(0.5);

  doc
    .fontSize(11)
    .font("Helvetica")
    .text(JSON.stringify(postAnalysis, null, 2));

  doc.moveDown(1.5);

  // Content analysis
  doc
    .fontSize(14)
    .font("Helvetica-Bold")
    .text("Content Analysis");

  doc.moveDown(0.5);

  doc
    .fontSize(11)
    .font("Helvetica")
    .text(JSON.stringify(contentAnalysis, null, 2));

  doc.moveDown(1.5);

  // AI insights
  doc
    .fontSize(14)
    .font("Helvetica-Bold")
    .text("AI Insights");

  doc.moveDown(0.5);

  if (aiInsights.length > 0) {
    aiInsights.forEach((insight, index) => {
      doc
        .fontSize(11)
        .font("Helvetica")
        .text(`${index + 1}. ${insight}`);
    });
  } else {
    doc
      .fontSize(11)
      .font("Helvetica")
      .text("No AI insights available.");
  }

  doc.moveDown(2);

  doc
    .fontSize(9)
    .fillColor("gray")
    .text(
      "Instagram Analytics Dashboard using AI",
      {
        align: "center",
      }
    );

  doc.end();
};

module.exports = generatePDF;