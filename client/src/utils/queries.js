import { gql } from '@apollo/client';

export const GET_ME = gql`
{
  me {
      _id
      username
      email
      savedBuddies {
        bookId
        authors
        description
        image
        link
        title
      }
    }
  }
`;

