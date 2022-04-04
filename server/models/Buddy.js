const { Schema, model } = require('mongoose');

const buddySchema = new Schema(
  {
    groupName: {
      type: String,
      trim: true
    },

    buddyName: {
      type: String,
      required: true
    }
  }
);

module.exports = buddySchema;