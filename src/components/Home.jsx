import { useEffect, useState } from "react";
import {
  getAccountNumbers,
  getAccountAnalytics,
} from "../services/api";
import "../styles/Home.css";

function Home({
  analystName,
  setAnalystName,
  selectedAccNo,
  setSelectedAccNo,
  setAnalyticsData,
  loadingAnalytics,
  setLoadingAnalytics,
  setAnalyticsError,
  setActiveSection,
}) {
  const [accountNumbers, setAccountNumbers] = useState([]);
  const [loadingAccounts, setLoadingAccounts] = useState(true);
  const [accountError, setAccountError] = useState("");

  useEffect(() => {
    const loadAccounts = async () => {
      try {
        const accounts = await getAccountNumbers();
        setAccountNumbers(accounts);
      } catch (error) {
        console.error("Failed to load accounts:", error);
        setAccountError("Unable to load account numbers.");
      } finally {
        setLoadingAccounts(false);
      }
    };

    loadAccounts();
  }, []);

  const handleAnalyze = async () => {
    if (!analystName.trim()) {
      alert("Please enter your name.");
      return;
    }

    if (!selectedAccNo) {
      alert("Please select an account number.");
      return;
    }

    try {
      setLoadingAnalytics(true);
      setAnalyticsError("");
      setAnalyticsData([]);

      const data = await getAccountAnalytics(selectedAccNo);

      setAnalyticsData(data);

      // Go to Post Analysis after successful analysis
      setActiveSection("post-analysis");
    } catch (error) {
      console.error("Failed to load account analytics:", error);

      setAnalyticsError(
        "Unable to load analytics for the selected account."
      );

      alert("Failed to load account analytics.");
    } finally {
      setLoadingAnalytics(false);
    }
  };

  return (
    <section className="home-section">
      <div className="home-header">
        <div>
          <span className="home-eyebrow">DATA CENTER</span>

          <h1>Instagram Analytics Dashboard</h1>

          <p>
            Welcome back. Select an Instagram account to explore
            performance insights and AI-powered recommendations.
          </p>
        </div>
      </div>

      <div className="account-selection-card">
        <div className="card-heading">
          <div className="card-icon">◎</div>

          <div>
            <h2>Start Your Analysis</h2>

            <p>
              Enter your analyst details and select an account to continue.
            </p>
          </div>
        </div>

        <div className="form-grid">
          <div className="form-group">
            <label htmlFor="analystName">Analyst Name</label>

            <input
              id="analystName"
              type="text"
              placeholder="Enter your name"
              value={analystName}
              onChange={(event) => setAnalystName(event.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="accNo">Account Number</label>

            <select
              id="accNo"
              value={selectedAccNo}
              onChange={(event) => setSelectedAccNo(event.target.value)}
              disabled={loadingAccounts}
            >
              <option value="">
                {loadingAccounts
                  ? "Loading accounts..."
                  : "Select account number"}
              </option>

              {accountNumbers.map((account) => (
                <option key={account} value={account}>
                  {account}
                </option>
              ))}
            </select>

            {accountError && (
              <small className="form-error">{accountError}</small>
            )}
          </div>
        </div>

        <button
          className="analyze-btn"
          onClick={handleAnalyze}
          disabled={loadingAnalytics}
        >
          {loadingAnalytics ? "Analyzing..." : "Analyze Account"}
          <span>→</span>
        </button>
      </div>

      <div className="quick-stats">
        <div className="quick-stat-card">
          <span className="quick-stat-icon">◈</span>

          <div>
            <strong>Post Analysis</strong>
            <p>Track post performance</p>
          </div>
        </div>

        <div className="quick-stat-card">
          <span className="quick-stat-icon">◫</span>

          <div>
            <strong>Content Analysis</strong>
            <p>Understand content trends</p>
          </div>
        </div>

        <div className="quick-stat-card">
          <span className="quick-stat-icon">✦</span>

          <div>
            <strong>AI Insights</strong>
            <p>Get intelligent recommendations</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Home;