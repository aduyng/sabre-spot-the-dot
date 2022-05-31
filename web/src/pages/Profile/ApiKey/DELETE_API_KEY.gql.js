import gql from "graphql-tag";

export default gql`
  mutation deleteApiKey($id: ID!) {
    deleteApiKey(id: $id)
  }
`;
