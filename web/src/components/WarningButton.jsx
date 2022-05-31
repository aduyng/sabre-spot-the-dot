import React from "react";
import Button from "@material-ui/core/Button";
import makeStyles from "@material-ui/core/styles/makeStyles";
import clsx from "clsx";
import { arrayOf, node, oneOfType, string } from "prop-types";

const useStyles = makeStyles(theme => ({
  warning: {
    color: theme.palette.common.white,
    background: theme.palette.warning.main,
    "&:hover": {
      background: theme.palette.warning.dark
    }
  }
}));

export default function WarningButton({ children, className, ...props }) {
  const classes = useStyles();
  return (
    <Button variant="outlined" {...props} className={clsx(classes.warning, className)}>
      {children}
    </Button>
  );
}

WarningButton.propTypes = {
  children: oneOfType([arrayOf(node), node]).isRequired,
  className: string
};

WarningButton.defaultProps = {
  className: null
};
