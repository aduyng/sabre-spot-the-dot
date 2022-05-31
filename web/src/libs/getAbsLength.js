export default value =>
  value
    .split("")
    .map(item => parseInt(item, 10))
    .filter(item => !Number.isNaN(item)).length;
