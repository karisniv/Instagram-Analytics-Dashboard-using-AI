const API_BASE_URL = "http://localhost:5000/api";

export const getAccountNumbers = async () => {
  const response = await fetch(
    `${API_BASE_URL}/analytics/accounts`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch account numbers");
  }

  return response.json();
};

export const getAccountAnalytics = async (accountId) => {
  const response = await fetch(
    `${API_BASE_URL}/analytics/${encodeURIComponent(accountId)}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch account analytics");
  }

  return response.json();
};

export const generateReport = async (reportData) => {
  const response = await fetch(
    `${API_BASE_URL}/reports/generate`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reportData),
    }
  );

  if (!response.ok) {
    let errorMessage = "Failed to generate report";

    try {
      const errorData = await response.json();

      if (errorData.message) {
        errorMessage = errorData.message;
      }
    } catch {
      // Keep default error message
    }

    throw new Error(errorMessage);
  }

  return response.blob();
};