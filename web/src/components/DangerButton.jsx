import React from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import { arrayOf, node, oneOfType, string } from "prop-types";

const useStyles = makeStyles(theme => ({
  danger: {
    color: theme.palette.getContrastText(theme.palette.error.main),
    background: theme.palette.error.main,
    "&:hover": {
      background: theme.palette.error.dark
    },
    "&:disabled": {
      background: theme.palette.action.disabledBackground
    }
  }
}));

export default function DangerButton({ children, className, ...props }) {
  const classes = useStyles();
  return (
    <Button
      data-testid="dangerButton"
      variant="outlined"
      {...props}
      className={clsx(classes.danger, className)}
    >
      {children}
    </Button>
  );
}

DangerButton.propTypes = {
  children: oneOfType([arrayOf(node), node]),
  className: string
};

DangerButton.defaultProps = {
  children: null,
  className: null
};
