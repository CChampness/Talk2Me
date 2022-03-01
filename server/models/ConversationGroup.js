const { Schema, model } = require('mongoose');
const Buddy = require('./Buddy');

const groupSchema = new Schema(
  {
    groupName: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    ownerName: {
      type: String,
      required: true
    },
    // conversationBuddies: [Buddy],
    conversationBuddies: { type: Array },
  },
  // set this to use virtual below
  {
    toJSON: {
      virtuals: true,
    },
  }
);

const ConversationGroup = model('ConversationGroup', groupSchema);

module.exports = ConversationGroup;
