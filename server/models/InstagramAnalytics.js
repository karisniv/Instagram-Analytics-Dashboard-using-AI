const mongoose = require("mongoose");

const InstagramAnalyticsSchema = new mongoose.Schema(
  {
    post_id: {
      type: String,
      required: true,
      unique: true,
    },

    account_id: {
      type: Number,
      required: true,
      index: true,
    },

    account_type: {
      type: String,
    },

    follower_count: {
      type: Number,
    },

    media_type: {
      type: String,
    },

    content_category: {
      type: String,
    },

    traffic_source: {
      type: String,
    },

    has_call_to_action: {
      type: Number,
    },

    post_datetime: {
      type: Date,
    },

    post_date: {
      type: String,
    },

    post_hour: {
      type: Number,
    },

    day_of_week: {
      type: String,
    },

    likes: {
      type: Number,
    },

    comments: {
      type: Number,
    },

    shares: {
      type: Number,
    },

    saves: {
      type: Number,
    },

    reach: {
      type: Number,
    },

    impressions: {
      type: Number,
    },

    engagement_rate: {
      type: Number,
    },

    followers_gained: {
      type: Number,
    },

    caption_length: {
      type: Number,
    },

    hashtags_count: {
      type: Number,
    },

    performance_bucket_label: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "InstagramAnalytics",
  InstagramAnalyticsSchema
);