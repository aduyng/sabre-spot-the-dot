import gql from "graphql-tag";

export default gql`
  query getCrumbs($projectId: ID!, $jobId: ID) {
    getCrumbs(projectId: $projectId, jobId: $jobId) {
        jobName
        projectName
    }
  }
`;
