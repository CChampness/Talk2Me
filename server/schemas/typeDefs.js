const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String!
    email: String
    isAdmin: Boolean
    profile: Profile
    savedBuddies: [Buddy]!
    savedMessages: [Message]!
  }

  input UserInput {
    _id: ID
    username: String!
    email: String
    isAdmin: Boolean
    profile: ProfileInput
    savedBuddies: [BuddyInput]!
    savedMessages: [MessageInput]!
  }

  type Buddy {
    buddyName: String!
    groupName: String
    status: String
  }

  input BuddyInput {
    buddyName: String!
    groupName: String
    status: String
  }

  type ConversationGroup {
    _id: ID
    groupName: String!
    ownerName: String!
    buddyName: String
    conversationBuddies: [Buddy]!
  }

  input ConversationGroupInput {
    _id: ID
    groupName: String!
    ownerName: String!
    buddyName: String
    conversationBuddies: [BuddyInput]!
  }

  type Message {
    _id: ID
    messageTo: String
    messageText: String
    messageFrom: String
    createdAt: String
    groupName: String
  }

  input MessageInput {
    _id: ID
    messageTo: String
    messageText: String
    messageFrom: String
    createdAt: String
    groupName: String
  }

  type Profile {
    name: String
    interests: String
    language: String
    readingLevel: String
    writingLevel: String
    grammarLevel: String
    pronunciationLevel: String
    sex: String
    age: String
    countryFrom: String
    countryNow: String
    contactInfo: String
    resources: String
  }

  input ProfileInput {
    name: String
    interests: String
    language: String
    readingLevel: String
    writingLevel: String
    grammarLevel: String
    pronunciationLevel: String
    sex: String
    age: String
    countryFrom: String
    countryNow: String
    contactInfo: String
    resources: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    me: User
    users: [User]!
    myGroups: [ConversationGroup]
    getGroup(groupName: String!): ConversationGroup
    getAllGroups: [ConversationGroup]
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    loginUser(email: String!, password: String!): Auth
    deleteUser(username: String!): User
    saveProfile(profileData: ProfileInput!): User
    saveBuddy(buddyData: BuddyInput!, whoToLookUp: String): User
    addBuddy(buddyData: BuddyInput): ConversationGroup
    createGroup(groupName: String!, ownerName: String!): ConversationGroup
    deleteGroup(groupName: String!): ConversationGroup
    saveMessage(messageData: MessageInput!): User
    deleteMessage(messageData: MessageInput!): User
    removeBuddy(buddyName: String!, whoToLookUp: String): User
  }
`;

module.exports = typeDefs;
