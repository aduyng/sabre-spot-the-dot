const startOfDay = require("date-fns/startOfDay");

module.exports = () => startOfDay(new Date(2022, 0, 1));
