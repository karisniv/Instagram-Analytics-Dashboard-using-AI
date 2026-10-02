import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import "../styles/AIInsights.css";

function AIInsights({
  analystName,
  selectedAccNo,
  analyticsData,
  loadingAnalytics,
  analyticsError,
}) {
  if (loadingAnalytics) {
    return (
      <section className="ai-insights-section">
        <div className="analysis-header">
          <div>
            <span className="analysis-eyebrow">
              INTELLIGENT ANALYTICS
            </span>

            <h1>AI Insights</h1>

            <p>Analyzing account performance...</p>
          </div>
        </div>
      </section>
    );
  }

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

  const averageEngagement =
    totalPosts > 0
      ? analyticsData.reduce(
          (sum, post) =>
            sum + Number(post.engagement_rate || 0),
          0
        ) / totalPosts
      : 0;

  const bestPost =
    analyticsData.length > 0
      ? analyticsData.reduce((best, post) =>
          Number(post.engagement_rate || 0) >
          Number(best.engagement_rate || 0)
            ? post
            : best
        )
      : null;

  const mediaPerformance = {};

  analyticsData.forEach((post) => {
    const type = post.media_type || "Unknown";

    if (!mediaPerformance[type]) {
      mediaPerformance[type] = {
        count: 0,
        engagement: 0,
      };
    }

    mediaPerformance[type].count += 1;
    mediaPerformance[type].engagement += Number(
      post.engagement_rate || 0
    );
  });

  const mediaTypes = Object.entries(mediaPerformance).map(
    ([type, data]) => ({
      type,
      count: data.count,
      engagement: data.engagement / data.count,
    })
  );

  const bestMediaType =
    mediaTypes.length > 0
      ? [...mediaTypes].sort(
          (a, b) => b.engagement - a.engagement
        )[0]
      : null;

  const interactionData = [
    {
      name: "Likes",
      value: totalLikes,
    },
    {
      name: "Comments",
      value: totalComments,
    },
    {
      name: "Shares",
      value: totalShares,
    },
    {
      name: "Saves",
      value: totalSaves,
    },
  ].filter((item) => item.value > 0);

  const insights = [];

  if (bestPost) {
    insights.push({
      type: "PERFORMANCE",
      icon: "↗",
      title: "Top Performing Post",
      text: `Post ${bestPost.post_id} achieved the highest engagement rate at ${(
        Number(bestPost.engagement_rate || 0) * 100
      ).toFixed(2)}%.`,
    });
  }

  if (bestMediaType) {
    insights.push({
      type: "CONTENT",
      icon: "◆",
      title: "Best Content Format",
      text: `${bestMediaType.type} content has the highest average engagement rate at ${(
        bestMediaType.engagement * 100
      ).toFixed(2)}%.`,
    });
  }

  if (averageEngagement > 0.05) {
    insights.push({
      type: "ENGAGEMENT",
      icon: "◷",
      title: "Strong Engagement",
      text: `The account has an average engagement rate of ${(
        averageEngagement * 100
      ).toFixed(2)}%, indicating strong audience interaction.`,
    });
  } else {
    insights.push({
      type: "ENGAGEMENT",
      icon: "◷",
      title: "Engagement Opportunity",
      text: `The average engagement rate is ${(
        averageEngagement * 100
      ).toFixed(2)}%. Consider testing different content formats and calls to action.`,
    });
  }

  if (totalComments < totalLikes * 0.02) {
    insights.push({
      type: "RECOMMENDATION",
      icon: "◆",
      title: "Increase Conversations",
      text: "Comments are relatively low compared with likes. Consider using questions, polls, and discussion-focused captions.",
    });
  }

  if (totalShares + totalSaves > 0) {
    insights.push({
      type: "RECOMMENDATION",
      icon: "✦",
      title: "Encourage Content Sharing",
      text: `The account generated ${(
        totalShares + totalSaves
      ).toLocaleString("en-IN")} combined shares and saves. Continue creating useful or shareable content.`,
    });
  }

  return (
    <section className="ai-insights-section">
      <div className="analysis-header">
        <div>
          <span className="analysis-eyebrow">
            INTELLIGENT ANALYTICS
          </span>

          <h1>AI Insights</h1>

          <p>
            Data-driven insights and recommendations for the
            selected Instagram account.
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

      <div className="ai-banner">
        <div className="ai-banner-icon">✦</div>

        <div>
          <span>AI ANALYSIS ENGINE</span>

          <h2>Data-driven insights for your account</h2>

          <p>
            The dashboard analyzes post performance,
            engagement, content formats, and audience
            interactions to generate actionable recommendations.
          </p>
        </div>
      </div>

      <div className="ai-visual-grid">
        <div className="ai-chart-card">
          <div className="ai-chart-header">
            <div>
              <span>ENGAGEMENT BREAKDOWN</span>
              <h2>Audience Interactions</h2>
            </div>
          </div>

          <div className="ai-chart-container">
            {interactionData.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={interactionData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    innerRadius={55}
                    paddingAngle={3}
                  >
                    {interactionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} />
                    ))}
                  </Pie>

                  <Tooltip
                    formatter={(value) =>
                      Number(value).toLocaleString("en-IN")
                    }
                  />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="chart-empty">
                No interaction data available.
              </div>
            )}
          </div>
        </div>

        <div className="ai-chart-card">
          <div className="ai-chart-header">
            <div>
              <span>ACCOUNT SUMMARY</span>
              <h2>Key Metrics</h2>
            </div>
          </div>

          <div className="ai-metric-list">
            <div>
              <span>Total Posts</span>
              <strong>
                {totalPosts.toLocaleString("en-IN")}
              </strong>
            </div>

            <div>
              <span>Total Likes</span>
              <strong>
                {totalLikes.toLocaleString("en-IN")}
              </strong>
            </div>

            <div>
              <span>Total Comments</span>
              <strong>
                {totalComments.toLocaleString("en-IN")}
              </strong>
            </div>

            <div>
              <span>Average Engagement</span>
              <strong>
                {(averageEngagement * 100).toFixed(2)}%
              </strong>
            </div>
          </div>
        </div>
      </div>

      <div className="insights-grid">
        {insights.slice(0, 3).map((insight, index) => (
          <div className="insight-card" key={index}>
            <div className="insight-card-header">
              <span className="insight-icon">
                {insight.icon}
              </span>

              <span className="insight-type">
                {insight.type}
              </span>
            </div>

            <h3>{insight.title}</h3>

            <p>{insight.text}</p>
          </div>
        ))}
      </div>

      <div className="ai-placeholder">
        <div className="ai-placeholder-icon">✦</div>

        <h2>AI Recommendations</h2>

        {totalPosts > 0 ? (
          <>
            <p>
              Based on {totalPosts.toLocaleString("en-IN")} analyzed
              posts, here are the generated recommendations.
            </p>

            <div className="ai-recommendations-list">
              {insights.slice(3).map((insight, index) => (
                <div
                  className="ai-recommendation"
                  key={index}
                >
                  <span className="recommendation-number">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <div>
                    <strong>{insight.title}</strong>

                    <p>{insight.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <p>
            Select an account from Home to generate AI insights.
          </p>
        )}
      </div>
    </section>
  );
}

export default AIInsights;