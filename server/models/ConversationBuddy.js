const { Schema, model } = require('mongoose');
const Buddy = require('./Buddy');

const conversationBuddySchema = new Schema(
  {
    groupName: {
      type: String,
      required: true,
      trim: true
    },
    buddyName: {
      type: String,
      required: true,
      trim: true
    }
  }
);

const ConversationBuddy = model('ConversationBuddy', conversationBuddySchema);

module.exports = ConversationBuddy;
