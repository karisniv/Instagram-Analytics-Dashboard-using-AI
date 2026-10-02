const PDFDocument = require("pdfkit");

const generatePDF = (reportData, outputStream) => {
  const doc = new PDFDocument({
    size: "A4",
    margin: 45,
    bufferPages: true,
    info: {
      Title: "Instagram Analytics Report",
      Author: reportData.analystName || "Instagram Analytics Dashboard",
      Subject: "Instagram Account Analytics Report",
    },
  });

  doc.pipe(outputStream);

  // =========================================================
  // COLORS
  // =========================================================

  const COLORS = {
    purple: "#833AB4",
    pink: "#E1306C",
    orange: "#F77737",
    dark: "#17202A",
    text: "#30343B",
    muted: "#737B86",
    light: "#F5F3F7",
    border: "#E5E1E8",
    white: "#FFFFFF",
    green: "#239B56",
    blue: "#2874A6",
  };

  // =========================================================
  // HELPERS
  // =========================================================

  const safeNumber = (value) => {
    const number = Number(value);
    return Number.isFinite(number) ? number : 0;
  };

  const formatNumber = (value) => {
    return safeNumber(value).toLocaleString("en-IN");
  };

  const formatPercent = (value) => {
    return `${safeNumber(value).toFixed(2)}%`;
  };

  const drawRoundedCard = (x, y, width, height, fill = COLORS.white) => {
    doc
      .roundedRect(x, y, width, height, 10)
      .fillAndStroke(fill, COLORS.border);
  };

  const drawSectionTitle = (title, subtitle) => {
    checkPageSpace(70);

    doc
      .font("Helvetica-Bold")
      .fontSize(17)
      .fillColor(COLORS.dark)
      .text(title, 45, doc.y);

    if (subtitle) {
      doc
        .font("Helvetica")
        .fontSize(9)
        .fillColor(COLORS.muted)
        .text(subtitle, 45, doc.y + 5);
    }

    doc.moveDown(1.3);
  };

  const drawKpiCard = (x, y, width, label, value, accent) => {
    drawRoundedCard(x, y, width, 82);

    doc
      .roundedRect(x, y, 5, 82, 2)
      .fill(accent);

    doc
      .font("Helvetica")
      .fontSize(9)
      .fillColor(COLORS.muted)
      .text(label.toUpperCase(), x + 16, y + 15, {
        width: width - 28,
      });

    doc
      .font("Helvetica-Bold")
      .fontSize(20)
      .fillColor(COLORS.dark)
      .text(value, x + 16, y + 35, {
        width: width - 28,
      });
  };

  const drawProgressBar = (
    label,
    value,
    maxValue,
    x,
    y,
    width,
    color
  ) => {
    const safeMax = maxValue > 0 ? maxValue : 1;
    const percentage = Math.min(
      1,
      Math.max(0, value / safeMax)
    );

    doc
      .font("Helvetica-Bold")
      .fontSize(9)
      .fillColor(COLORS.text)
      .text(label, x, y);

    doc
      .font("Helvetica")
      .fontSize(9)
      .fillColor(COLORS.muted)
      .text(formatNumber(value), x + width - 65, y);

    doc
      .roundedRect(x, y + 17, width, 8, 4)
      .fill(COLORS.light);

    if (percentage > 0) {
      doc
        .roundedRect(
          x,
          y + 17,
          width * percentage,
          8,
          4
        )
        .fill(color);
    }
  };

  const checkPageSpace = (requiredHeight) => {
    if (doc.y + requiredHeight > 750) {
      doc.addPage();
      drawPageHeader();
    }
  };

  const drawPageHeader = () => {
    doc
      .font("Helvetica-Bold")
      .fontSize(8)
      .fillColor(COLORS.purple)
      .text(
        "INSTALYTICS  •  AI ANALYTICS",
        45,
        28
      );

    doc
      .moveTo(45, 43)
      .lineTo(550, 43)
      .strokeColor(COLORS.border)
      .stroke();

    doc.y = 60;
  };

  // =========================================================
  // DATA
  // =========================================================

  const summary = reportData.summary || {};
  const postAnalysis = reportData.postAnalysis || {};
  const contentAnalysis = reportData.contentAnalysis || {};
  const aiInsights = Array.isArray(reportData.aiInsights)
    ? reportData.aiInsights
    : [];

  const totalPosts =
    summary.totalPosts ??
    postAnalysis.totalPosts ??
    0;

  const totalLikes =
    summary.totalLikes ??
    postAnalysis.totalLikes ??
    0;

  const totalComments =
    summary.totalComments ??
    postAnalysis.totalComments ??
    0;

  const totalShares =
    summary.totalShares ??
    postAnalysis.totalShares ??
    0;

  const totalSaves =
    summary.totalSaves ??
    postAnalysis.totalSaves ??
    0;

  const engagementRate =
    summary.averageEngagementRate ??
    summary.engagementRate ??
    postAnalysis.averageEngagementRate ??
    0;

  const totalReach =
    summary.totalReach ??
    postAnalysis.totalReach ??
    0;

  const impressions =
    summary.totalImpressions ??
    postAnalysis.totalImpressions ??
    0;

  const totalImages =
    contentAnalysis.totalImagePosts ??
    contentAnalysis.totalImages ??
    0;

  const totalVideos =
    contentAnalysis.totalVideoPosts ??
    contentAnalysis.totalVideos ??
    0;

  const totalCarousels =
    contentAnalysis.totalCarouselPosts ??
    contentAnalysis.totalCarousels ??
    0;

  const totalReels =
    contentAnalysis.totalReelPosts ??
    contentAnalysis.totalReels ??
    0;

  // =========================================================
  // PAGE 1 - COVER / SUMMARY
  // =========================================================

  doc
    .rect(0, 0, 595, 115)
    .fill(COLORS.purple);

  doc
    .font("Helvetica-Bold")
    .fontSize(26)
    .fillColor(COLORS.white)
    .text(
      "Instagram Analytics",
      45,
      30
    );

  doc
    .font("Helvetica")
    .fontSize(14)
    .fillColor("#EDE3F4")
    .text(
      "AI-Powered Performance Report",
      45,
      65
    );

  doc
    .font("Helvetica")
    .fontSize(8)
    .fillColor("#EDE3F4")
    .text(
      "INSTALYTICS",
      45,
      90
    );

  doc.y = 145;

  // Analyst information

  drawRoundedCard(45, doc.y, 505, 90);

  const analystCardY = doc.y;

  doc
    .font("Helvetica-Bold")
    .fontSize(11)
    .fillColor(COLORS.dark)
    .text(
      "REPORT DETAILS",
      65,
      analystCardY + 17
    );

  doc
    .font("Helvetica")
    .fontSize(10)
    .fillColor(COLORS.text)
    .text(
      `Analyst Name: ${reportData.analystName || "N/A"}`,
      65,
      analystCardY + 42
    );

  doc
    .text(
      `Account ID: ${reportData.account_id || "N/A"}`,
      65,
      analystCardY + 60
    );

  doc
    .font("Helvetica")
    .fillColor(COLORS.muted)
    .text(
      `Generated: ${new Date().toLocaleDateString("en-IN")}`,
      350,
      analystCardY + 42
    );

  doc.y = analystCardY + 115;

  // Dashboard link

  doc
    .font("Helvetica-Bold")
    .fontSize(9)
    .fillColor(COLORS.purple)
    .text(
      "Open Instagram Analytics Dashboard →",
      45,
      doc.y,
      {
        link:
          "https://karisniv.github.io/Instagram-Analytics-Dashboard-using-AI/",
        underline: true,
      }
    );

  doc.y += 30;

  // =========================================================
  // KPI SECTION
  // =========================================================

  drawSectionTitle(
    "Performance Overview",
    "Key metrics for the selected Instagram account"
  );

  const cardWidth = 118;
  const gap = 11;
  const kpiStartY = doc.y;

  drawKpiCard(
    45,
    kpiStartY,
    cardWidth,
    "Total Posts",
    formatNumber(totalPosts),
    COLORS.purple
  );

  drawKpiCard(
    45 + cardWidth + gap,
    kpiStartY,
    cardWidth,
    "Likes",
    formatNumber(totalLikes),
    COLORS.pink
  );

  drawKpiCard(
    45 + (cardWidth + gap) * 2,
    kpiStartY,
    cardWidth,
    "Comments",
    formatNumber(totalComments),
    COLORS.orange
  );

  drawKpiCard(
    45 + (cardWidth + gap) * 3,
    kpiStartY,
    cardWidth,
    "Engagement",
    formatPercent(engagementRate),
    COLORS.green
  );

  doc.y = kpiStartY + 105;

  // =========================================================
  // ENGAGEMENT METRICS
  // =========================================================

  drawSectionTitle(
    "Engagement Breakdown",
    "Audience interactions across published content"
  );

  const engagementY = doc.y;

  drawRoundedCard(45, engagementY, 505, 155);

  drawProgressBar(
    "Likes",
    totalLikes,
    Math.max(
      totalLikes,
      totalComments,
      totalShares,
      totalSaves
    ),
    65,
    engagementY + 20,
    430,
    COLORS.pink
  );

  drawProgressBar(
    "Comments",
    totalComments,
    Math.max(
      totalLikes,
      totalComments,
      totalShares,
      totalSaves
    ),
    65,
    engagementY + 58,
    430,
    COLORS.orange
  );

  drawProgressBar(
    "Shares",
    totalShares,
    Math.max(
      totalLikes,
      totalComments,
      totalShares,
      totalSaves
    ),
    65,
    engagementY + 96,
    430,
    COLORS.purple
  );

  drawProgressBar(
    "Saves",
    totalSaves,
    Math.max(
      totalLikes,
      totalComments,
      totalShares,
      totalSaves
    ),
    65,
    engagementY + 134,
    430,
    COLORS.green
  );

  // =========================================================
  // PAGE 2 - POST ANALYSIS
  // =========================================================

  doc.addPage();
  drawPageHeader();

  drawSectionTitle(
    "Post Analysis",
    "Detailed interaction metrics for the selected account"
  );

  const tableY = doc.y;

  // Table header

  doc
    .roundedRect(45, tableY, 505, 32, 6)
    .fill(COLORS.purple);

  const columns = [
    ["Metric", 65],
    ["Value", 340],
    ["Description", 410],
  ];

  columns.forEach(([label, x]) => {
    doc
      .font("Helvetica-Bold")
      .fontSize(9)
      .fillColor(COLORS.white)
      .text(label, x, tableY + 10);
  });

  const postRows = [
    [
      "Total Posts",
      formatNumber(totalPosts),
      "Published posts",
    ],
    [
      "Likes",
      formatNumber(totalLikes),
      "Audience likes",
    ],
    [
      "Comments",
      formatNumber(totalComments),
      "Audience comments",
    ],
    [
      "Shares",
      formatNumber(totalShares),
      "Content shares",
    ],
    [
      "Saves",
      formatNumber(totalSaves),
      "Saved posts",
    ],
    [
      "Engagement Rate",
      formatPercent(engagementRate),
      "Average engagement",
    ],
    [
      "Reach",
      formatNumber(totalReach),
      "Accounts reached",
    ],
    [
      "Impressions",
      formatNumber(impressions),
      "Content impressions",
    ],
  ];

  let rowY = tableY + 32;

  postRows.forEach((row, index) => {
    const rowHeight = 38;

    if (index % 2 === 0) {
      doc
        .rect(45, rowY, 505, rowHeight)
        .fill("#FAF9FB");
    }

    doc
      .font("Helvetica-Bold")
      .fontSize(9)
      .fillColor(COLORS.text)
      .text(row[0], 65, rowY + 13);

    doc
      .font("Helvetica-Bold")
      .fontSize(10)
      .fillColor(COLORS.purple)
      .text(row[1], 340, rowY + 12);

    doc
      .font("Helvetica")
      .fontSize(8)
      .fillColor(COLORS.muted)
      .text(row[2], 410, rowY + 13);

    rowY += rowHeight;
  });

  doc.y = rowY + 35;

  // =========================================================
  // CONTENT ANALYSIS
  // =========================================================

  drawSectionTitle(
    "Content Analysis",
    "Distribution of content across media formats"
  );

  const contentY = doc.y;

  drawKpiCard(
    45,
    contentY,
    115,
    "Images",
    formatNumber(totalImages),
    COLORS.purple
  );

  drawKpiCard(
    175,
    contentY,
    115,
    "Videos",
    formatNumber(totalVideos),
    COLORS.pink
  );

  drawKpiCard(
    305,
    contentY,
    115,
    "Carousels",
    formatNumber(totalCarousels),
    COLORS.orange
  );

  drawKpiCard(
    435,
    contentY,
    115,
    "Reels",
    formatNumber(totalReels),
    COLORS.green
  );

  doc.y = contentY + 110;

  // Content visualization

  drawRoundedCard(45, doc.y, 505, 180);

  const mediaData = [
    ["Images", totalImages, COLORS.purple],
    ["Videos", totalVideos, COLORS.pink],
    ["Carousels", totalCarousels, COLORS.orange],
    ["Reels", totalReels, COLORS.green],
  ];

  const maxMedia = Math.max(
    totalImages,
    totalVideos,
    totalCarousels,
    totalReels,
    1
  );

  let mediaY = doc.y + 25;

  mediaData.forEach(([label, value, color]) => {
    drawProgressBar(
      label,
      value,
      maxMedia,
      70,
      mediaY,
      450,
      color
    );

    mediaY += 38;
  });

  doc.y = mediaY + 25;

  // =========================================================
  // AI INSIGHTS
  // =========================================================

  doc.addPage();
  drawPageHeader();

  drawSectionTitle(
    "AI Insights & Recommendations",
    "Automated observations generated from account performance data"
  );

  if (aiInsights.length === 0) {
    drawRoundedCard(45, doc.y, 505, 70);

    doc
      .font("Helvetica")
      .fontSize(10)
      .fillColor(COLORS.muted)
      .text(
        "No AI insights are currently available.",
        65,
        doc.y + 28
      );
  } else {
    aiInsights.forEach((insight, index) => {
      checkPageSpace(90);

      const cardY = doc.y;

      drawRoundedCard(
        45,
        cardY,
        505,
        75,
        "#FCFAFD"
      );

      doc
        .circle(72, cardY + 28, 13)
        .fill(COLORS.purple);

      doc
        .font("Helvetica-Bold")
        .fontSize(9)
        .fillColor(COLORS.white)
        .text(
          String(index + 1),
          69,
          cardY + 23,
          {
            width: 7,
            align: "center",
          }
        );

      doc
        .font("Helvetica-Bold")
        .fontSize(10)
        .fillColor(COLORS.dark)
        .text(
          "AI Recommendation",
          100,
          cardY + 14
        );

      doc
        .font("Helvetica")
        .fontSize(9)
        .fillColor(COLORS.text)
        .text(
          String(insight),
          100,
          cardY + 34,
          {
            width: 420,
            lineGap: 2,
          }
        );

      doc.y = cardY + 90;
    });
  }

  // =========================================================
  // FINAL SUMMARY
  // =========================================================

  checkPageSpace(150);

  drawSectionTitle(
    "Executive Summary",
    "Overall account performance snapshot"
  );

  const summaryY = doc.y;

  drawRoundedCard(
    45,
    summaryY,
    505,
    120,
    "#F9F5FC"
  );

  doc
    .font("Helvetica")
    .fontSize(10)
    .fillColor(COLORS.text)
    .text(
      `Account ${reportData.account_id || "N/A"} published ${formatNumber(
        totalPosts
      )} posts and generated ${formatNumber(
        totalLikes
      )} likes, ${formatNumber(
        totalComments
      )} comments, ${formatNumber(
        totalShares
      )} shares, and ${formatNumber(
        totalSaves
      )} saves.`,
      65,
      summaryY + 22,
      {
        width: 465,
        lineGap: 5,
      }
    );

  doc
    .font("Helvetica-Bold")
    .fontSize(10)
    .fillColor(COLORS.purple)
    .text(
      `Average Engagement Rate: ${formatPercent(
        engagementRate
      )}`,
      65,
      summaryY + 82
    );

  // =========================================================
  // FOOTERS
  // =========================================================

  const range = doc.bufferedPageRange();

  for (
    let i = range.start;
    i < range.start + range.count;
    i++
  ) {
    doc.switchToPage(i);

    doc
      .moveTo(45, 790)
      .lineTo(550, 790)
      .strokeColor(COLORS.border)
      .stroke();

    doc
      .font("Helvetica")
      .fontSize(7)
      .fillColor(COLORS.muted)
      .text(
        "Instagram Analytics Dashboard using AI",
        45,
        800
      );

    doc
      .text(
        `Page ${i + 1} of ${range.count}`,
        470,
        800,
        {
          width: 80,
          align: "right",
        }
      );
  }

  doc.end();
};

module.exports = generatePDF;
