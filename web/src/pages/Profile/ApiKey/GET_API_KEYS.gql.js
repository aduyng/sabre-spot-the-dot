import gql from "graphql-tag";

export default gql`
  query getApiKeys {
    getApiKeys {
      id
      description
      expiresAt
    }
  }
`;
