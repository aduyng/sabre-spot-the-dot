import gql from "graphql-tag";

export default gql`
  query getConfiguration {
    config {
      isDevelopment
      version
      buildNumber
      defaultPaginationRowsPerPage
    }
  }
`;
