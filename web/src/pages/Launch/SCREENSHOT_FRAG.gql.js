import gql from "graphql-tag";

export default gql`
  fragment screenshot on Screenshot {
    id
    name
    diff
    size
    goldenUrl
    diffPercentage
    status
    createdAt
  }
`;
