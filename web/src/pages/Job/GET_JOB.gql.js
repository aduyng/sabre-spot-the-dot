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
      avgDiffPercent
    }

    getProject(id: $projectId) {
      id
      name
    }
    getResembleConfig(jobId: $id) {
      ignore
      output {
        errorColor {
          red
          green
          blue
        }
        errorType
        transparency
      }
    }
  }
`;
