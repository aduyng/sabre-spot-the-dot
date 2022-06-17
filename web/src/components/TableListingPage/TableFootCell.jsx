import { withStyles, lighten } from "@material-ui/core/styles";
import TableCell from "@material-ui/core/TableCell";

export default withStyles(theme => {
  const backgroundColor = lighten(theme.palette.primary.main, 0.25);
  return {
    footer: {
      backgroundColor,
      borderTop: `1px solid ${theme.palette.common.black}`,
      color: theme.palette.common.white,
      fontWeight: "bold",
      fontSize: "1rem"
    }
  };
})(TableCell);
