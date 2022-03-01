import { gql } from '@apollo/client';

export const GET_ME = gql`
{
  me {
      _id
      username
      email
      isAdmin
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
      savedBuddies {
        buddyId
      }
      savedMessages {
        _id
        messageText
        messageFrom
        createdAt
      }
    }
  }
`;

export const GET_USERS = gql`
{
  users {
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
      savedBuddies {
        buddyId
      }
      savedMessages {
        messageText
      }
    }
  }
`;

export const GET_GROUPS = gql`
{
  groups {
      groupName
    }
  }
`;
