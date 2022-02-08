const { Schema, model } = require('mongoose');

// This is a subdocument schema, it won't
// become its own model but we'll use it as the schema 
// for the User's `savedBuddies` array in User.js
const buddySchema = new Schema({
  buddyId: {
    type: String,
    required: true,
  }
});

module.exports = buddySchema;