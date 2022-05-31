import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloLink } from "apollo-link";
import createErrorHandlingLink from "./createErrorHandlingLink";
import createAuthLink from "./createAuthLink";
import createHttpLink from "./createHttpLink";
import createCleanTypenameLink from "./createCleanTypenameLink";

export default () => {
  const errorHandlingLink = createErrorHandlingLink();
  const authLink = createAuthLink();
  const httpLink = createHttpLink();
  const cleanTypenameLink = createCleanTypenameLink();
  const links = [cleanTypenameLink, errorHandlingLink, authLink, httpLink];
  const link = ApolloLink.from(links);
  const cache = new InMemoryCache();

  return new ApolloClient({
    link,
    cache
  });
};
