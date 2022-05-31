const template = require("lodash/template");

module.exports = ({ stringTemplate, ...values }) => {
  const compiled = template(stringTemplate, { interpolate: /{{([\s\S]+?)}}/g });
  return compiled(values);
};
