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

export const SAVE_BUDDY = gql`
  mutation saveBuddy($buddyData: BuddyInput!) {
    saveBuddy(buddyData: $buddyData) {
      username
      email
      savedBuddies {
        buddyId
      }
    }
  }
`;

export const SAVE_MESSAGE = gql`
  mutation saveMessage($messageData: MessageInput!) {
    saveMessage(messageData: $messageData) {
      username
      email
      savedMessages {
        messageText
      }
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
  mutation removeBuddy($buddyId: ID!) {
    removeBook(buddyId: $buddyId) {
      _id
    }
  }
`;
