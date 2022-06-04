import gql from "graphql-tag";

export default gql`
  query getLaunch($launchId: ID!, $jobId: ID!, $projectId: ID!) {
    getLaunch(id: $launchId) {
      id
      name
      status
      createdAt
      createdByUserId
      updatedAt
      updatedByUserId
      url
      number
      commit
      branch
      isGolden
      screenshots {
        id
        launchId
        name
        diff
        diffPercentage
        status
        createdAt
      }
    }
    getGoldenLaunch(id: $jobId) {
      id
      name
      screenshots {
        id
        launchId
        name
        diff
        diffPercentage
        status
        createdAt
      }
    }
    getJob(id: $jobId) {
      id
      name
    }
    getProject(id: $projectId) {
      id
      name
    }
  }
`;
