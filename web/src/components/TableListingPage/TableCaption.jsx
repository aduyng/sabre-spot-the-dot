import React from "react";
import { element, bool, string } from "prop-types";
import Toolbar from "@material-ui/core/Toolbar";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles(theme => ({
  progressHidden: {
    visibility: "hidden"
  },
  root: {
    marginBottom: theme.spacing(1),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2)
  }
}));

export default function TableCaption({ Filter, loading, className }) {
  const classes = useStyles();
  return (
    <Toolbar className={clsx(classes.root, className)} variant="dense">
      {Filter}
      <CircularProgress
        color="secondary"
        className={clsx({ [classes.progressHidden]: !loading })}
      />
    </Toolbar>
  );
}

TableCaption.propTypes = {
  Filter: element,
  loading: bool,
  className: string
};

TableCaption.defaultProps = {
  Filter: null,
  className: undefined,
  loading: false
};
