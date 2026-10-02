import { generateReport } from "../services/api";
import "../styles/Reports.css";

function Reports({
  analystName,
  selectedAccNo,
  analyticsData,
  loadingAnalytics,
  analyticsError,
}) {
  const totalPosts = analyticsData.length;

  const totalLikes = analyticsData.reduce(
    (sum, post) => sum + Number(post.likes || 0),
    0
  );

  const totalComments = analyticsData.reduce(
    (sum, post) => sum + Number(post.comments || 0),
    0
  );

  const totalShares = analyticsData.reduce(
    (sum, post) => sum + Number(post.shares || 0),
    0
  );

  const totalSaves = analyticsData.reduce(
    (sum, post) => sum + Number(post.saves || 0),
    0
  );

  const averageEngagementRate =
    totalPosts > 0
      ? analyticsData.reduce(
          (sum, post) =>
            sum + Number(post.engagement_rate || 0),
          0
        ) / totalPosts
      : 0;

  const generateReportData = () => {
    return {
      analystName,
      account_id: Number(selectedAccNo),

      summary: {
        totalPosts,
        totalLikes,
        totalComments,
        totalShares,
        totalSaves,
        averageEngagementRate: (
          averageEngagementRate * 100
        ).toFixed(2),
      },

      postAnalysis: {
        totalPosts,
        totalLikes,
        totalComments,
        totalShares,
        totalSaves,
      },

      contentAnalysis: {
        totalImagePosts: analyticsData.filter(
          (post) => post.media_type?.toLowerCase() === "image"
        ).length,

        totalVideoPosts: analyticsData.filter(
          (post) => post.media_type?.toLowerCase() === "video"
        ).length,

        totalCarouselPosts: analyticsData.filter(
          (post) => post.media_type?.toLowerCase() === "carousel"
        ).length,
      },

      aiInsights: [
        "Account performance analyzed using Instagram analytics data.",
        "Content performance was evaluated across different media types.",
        "Engagement patterns were analyzed for recommendations.",
      ],
    };
  };

  const handleGenerateReport = async () => {
    if (!analystName.trim()) {
      alert("Please enter your analyst name on the Home page.");
      return;
    }

    if (!selectedAccNo) {
      alert("Please select an account on the Home page.");
      return;
    }

    if (!analyticsData.length) {
      alert("Please analyze an account before generating a report.");
      return;
    }

    try {
      const reportData = generateReportData();

      const pdfBlob = await generateReport(reportData);

      const pdfUrl = window.URL.createObjectURL(pdfBlob);

      const link = document.createElement("a");

      link.href = pdfUrl;
      link.download = `instagram-analytics-report-${selectedAccNo}.pdf`;

      document.body.appendChild(link);
      link.click();

      link.remove();

      window.URL.revokeObjectURL(pdfUrl);

      alert("PDF report generated successfully.");
    } catch (error) {
      console.error("Report generation failed:", error);

      alert(
        error.message || "Failed to generate PDF report."
      );
    }
  };

  if (loadingAnalytics) {
    return (
      <section className="reports-section">
        <div className="analysis-header">
          <div>
            <span className="analysis-eyebrow">
              ANALYTICS REPORTS
            </span>

            <h1>Reports</h1>

            <p>Loading report data...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="reports-section">
      <div className="analysis-header">
        <div>
          <span className="analysis-eyebrow">
            ANALYTICS REPORTS
          </span>

          <h1>Reports</h1>

          <p>
            Generate a comprehensive report containing your
            Instagram analytics and AI-powered insights.
          </p>
        </div>

        <div className="account-badge">
          <span>Analyst</span>

          <strong>
            {analystName || "Not selected"}
          </strong>

          <span>Account</span>

          <strong>
            {selectedAccNo || "Not selected"}
          </strong>
        </div>
      </div>

      {analyticsError && (
        <div className="analysis-error">
          {analyticsError}
        </div>
      )}

      <div className="report-card">
        <div className="report-icon">▤</div>

        <div className="report-content">
          <span className="report-label">
            INSTAGRAM ANALYTICS REPORT
          </span>

          <h2>Generate Your Analytics Report</h2>

          <p>
            Create a downloadable PDF containing account
            performance, post analysis, content analysis,
            AI insights, and recommendations.
          </p>

          <div className="report-details">
            <div>
              <span>Analyst</span>

              <strong>
                {analystName || "Not selected"}
              </strong>
            </div>

            <div>
              <span>Account Number</span>

              <strong>
                {selectedAccNo || "Not selected"}
              </strong>
            </div>

            <div>
              <span>Total Posts</span>

              <strong>
                {totalPosts.toLocaleString("en-IN")}
              </strong>
            </div>

            <div>
              <span>Average Engagement</span>

              <strong>
                {(averageEngagementRate * 100).toFixed(2)}%
              </strong>
            </div>
          </div>

          <button
            className="generate-report-btn"
            onClick={handleGenerateReport}
          >
            Generate PDF Report
            <span>↓</span>
          </button>
        </div>
      </div>

      <div className="report-features">
        <div className="report-feature">
          <span>01</span>

          <h3>Performance Summary</h3>

          <p>
            Overview of important Instagram metrics.
          </p>
        </div>

        <div className="report-feature">
          <span>02</span>

          <h3>Content Analysis</h3>

          <p>
            Comparison of different content types.
          </p>
        </div>

        <div className="report-feature">
          <span>03</span>

          <h3>AI Recommendations</h3>

          <p>
            Data-driven recommendations and insights.
          </p>
        </div>
      </div>
    </section>
  );
}

export default Reports;