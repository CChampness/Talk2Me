const { Schema, model } = require('mongoose');

// This is a subdocument schema, it won't
// become its own model but we'll use it as
// the schema for the User's `messages` in User.js
const messageSchema = new Schema({
  messageText: {
    type: String,
  }
});

module.exports = messageSchema;