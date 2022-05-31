import { withStyles } from "@material-ui/core/styles";
import TableCell from "@material-ui/core/TableCell";

export default withStyles(theme => {
  const backgroundColor = theme.palette.primary.main;
  return {
    head: {
      backgroundColor,
      borderBottom: `1px solid ${theme.palette.common.black}`,
      color: theme.palette.common.white,
      fontWeight: "bold"
    }
  };
})(TableCell);
