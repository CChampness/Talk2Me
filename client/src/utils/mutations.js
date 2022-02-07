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

// export const SAVE_BOOK = gql`
//   mutation saveBook($bookData: BookInput!) {
//     saveBook(bookData: $bookData) {
//       _id
//       username
//       email
//       savedBuddies {
//         bookId
//         description
//         authors
//         image
//         link
//         title
//       }
//     }
//   }
// `;

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

// export const REMOVE_BOOK = gql`
//   mutation removeBook($bookId: ID!) {
//     removeBook(bookId: $bookId) {
//       _id
//     }
//   }
// `;
