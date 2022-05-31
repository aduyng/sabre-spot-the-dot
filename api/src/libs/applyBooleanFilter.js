module.exports = ({ memo, filterKey, filterValue }) => {
  if (filterValue === "true") {
    memo.qb.where(filterKey, true);
  } else if (filterValue === "false") {
    memo.qb.where(filterKey, false);
  }
  return memo;
};
