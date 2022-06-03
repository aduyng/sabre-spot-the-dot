import gql from "graphql-tag";

export default gql`
    query getJob($id: ID!) {
        getJob(id: $id) {
            name
            id
        }
        getLaunches(jobId: $id) {
            id
            status
            startedAt
            completedAt
            isGolden
        }
    }
`