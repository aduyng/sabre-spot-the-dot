import gql from "graphql-tag";

export default gql`
  mutation createApiKey($description: String!) {
    createApiKey(description: $description) {
      plainTextKey
      expiresAt
    }
  }
`;
