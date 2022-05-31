import { createHttpLink } from "apollo-link-http";

export default () =>
  createHttpLink({
    uri: process.env.REACT_APP_GRAPHQL_API_URL || "/graphql"
  });
