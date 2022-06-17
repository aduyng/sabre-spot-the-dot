import React from "react";
import { arrayOf, node, oneOfType } from "prop-types";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    height: "100%",
    width: "100%"
  },
  container: {
    display: "flex",
    margin: "auto"
  }
}));

export default function CenteredBlock({ children }) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.container}>{children}</div>
    </div>
  );
}

CenteredBlock.propTypes = {
  children: oneOfType([arrayOf(node), node]).isRequired
};

CenteredBlock.defaultProps = {};
