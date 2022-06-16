import gql from "graphql-tag";

export default gql`
  mutation setGolden($projectId: ID!, $jobId: ID!, $launchId: ID!) {
    setGolden(projectId: $projectId, jobId: $jobId, launchId: $launchId) {
      id
      isGolden
      name
    }
  }
`;
