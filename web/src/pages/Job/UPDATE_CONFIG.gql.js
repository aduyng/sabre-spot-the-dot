import gql from "graphql-tag";

export default gql`
  mutation updateResembleConfig($jobId: ID!, $projectId: ID!, $config: ResembleConfigInput!) {
    updateResembleConfig(jobId: $jobId, projectId: $projectId, config: $config)
  }
`;
