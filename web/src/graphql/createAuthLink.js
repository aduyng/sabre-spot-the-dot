import { setContext } from "apollo-link-context";
import getStorage from "../libs/storage";

export default () =>
  setContext((_, { headers }) => {
    const token = getStorage() && getStorage().getItem("token");
    const headersToReturn = {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
      "x-timezone": Intl.DateTimeFormat().resolvedOptions().timeZone
    };
    return {
      headers: headersToReturn
    };
  });
