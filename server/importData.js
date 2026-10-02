const path = require("path");
const dotenv = require("dotenv");

const connectDB = require("./config/db");
const importCSV = require("./utils/csvImporter");

dotenv.config();

const importData = async () => {
  try {
    await connectDB();

    const filePath = path.join(
      __dirname,
      "data",
      "Instagram_Analytics.csv"
    );

    const count = await importCSV(filePath);

    console.log(`Successfully imported ${count} records.`);

    process.exit(0);
  } catch (error) {
    console.error("CSV import failed:", error.message);
    process.exit(1);
  }
};

importData();