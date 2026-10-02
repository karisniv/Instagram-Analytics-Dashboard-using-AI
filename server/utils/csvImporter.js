const fs = require("fs");
const csv = require("csv-parser");

const InstagramAnalytics = require("../models/InstagramAnalytics");

const importCSV = (filePath) => {
  return new Promise((resolve, reject) => {
    const records = [];

    fs.createReadStream(filePath)
      .pipe(csv())
      .on("data", (row) => {
        records.push({
          post_id: row.post_id,
          account_id: Number(row.account_id),
          account_type: row.account_type,
          follower_count: Number(row.follower_count),
          media_type: row.media_type,
          content_category: row.content_category,
          traffic_source: row.traffic_source,
          has_call_to_action: Number(row.has_call_to_action),
          post_datetime: row.post_datetime
            ? new Date(row.post_datetime)
            : null,
          post_date: row.post_date,
          post_hour: Number(row.post_hour),
          day_of_week: row.day_of_week,
          likes: Number(row.likes),
          comments: Number(row.comments),
          shares: Number(row.shares),
          saves: Number(row.saves),
          reach: Number(row.reach),
          impressions: Number(row.impressions),
          engagement_rate: Number(row.engagement_rate),
          followers_gained: Number(row.followers_gained),
          caption_length: Number(row.caption_length),
          hashtags_count: Number(row.hashtags_count),
          performance_bucket_label: row.performance_bucket_label,
        });
      })
      .on("end", async () => {
        try {
          await InstagramAnalytics.deleteMany({});

          await InstagramAnalytics.insertMany(records);

          console.log(
            `${records.length} Instagram records imported successfully.`
          );

          resolve(records.length);
        } catch (error) {
          reject(error);
        }
      })
      .on("error", (error) => {
        reject(error);
      });
  });
};

module.exports = importCSV;