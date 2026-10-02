import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Home from "../components/Home";
import PostAnalysis from "../components/PostAnalysis";
import ContentAnalysis from "../components/ContentAnalysis";
import AIInsights from "../components/AIInsights";
import Reports from "../components/Reports";
import "../styles/Dashboard.css";

function Dashboard() {
  const [activeSection, setActiveSection] = useState("home");

  const [analystName, setAnalystName] = useState("");
  const [selectedAccNo, setSelectedAccNo] = useState("");

  const [analyticsData, setAnalyticsData] = useState([]);
  const [loadingAnalytics, setLoadingAnalytics] = useState(false);
  const [analyticsError, setAnalyticsError] = useState("");

  const renderSection = () => {
    switch (activeSection) {
      case "post-analysis":
        return (
          <PostAnalysis
            analystName={analystName}
            selectedAccNo={selectedAccNo}
            analyticsData={analyticsData}
            loadingAnalytics={loadingAnalytics}
            analyticsError={analyticsError}
          />
        );

      case "content-analysis":
        return (
          <ContentAnalysis
            analystName={analystName}
            selectedAccNo={selectedAccNo}
            analyticsData={analyticsData}
            loadingAnalytics={loadingAnalytics}
            analyticsError={analyticsError}
          />
        );

      case "ai-insights":
        return (
          <AIInsights
            analystName={analystName}
            selectedAccNo={selectedAccNo}
            analyticsData={analyticsData}
            loadingAnalytics={loadingAnalytics}
            analyticsError={analyticsError}
          />
        );

      case "reports":
        return (
          <Reports
            analystName={analystName}
            selectedAccNo={selectedAccNo}
            analyticsData={analyticsData}
            loadingAnalytics={loadingAnalytics}
            analyticsError={analyticsError}
          />
        );

      case "home":
      default:
        return (
          <Home
  analystName={analystName}
  setAnalystName={setAnalystName}
  selectedAccNo={selectedAccNo}
  setSelectedAccNo={setSelectedAccNo}
  setAnalyticsData={setAnalyticsData}
  loadingAnalytics={loadingAnalytics}
  setLoadingAnalytics={setLoadingAnalytics}
  setAnalyticsError={setAnalyticsError}
  setActiveSection={setActiveSection}
/>
        );
    }
  };

  return (
    <div className="dashboard-layout">
      <Sidebar
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />

      <main className="dashboard-main">
        {renderSection()}
      </main>
    </div>
  );
}

export default Dashboard;