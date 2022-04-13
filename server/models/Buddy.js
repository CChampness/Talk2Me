const { Schema, model } = require('mongoose');

const buddySchema = new Schema(
  {
    buddyName: {
      type: String,
      required: true
    },
    groupName: {
      type: String
    },
    status: {
      type: String,
      default: "Not"
    },
  }
);

module.exports = buddySchema;