import gql from "graphql-tag";

export default gql`
  query getProject($id: ID!) {
    getProject(id: $id) {
      id
      name
    }
    getJobs(projectId: $id) {
      id
      name
    }
  }
`;
