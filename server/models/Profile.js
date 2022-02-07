const { Schema, model } = require('mongoose');

// This is a subdocument schema, it won't
// become its own model but we'll use it as
// the schema for the User's `profile` in User.js
const profileSchema = new Schema({
  name: {
    type: String,
  },
  interests: {
    type: String,
  },
  language: {
    type: String,
  },
  readingLevel: {
    type: String,
  },
  writingLevel: {
    type: String,
  },
  grammarLevel: {
    type: String,
  },
  pronunciationLevel: {
    type: String,
  },
  sex: {
    type: String,
  },
  age: {
    type: String,
  },
  countryFrom: {
    type: String,
  },
  countryNow: {
    type: String,
  },
  contactInfo: {
    type: String,
  }
});

module.exports = profileSchema;