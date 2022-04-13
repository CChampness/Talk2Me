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
        buddyName
        status
      }
      savedMessages {
        _id
        messageText
        messageFrom
        messageTo
        createdAt
        groupName
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
        buddyName
        status
      }
      savedMessages {
        messageText
        messageFrom
        messageTo
        createdAt
        groupName
      }
    }
  }
`;

export const GET_ALL_GROUPS = gql`
{
  getAllGroups {
    groupName
    ownerName
    conversationBuddies {
      buddyName
    }
  }
}`;

export const GET_GROUP = gql`
query getGroup($groupName: String!) {
  getGroup(groupName: $groupName) {
    groupName
    ownerName
    buddyName
    conversationBuddies {
      buddyName
    }
  }
}`;

export const GET_MY_GROUPS = gql`
{
  myGroups {
      groupName
    }
  }
`;
