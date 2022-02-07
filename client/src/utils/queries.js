import { gql } from '@apollo/client';

// export const GET_ME = gql`
// {
//   me {
//       _id
//       username
//       email
//       savedBuddies {
//         profileId
//         interests
//         name
//       }
//     }
//   }
// `;

export const GET_ME = gql`
{
  me {
      _id
      username
      email
      profile
    }
  }
`;
