const PDFDocument = require("pdfkit");

const generatePDF = (reportData, outputStream) => {
  const doc = new PDFDocument({
    size: "A4",
    margin: 45,
    autoFirstPage: true,
    info: {
      Title: "Instagram Analytics Report",
      Author:
        reportData.analystName ||
        "Instagram Analytics Dashboard",
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
    green: "#239B56",

    dark: "#17202A",
    text: "#30343B",
    muted: "#737B86",

    light: "#F5F3F7",
    border: "#E5E1E8",
    white: "#FFFFFF",

    softPurple: "#F9F5FC",
  };

  // =========================================================
  // HELPERS
  // =========================================================

  const safeNumber = (value) => {
    const number = Number(value);

    return Number.isFinite(number)
      ? number
      : 0;
  };

  const formatNumber = (value) => {
    return safeNumber(value).toLocaleString("en-IN");
  };

  const formatPercent = (value) => {
    return `${safeNumber(value).toFixed(2)}%`;
  };

  const drawCard = (
    x,
    y,
    width,
    height,
    background = COLORS.white
  ) => {
    doc
      .roundedRect(
        x,
        y,
        width,
        height,
        8
      )
      .fillAndStroke(
        background,
        COLORS.border
      );
  };

  const drawHeader = () => {
    doc
      .font("Helvetica-Bold")
      .fontSize(8)
      .fillColor(COLORS.purple)
      .text(
        "INSTALYTICS  •  AI ANALYTICS",
        45,
        25
      );

    doc
      .moveTo(45, 40)
      .lineTo(550, 40)
      .lineWidth(0.5)
      .strokeColor(COLORS.border)
      .stroke();
  };

  const drawSectionTitle = (
    title,
    subtitle,
    y
  ) => {
    doc
      .font("Helvetica-Bold")
      .fontSize(16)
      .fillColor(COLORS.dark)
      .text(
        title,
        45,
        y
      );

    if (subtitle) {
      doc
        .font("Helvetica")
        .fontSize(8.5)
        .fillColor(COLORS.muted)
        .text(
          subtitle,
          45,
          y + 22
        );
    }
  };

  const drawKpiCard = (
    x,
    y,
    width,
    height,
    label,
    value,
    accent
  ) => {
    drawCard(
      x,
      y,
      width,
      height
    );

    doc
      .roundedRect(
        x,
        y,
        4,
        height,
        2
      )
      .fill(accent);

    doc
      .font("Helvetica")
      .fontSize(7.5)
      .fillColor(COLORS.muted)
      .text(
        label.toUpperCase(),
        x + 13,
        y + 12,
        {
          width: width - 20,
        }
      );

    doc
      .font("Helvetica-Bold")
      .fontSize(16)
      .fillColor(COLORS.dark)
      .text(
        value,
        x + 13,
        y + 33,
        {
          width: width - 20,
        }
      );
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
    const max =
      maxValue > 0
        ? maxValue
        : 1;

    const percentage = Math.min(
      1,
      Math.max(
        0,
        value / max
      )
    );

    doc
      .font("Helvetica-Bold")
      .fontSize(8.5)
      .fillColor(COLORS.text)
      .text(
        label,
        x,
        y
      );

    doc
      .font("Helvetica")
      .fontSize(8)
      .fillColor(COLORS.muted)
      .text(
        formatNumber(value),
        x + width - 65,
        y,
        {
          width: 65,
          align: "right",
        }
      );

    doc
      .roundedRect(
        x,
        y + 15,
        width,
        7,
        3
      )
      .fill(COLORS.light);

    if (percentage > 0) {
      doc
        .roundedRect(
          x,
          y + 15,
          width * percentage,
          7,
          3
        )
        .fill(color);
    }
  };

  // =========================================================
  // DATA
  // =========================================================

  const summary =
    reportData.summary || {};

  const postAnalysis =
    reportData.postAnalysis || {};

  const contentAnalysis =
    reportData.contentAnalysis || {};

  const aiInsights =
    Array.isArray(
      reportData.aiInsights
    )
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
  // PAGE 1
  // OVERVIEW
  // =========================================================

  doc
    .rect(
      0,
      0,
      595,
      115
    )
    .fill(COLORS.purple);

  doc
    .font("Helvetica-Bold")
    .fontSize(25)
    .fillColor(COLORS.white)
    .text(
      "Instagram Analytics",
      45,
      28
    );

  doc
    .font("Helvetica")
    .fontSize(13)
    .fillColor("#EDE3F4")
    .text(
      "AI-Powered Performance Report",
      45,
      62
    );

  doc
    .font("Helvetica-Bold")
    .fontSize(7)
    .fillColor("#EDE3F4")
    .text(
      "INSTALYTICS",
      45,
      91
    );

  // =========================================================
  // REPORT DETAILS
  // =========================================================

  drawCard(
    45,
    140,
    505,
    90
  );

  doc
    .font("Helvetica-Bold")
    .fontSize(10)
    .fillColor(COLORS.dark)
    .text(
      "REPORT DETAILS",
      65,
      157
    );

  doc
    .font("Helvetica")
    .fontSize(9)
    .fillColor(COLORS.text)
    .text(
      `Analyst Name: ${
        reportData.analystName || "N/A"
      }`,
      65,
      181
    );

  doc.text(
    `Account ID: ${
      reportData.account_id || "N/A"
    }`,
    65,
    199
  );

  doc
    .fontSize(8)
    .fillColor(COLORS.muted)
    .text(
      `Generated: ${new Date().toLocaleDateString(
        "en-IN"
      )}`,
      365,
      181
    );

  doc
    .font("Helvetica-Bold")
    .fontSize(8.5)
    .fillColor(COLORS.purple)
    .text(
      "Open Instagram Analytics Dashboard →",
      365,
      202,
      {
        link:
          "https://karisniv.github.io/Instagram-Analytics-Dashboard-using-AI/",
        underline: true,
      }
    );

  // =========================================================
  // PERFORMANCE OVERVIEW
  // =========================================================

  drawSectionTitle(
    "Performance Overview",
    "Key metrics for the selected Instagram account",
    260
  );

  drawKpiCard(
    45,
    305,
    118,
    75,
    "Total Posts",
    formatNumber(totalPosts),
    COLORS.purple
  );

  drawKpiCard(
    174,
    305,
    118,
    75,
    "Likes",
    formatNumber(totalLikes),
    COLORS.pink
  );

  drawKpiCard(
    303,
    305,
    118,
    75,
    "Comments",
    formatNumber(totalComments),
    COLORS.orange
  );

  drawKpiCard(
    432,
    305,
    118,
    75,
    "Engagement",
    formatPercent(engagementRate),
    COLORS.green
  );

  // =========================================================
  // ENGAGEMENT BREAKDOWN
  // =========================================================

  drawSectionTitle(
    "Engagement Breakdown",
    "Audience interactions across published content",
    415
  );

  drawCard(
    45,
    460,
    505,
    235
  );

  const maxEngagement =
    Math.max(
      totalLikes,
      totalComments,
      totalShares,
      totalSaves,
      1
    );

  drawProgressBar(
    "Likes",
    totalLikes,
    maxEngagement,
    70,
    485,
    455,
    COLORS.pink
  );

  drawProgressBar(
    "Comments",
    totalComments,
    maxEngagement,
    70,
    535,
    455,
    COLORS.orange
  );

  drawProgressBar(
    "Shares",
    totalShares,
    maxEngagement,
    70,
    585,
    455,
    COLORS.purple
  );

  drawProgressBar(
    "Saves",
    totalSaves,
    maxEngagement,
    70,
    635,
    455,
    COLORS.green
  );

  doc
    .font("Helvetica-Bold")
    .fontSize(9)
    .fillColor(COLORS.dark)
    .text(
      `Reach: ${formatNumber(totalReach)}`,
      70,
      670
    );

  doc
    .font("Helvetica-Bold")
    .fontSize(9)
    .fillColor(COLORS.dark)
    .text(
      `Impressions: ${formatNumber(impressions)}`,
      350,
      670
    );

  // =========================================================
  // PAGE 2
  // POST + CONTENT ANALYSIS
  // =========================================================

  doc.addPage();

  drawHeader();

  drawSectionTitle(
    "Post Analysis",
    "Detailed interaction metrics for the selected account",
    65
  );

  // =========================================================
  // POST ANALYSIS TABLE
  // =========================================================

  const tableX = 45;
  const tableY = 112;
  const tableWidth = 505;
  const headerHeight = 28;
  const rowHeight = 31;

  doc
    .roundedRect(
      tableX,
      tableY,
      tableWidth,
      headerHeight,
      5
    )
    .fill(COLORS.purple);

  doc
    .font("Helvetica-Bold")
    .fontSize(8)
    .fillColor(COLORS.white)
    .text(
      "METRIC",
      62,
      tableY + 9
    );

  doc.text(
    "VALUE",
    320,
    tableY + 9
  );

  doc.text(
    "DESCRIPTION",
    405,
    tableY + 9
  );

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

  let currentY =
    tableY + headerHeight;

  postRows.forEach(
    (row, index) => {
      if (index % 2 === 0) {
        doc
          .rect(
            tableX,
            currentY,
            tableWidth,
            rowHeight
          )
          .fill("#FAF9FB");
      }

      doc
        .font("Helvetica-Bold")
        .fontSize(8)
        .fillColor(COLORS.text)
        .text(
          row[0],
          62,
          currentY + 10
        );

      doc
        .font("Helvetica-Bold")
        .fontSize(9)
        .fillColor(COLORS.purple)
        .text(
          row[1],
          320,
          currentY + 9
        );

      doc
        .font("Helvetica")
        .fontSize(7.5)
        .fillColor(COLORS.muted)
        .text(
          row[2],
          405,
          currentY + 10
        );

      currentY += rowHeight;
    }
  );

  // =========================================================
  // CONTENT ANALYSIS
  // =========================================================

  drawSectionTitle(
    "Content Analysis",
    "Distribution of content across media formats",
    410
  );

  drawKpiCard(
    45,
    455,
    115,
    62,
    "Images",
    formatNumber(totalImages),
    COLORS.purple
  );

  drawKpiCard(
    175,
    455,
    115,
    62,
    "Videos",
    formatNumber(totalVideos),
    COLORS.pink
  );

  drawKpiCard(
    305,
    455,
    115,
    62,
    "Carousels",
    formatNumber(totalCarousels),
    COLORS.orange
  );

  drawKpiCard(
    435,
    455,
    115,
    62,
    "Reels",
    formatNumber(totalReels),
    COLORS.green
  );

  // =========================================================
  // MEDIA DISTRIBUTION
  // =========================================================

  drawCard(
    45,
    540,
    505,
    190
  );

  doc
    .font("Helvetica-Bold")
    .fontSize(9)
    .fillColor(COLORS.dark)
    .text(
      "MEDIA DISTRIBUTION",
      70,
      560
    );

  const mediaData = [
    [
      "Images",
      totalImages,
      COLORS.purple,
    ],
    [
      "Videos",
      totalVideos,
      COLORS.pink,
    ],
    [
      "Carousels",
      totalCarousels,
      COLORS.orange,
    ],
    [
      "Reels",
      totalReels,
      COLORS.green,
    ],
  ];

  const maxMedia =
    Math.max(
      totalImages,
      totalVideos,
      totalCarousels,
      totalReels,
      1
    );

  let mediaY = 585;

  mediaData.forEach(
    ([label, value, color]) => {
      drawProgressBar(
        label,
        value,
        maxMedia,
        70,
        mediaY,
        455,
        color
      );

      mediaY += 35;
    }
  );

  // =========================================================
  // PAGE 3
  // AI INSIGHTS
  // =========================================================

  doc.addPage();

  drawHeader();

  drawSectionTitle(
    "AI Insights & Recommendations",
    "Automated observations generated from account performance data",
    65
  );

  const displayedInsights =
    aiInsights.slice(0, 5);

  let insightY = 112;

  if (
    displayedInsights.length === 0
  ) {
    drawCard(
      45,
      insightY,
      505,
      70,
      COLORS.softPurple
    );

    doc
      .font("Helvetica")
      .fontSize(9)
      .fillColor(COLORS.muted)
      .text(
        "No AI insights are currently available.",
        65,
        insightY + 28
      );
  } else {
    displayedInsights.forEach(
      (insight, index) => {
        drawCard(
          45,
          insightY,
          505,
          70,
          COLORS.softPurple
        );

        doc
          .circle(
            72,
            insightY + 25,
            13
          )
          .fill(COLORS.purple);

        doc
          .font("Helvetica-Bold")
          .fontSize(8)
          .fillColor(COLORS.white)
          .text(
            String(index + 1),
            69,
            insightY + 21,
            {
              width: 7,
              align: "center",
            }
          );

        doc
          .font("Helvetica-Bold")
          .fontSize(9)
          .fillColor(COLORS.dark)
          .text(
            "AI Recommendation",
            100,
            insightY + 12
          );

        doc
          .font("Helvetica")
          .fontSize(8)
          .fillColor(COLORS.text)
          .text(
            String(insight),
            100,
            insightY + 31,
            {
              width: 420,
              height: 28,
              ellipsis: true,
              lineGap: 1,
            }
          );

        insightY += 82;
      }
    );
  }

  // =========================================================
  // EXECUTIVE SUMMARY
  // =========================================================

  drawSectionTitle(
    "Executive Summary",
    "Overall account performance snapshot",
    535
  );

  drawCard(
    45,
    580,
    505,
    125,
    COLORS.softPurple
  );

  const summaryText =
    `Account ${
      reportData.account_id || "N/A"
    } published ${formatNumber(
      totalPosts
    )} posts and generated ${formatNumber(
      totalLikes
    )} likes, ${formatNumber(
      totalComments
    )} comments, ${formatNumber(
      totalShares
    )} shares, and ${formatNumber(
      totalSaves
    )} saves.`;

  doc
    .font("Helvetica")
    .fontSize(9)
    .fillColor(COLORS.text)
    .text(
      summaryText,
      65,
      602,
      {
        width: 465,
        lineGap: 4,
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
      670
    );

  doc
    .font("Helvetica")
    .fontSize(8)
    .fillColor(COLORS.muted)
    .text(
      "Report generated using Instagram analytics data.",
      65,
      690
    );

  // =========================================================
  // END PDF
  // =========================================================

  doc.end();
};

module.exports = generatePDF;
