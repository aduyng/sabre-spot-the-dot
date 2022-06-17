import React from "react";
import { node, oneOfType, arrayOf, bool, string } from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import PageLoader from "../PageLoader";

const useStyles = makeStyles(() => ({
  root: {
    width: "100%"
  }
}));

export default function Page({ children, loading, className, ...props }) {
  const classes = useStyles();
  if (loading) {
    return <PageLoader center />;
  }
  return (
    <div className={clsx(classes.root, className)} {...props}>
      {children}
    </div>
  );
}

Page.propTypes = {
  className: string,
  children: oneOfType([arrayOf(node), node]).isRequired,
  loading: bool
};

Page.defaultProps = {
  className: undefined,
  loading: false
};
