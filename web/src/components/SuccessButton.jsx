import React from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import { arrayOf, node, oneOfType, string } from "prop-types";

const useStyles = makeStyles(theme => ({
  success: {
    color: theme.palette.common.white,
    fontWeight: "bold",
    background: theme.palette.success.main,
    "&:hover": {
      background: theme.palette.success.dark
    }
  }
}));

export default function SuccessButton({ children, className, ...props }) {
  const classes = useStyles();
  return (
    <Button variant="outlined" {...props} className={clsx(classes.success, className)}>
      {children}
    </Button>
  );
}

SuccessButton.propTypes = {
  children: oneOfType([arrayOf(node), node]).isRequired,
  className: string
};

SuccessButton.defaultProps = {
  className: null
};
