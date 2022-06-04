import gql from "graphql-tag";

export default gql`
  query getJob($id: ID!, $projectId: ID!) {
    getJob(id: $id) {
      name
      id
      url
      status
      createdAt
      updatedAt
      createdByUserId
      updatedByUserId
    }

    getLaunches(jobId: $id) {
      id
      name
      commit
      branch
      status
      createdAt
      createdByUserId
      updatedAt
      updatedByUserId
      isGolden
    }

    getProject(id: $projectId) {
      id
      name
    }
  }
`;
