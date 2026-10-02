import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import "../styles/PostAnalysis.css";

function PostAnalysis({
  analystName,
  selectedAccNo,
  analyticsData,
  loadingAnalytics,
  analyticsError,
}) {
  const totalPosts = analyticsData.length;

  const totalLikes = analyticsData.reduce(
    (total, post) => total + Number(post.likes || 0),
    0
  );

  const totalComments = analyticsData.reduce(
    (total, post) => total + Number(post.comments || 0),
    0
  );

  const totalShares = analyticsData.reduce(
    (total, post) => total + Number(post.shares || 0),
    0
  );

  const totalSaves = analyticsData.reduce(
    (total, post) => total + Number(post.saves || 0),
    0
  );

  const totalReach = analyticsData.reduce(
    (total, post) => total + Number(post.reach || 0),
    0
  );

  const totalImpressions = analyticsData.reduce(
    (total, post) => total + Number(post.impressions || 0),
    0
  );

  const averageEngagementRate =
    totalPosts > 0
      ? analyticsData.reduce(
          (total, post) =>
            total + Number(post.engagement_rate || 0),
          0
        ) / totalPosts
      : 0;

  const contentPerformance = {};

  analyticsData.forEach((post) => {
    const type = post.media_type || "Unknown";

    if (!contentPerformance[type]) {
      contentPerformance[type] = {
        posts: 0,
        engagement: 0,
      };
    }

    contentPerformance[type].posts += 1;
    contentPerformance[type].engagement += Number(
      post.engagement_rate || 0
    );
  });

  const chartData = Object.entries(contentPerformance).map(
    ([type, data]) => ({
      type: type.charAt(0).toUpperCase() + type.slice(1),
      engagement: Number(
        ((data.engagement / data.posts) * 100).toFixed(2)
      ),
    })
  );

  const formatNumber = (value) =>
    new Intl.NumberFormat("en-IN").format(value);

  if (loadingAnalytics) {
    return (
      <section className="post-analysis-section">
        <div className="analysis-header">
          <div>
            <span className="analysis-eyebrow">
              POST PERFORMANCE
            </span>
            <h1>Post Analysis</h1>
            <p>Loading Instagram analytics...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="post-analysis-section">
      <div className="analysis-header">
        <div>
          <span className="analysis-eyebrow">
            POST PERFORMANCE
          </span>

          <h1>Post Analysis</h1>

          <p>
            Analyze the performance of posts for the selected
            Instagram account.
          </p>
        </div>

        <div className="account-badge">
          <span>Analyst</span>
          <strong>{analystName || "Not selected"}</strong>

          <span>Account</span>
          <strong>{selectedAccNo || "Not selected"}</strong>
        </div>
      </div>

      {analyticsError && (
        <div className="analysis-error">
          {analyticsError}
        </div>
      )}

      <div className="metrics-grid">
        <div className="metric-card">
          <span className="metric-label">TOTAL POSTS</span>
          <h2>{formatNumber(totalPosts)}</h2>
          <p>Posts analyzed</p>
        </div>

        <div className="metric-card">
          <span className="metric-label">TOTAL LIKES</span>
          <h2>{formatNumber(totalLikes)}</h2>
          <p>Total likes received</p>
        </div>

        <div className="metric-card">
          <span className="metric-label">TOTAL COMMENTS</span>
          <h2>{formatNumber(totalComments)}</h2>
          <p>Total audience comments</p>
        </div>

        <div className="metric-card">
          <span className="metric-label">ENGAGEMENT RATE</span>
          <h2>{(averageEngagementRate * 100).toFixed(2)}%</h2>
          <p>Average engagement</p>
        </div>
      </div>

      <div className="metrics-grid">
        <div className="metric-card">
          <span className="metric-label">TOTAL SHARES</span>
          <h2>{formatNumber(totalShares)}</h2>
          <p>Content shares</p>
        </div>

        <div className="metric-card">
          <span className="metric-label">TOTAL SAVES</span>
          <h2>{formatNumber(totalSaves)}</h2>
          <p>Content saves</p>
        </div>

        <div className="metric-card">
          <span className="metric-label">TOTAL REACH</span>
          <h2>{formatNumber(totalReach)}</h2>
          <p>Accounts reached</p>
        </div>

        <div className="metric-card">
          <span className="metric-label">IMPRESSIONS</span>
          <h2>{formatNumber(totalImpressions)}</h2>
          <p>Total impressions</p>
        </div>
      </div>

      <div className="post-chart-card">
        <div className="chart-header">
          <div>
            <span className="chart-label">MEDIA PERFORMANCE</span>
            <h2>Engagement by Media Type</h2>
          </div>

          <span className="chart-account">
            Account {selectedAccNo || "-"}
          </span>
        </div>

        <div className="chart-container">
          {chartData.length > 0 ? (
            <ResponsiveContainer width="100%" height={320}>
              <BarChart
                data={chartData}
                margin={{
                  top: 20,
                  right: 20,
                  left: 10,
                  bottom: 10,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />

                <XAxis dataKey="type" />

                <YAxis
                  tickFormatter={(value) => `${value}%`}
                />

                <Tooltip
                  formatter={(value) => [
                    `${value}%`,
                    "Engagement",
                  ]}
                />

                <Bar
                  dataKey="engagement"
                  name="Engagement"
                  radius={[8, 8, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="chart-empty">
              No analytics data available.
            </div>
          )}
        </div>
      </div>

      <div className="analysis-placeholder">
        <div className="placeholder-icon">◈</div>

        <h2>Post Performance Data</h2>

        <p>
          {totalPosts > 0
            ? `Analytics loaded successfully for account ${selectedAccNo}.`
            : "No analytics data available for this account."}
        </p>
      </div>
    </section>
  );
}

export default PostAnalysis;