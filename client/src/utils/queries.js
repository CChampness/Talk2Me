import { gql } from '@apollo/client';

export const GET_ME = gql`
{
  me {
      _id
      username
      email
      profile
      savedBuddies {
        buddyId
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
    }
  }
`;
