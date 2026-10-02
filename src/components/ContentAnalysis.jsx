import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import "../styles/ContentAnalysis.css";

function ContentAnalysis({
  analystName,
  selectedAccNo,
  analyticsData,
  loadingAnalytics,
  analyticsError,
}) {
  const formatNumber = (value) =>
    new Intl.NumberFormat("en-IN").format(value);

  /*
   * CONTENT CATEGORY ANALYSIS
   * Example categories:
   * Food, Beauty, Travel, Fashion, Fitness, etc.
   */

  const categoryMap = {};

  analyticsData.forEach((post) => {
    const category = post.content_category?.trim() || "Unknown";

    if (!categoryMap[category]) {
      categoryMap[category] = {
        count: 0,
        engagement: 0,
        viralPosts: 0,
      };
    }

    categoryMap[category].count += 1;

    categoryMap[category].engagement += Number(
      post.engagement_rate || 0
    );

    const performance =
      post.performance_bucket_label?.toLowerCase() || "";

    if (performance.includes("viral")) {
      categoryMap[category].viralPosts += 1;
    }
  });

  const contentSummary = Object.entries(categoryMap)
    .map(([category, data]) => ({
      category,
      count: data.count,
      engagement:
        data.count > 0
          ? (data.engagement / data.count) * 100
          : 0,
      viralPosts: data.viralPosts,
    }))
    .sort((a, b) => b.engagement - a.engagement);

  /*
   * Chart data
   * Sorted from highest engagement to lowest engagement.
   */
  const chartData = contentSummary.map((item) => ({
    category: item.category,
    engagement: Number(item.engagement.toFixed(2)),
  }));

  const bestContent = contentSummary[0] || null;

  if (loadingAnalytics) {
    return (
      <section className="content-analysis-section">
        <div className="analysis-header">
          <div>
            <span className="analysis-eyebrow">
              CONTENT PERFORMANCE
            </span>

            <h1>Content Analysis</h1>

            <p>Loading content analytics...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="content-analysis-section">
      <div className="analysis-header">
        <div>
          <span className="analysis-eyebrow">
            CONTENT PERFORMANCE
          </span>

          <h1>Content Analysis</h1>

          <p>
            Compare engagement across different content
            categories for the selected Instagram account.
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

      {/* CATEGORY SUMMARY */}

      <div className="content-summary-grid">
        {contentSummary.map((item) => (
          <div
            className="content-card"
            key={item.category}
          >
            <div className="content-card-icon">
              ◫
            </div>

            <span>
              {item.category.toUpperCase()}
            </span>

            <h2>
              {formatNumber(item.count)}
            </h2>

            <p>
              {item.engagement.toFixed(2)}% average engagement
            </p>
          </div>
        ))}
      </div>

      {/* ENGAGEMENT BY CONTENT CATEGORY */}

      <div className="content-chart-card">
        <div className="content-chart-header">
          <div>
            <span className="chart-label">
              CONTENT CATEGORY PERFORMANCE
            </span>

            <h2>
              Engagement by Content Category
            </h2>
          </div>

          <span className="chart-account">
            Account {selectedAccNo || "-"}
          </span>
        </div>

        <div className="content-chart-container">
          {chartData.length > 0 ? (
            <ResponsiveContainer
              width="100%"
              height={360}
            >
              <BarChart
                data={chartData}
                margin={{
                  top: 20,
                  right: 20,
                  left: 10,
                  bottom: 30,
                }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                />

                <XAxis
  dataKey="category"
  tick={false}
  axisLine={false}
  tickLine={false}
/>

                <YAxis
                  tickFormatter={(value) =>
                    `${value}%`
                  }
                />

                <Tooltip
                  formatter={(value) => [
                    `${value}%`,
                    "Average Engagement",
                  ]}
                />

                <Bar
                  dataKey="engagement"
                  name="Average Engagement"
                  radius={[8, 8, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="chart-empty">
              No content category data available.
            </div>
          )}
        </div>
      </div>

      {/* CONTENT PERFORMANCE */}

      <div className="content-analysis-main">
        <div className="content-chart-placeholder">
          <div className="placeholder-icon">
            ◫
          </div>

          <h2>Content Performance</h2>

          {contentSummary.length > 0 ? (
            <div className="content-performance-list">
              {contentSummary.map((item) => (
                <div
                  className="content-performance-row"
                  key={item.category}
                >
                  <div>
                    <strong>
                      {item.category}
                    </strong>

                    <span>
                      {formatNumber(item.count)} posts
                    </span>

                    {item.viralPosts > 0 && (
                      <span>
                        🔥 {formatNumber(item.viralPosts)} viral posts
                      </span>
                    )}
                  </div>

                  <strong>
                    {item.engagement.toFixed(2)}%
                  </strong>
                </div>
              ))}
            </div>
          ) : (
            <p>
              No content category data is available.
            </p>
          )}
        </div>

        {/* BEST PERFORMING CATEGORY */}

        <div className="content-insight-placeholder">
          <span className="insight-label">
            CONTENT INSIGHT
          </span>

          <h2>
            Best Performing Content
          </h2>

          {bestContent ? (
            <>
              <p>
                <strong>
                  {bestContent.category}
                </strong>{" "}
                has the highest average engagement
                among the content categories.
              </p>

              <div className="best-content-metric">
                <span>
                  Average Engagement
                </span>

                <strong>
                  {bestContent.engagement.toFixed(2)}%
                </strong>
              </div>

              <div className="best-content-metric">
                <span>
                  Posts Published
                </span>

                <strong>
                  {formatNumber(bestContent.count)}
                </strong>
              </div>

              <div className="best-content-metric">
                <span>
                  Viral Posts
                </span>

                <strong>
                  {formatNumber(bestContent.viralPosts)}
                </strong>
              </div>
            </>
          ) : (
            <p>
              No content data is available for the
              selected account.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}

export default ContentAnalysis;