import "../styles/LandingPage.css";

function LandingPage({ onGetStarted }) {
  return (
    <main className="landing-page">
      <div className="landing-content">
        <span className="landing-eyebrow">
          AI-POWERED INSTAGRAM ANALYTICS
        </span>

        <h1>
          Instagram Analytics
          <br />
          Dashboard using AI
        </h1>

        <p>
          Transform Instagram data into meaningful insights with
          intelligent analytics, performance tracking, and
          AI-powered recommendations.
        </p>

        <button
          className="get-started-btn"
          onClick={onGetStarted}
        >
          Get Started
          <span>→</span>
        </button>
      </div>
    </main>
  );
}

export default LandingPage;