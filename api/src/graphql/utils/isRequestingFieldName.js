const find = require("lodash/find");

function searchFieldRecursively({ node, fieldName }) {
  if (node.kind === "Field") {
    if (node.name.value === fieldName) {
      return node;
    }
    if (node.selectionSet) {
      return searchFieldRecursively({ node: node.selectionSet, fieldName });
    }
  }

  if (node.kind === "SelectionSet") {
    return find(node.selections, selection =>
      searchFieldRecursively({ node: selection, fieldName })
    );
  }

  return false;
}
module.exports = function isRequesting({ info, fieldName }) {
  return searchFieldRecursively({ node: info.fieldNodes[0], fieldName });
};
