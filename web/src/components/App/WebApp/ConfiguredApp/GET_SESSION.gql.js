import gql from "graphql-tag";

export default gql`
  query getSession {
    getSession {
      user {
        id
        uid
        name
        email
        avatarUrl
      }
    }
  }
`;
