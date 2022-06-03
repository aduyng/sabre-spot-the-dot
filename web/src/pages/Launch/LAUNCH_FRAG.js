import gql from "graphql-tag";

export default gql`
  fragment launch on Launch {
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
  }
`;
