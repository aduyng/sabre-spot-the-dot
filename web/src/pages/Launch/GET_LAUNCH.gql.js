import gql from "graphql-tag"

export default gql`
    query getLaunch($id: ID!) {
        getLaunch(id: $id) {
            id
            status
            startedAt
            completedAt
            isGolden
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
`