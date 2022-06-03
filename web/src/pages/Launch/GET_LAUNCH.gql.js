import gql from "graphql-tag";

export default gql`
  query getLaunch($id: ID!, $jobId: ID!) {
    getLaunch(id: $id) {
      id
      status
      startedAt
      completedAt
      isGolden
      screenshots {
        id
        name
        url
        size
        diffUrl
        goldenUrl
        diffPercentage
        status
        createdAt
      }
    }
    getGoldenLaunch(jobId: $jobId) {
      id
      status
      startedAt
      completedAt
      screenshots {
        id
        name
        url
        size
        diffUrl
        goldenUrl
        diffPercentage
        status
        createdAt
      }
    }
    getScreenshots(launchId: $id) {
      id
      name
      url
      size
      diffUrl
      goldenUrl
      diffPercentage
      status
      createdAt
    }
  }
`;
