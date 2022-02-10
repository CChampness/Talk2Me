const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    profile: Profile
    savedBuddies: [Buddy]!
    savedMessages: [Message]!
  }

  type Message {
    messageUser: String
    messageText: String
  }

  input MessageInput {
    messageUser: String
    messageText: String
  }

  type Buddy {
    buddyId: String
  }

  input BuddyInput {
    buddyId: String
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
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    me: User
    users: [User]!
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    loginUser(email: String!, password: String!): Auth
    saveProfile(profileData: ProfileInput!): User
    saveBuddy(buddyData: BuddyInput!): User
    saveMessage(messageData: MessageInput!): User
    removeBuddy(buddyId: String!): User
  }
`;

module.exports = typeDefs;
