import { ApolloLink } from "apollo-link";

const omitDeepArrayWalk = (arr, key) => {
  return arr.map(val => {
    if (Array.isArray(val)) return omitDeepArrayWalk(val, key);
    // eslint-disable-next-line no-use-before-define
    if (typeof val === "object") return omitDeep(val, key);
    return val;
  });
};

const omitDeep = (obj, key) => {
  const keys = Object.keys(obj);
  const newObj = {};
  keys.forEach(i => {
    if (i !== key) {
      const val = obj[i];
      if (val instanceof Date) newObj[i] = val;
      else if (Array.isArray(val)) newObj[i] = omitDeepArrayWalk(val, key);
      else if (typeof val === "object" && val !== null) newObj[i] = omitDeep(val, key);
      else newObj[i] = val;
    }
  });
  return newObj;
};

export default () => {
  return new ApolloLink((operation, forward) => {
    if (operation.variables && !operation.variables.file) {
      // eslint-disable-next-line no-param-reassign
      operation.variables = omitDeep(operation.variables, "__typename");
    }

    return forward(operation);
  });
};
