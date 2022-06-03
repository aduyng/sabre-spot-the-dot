import gql from "graphql-tag";

export default gql`
  query getLaunch($id: ID!) {
    getLaunch(id: $id) {
      id
      status
      createdAt
      updatedAt
      url
      branch
      commit
      number
      name
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
`;
