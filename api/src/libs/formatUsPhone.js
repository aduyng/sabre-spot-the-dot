const isNaN = require("lodash/isNaN");

module.exports = phone => {
  const phoneSimple = phone.replace(/\D+/g, "");
  if (phoneSimple.length === 10 && !isNaN(phoneSimple))
    return phoneSimple.replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3");
  return undefined;
};
