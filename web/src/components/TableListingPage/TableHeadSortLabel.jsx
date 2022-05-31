import { withStyles } from "@material-ui/core/styles";
import TableSortLabel from "@material-ui/core/TableSortLabel";

export default withStyles(theme => {
  const mainColor = theme.palette.common.white;
  return {
    root: {
      color: mainColor,
      "&:hover": {
        color: mainColor
      },
      "&$active": {
        color: mainColor
      }
    },
    active: {},
    icon: {
      color: "inherit !important"
    }
  };
})(TableSortLabel);
