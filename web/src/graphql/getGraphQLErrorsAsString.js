import map from "lodash/map";
import isEmpty from "lodash/isEmpty";
import compact from "lodash/compact";

export default error => {
  if (isEmpty(error)) {
    return error;
  }

  if (!isEmpty(error.graphQLErrors)) {
    return compact(
      map(error.graphQLErrors || error.errors, ({ message, extensions }) => {
        if (!isEmpty(message)) {
          return message;
        }

        if (extensions && extensions.code === "FORBIDDEN") {
          return "permission denied";
        }
        return undefined;
      })
    ).join(", ");
  }

  return error.message || error;
};
