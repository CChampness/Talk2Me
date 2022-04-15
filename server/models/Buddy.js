const { Schema, model } = require('mongoose');

const buddySchema = new Schema(
  {
    buddyName: {
      type: String,
      required: true,
      trim: true
    },
    groupName: {
      type: String,
      trim: true
    },
    status: {
      type: String,
      default: "Not"
    },
  }
);

module.exports = buddySchema;