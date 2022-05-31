import gql from "graphql-tag";

export default gql`
  query getProjects {
    getProjects {
      id
      name
    }
  }
`;
