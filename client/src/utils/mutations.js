import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation loginUser($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const DELETE_USER = gql`
  mutation deleteUser($username: String!) {
    deleteUser(username: $username) {
      username
    }
  }
`;

export const CREATE_GROUP = gql`
  mutation createGroup($groupName: String!, $ownerName: String!) {
    createGroup(groupName: $groupName, ownerName: $ownerName) {
      groupName
      ownerName
    }
  }
`;

export const DELETE_GROUP = gql`
  mutation deleteGroup($groupName: String!) {
    deleteGroup(groupName: $groupName) {
      groupName
    }
  }
`;

export const SAVE_BUDDY = gql`
  mutation saveBuddy($buddyData: BuddyInput!, $whoToLookUp: String!) {
    saveBuddy(buddyData: $buddyData, whoToLookUp: $whoToLookUp) {
      username
      email
      savedBuddies {
        buddyName
        status
      }
    }
  }
`;

export const ADD_BUDDY = gql`
  mutation addBuddy($buddyData: BuddyInput) {
    addBuddy(buddyData: $buddyData) {
      groupName
      buddyName
      status
    }
  }
`;

export const SAVE_MESSAGE = gql`
  mutation saveMessage($messageData: MessageInput!) {
    saveMessage(messageData: $messageData) {
      username
      email
      savedMessages {
        messageTo
        messageText
        messageFrom
        createdAt
        groupName
      }
    }
  }
`;

export const DELETE_MESSAGE = gql`
  mutation deleteMessage($messageData: MessageInput!) {
    deleteMessage(messageData: $messageData) {
      _id
    }
  }
`;

export const SAVE_PROFILE = gql`
  mutation saveProfile($profileData: ProfileInput!) {
    saveProfile(profileData: $profileData) {
      _id
      username
      email
      profile {
        name
        interests
        language
        readingLevel
        writingLevel
        grammarLevel
        pronunciationLevel
        sex
        age
        countryFrom
        countryNow
        contactInfo
      }
    }
  }
`;

export const REMOVE_BUDDY = gql`
  mutation removeBuddy($buddyName: String!, $whoToLookUp: String!) {
    removeBuddy(buddyName: $buddyName, whoToLookUp: $whoToLookUp) {
      username
      savedBuddies {
        buddyName
        status
      }
    }
  }
`;
