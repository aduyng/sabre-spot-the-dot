import React from "react";
import { oneOfType, node, arrayOf, string } from "prop-types";
import Grid from "@material-ui/core/Grid";

export default function CenteredLayout({ children, align, justify }) {
  return (
    <Grid container spacing={0} align={align} justify={justify} direction="column">
      <Grid item>{children}</Grid>
    </Grid>
  );
}

CenteredLayout.propTypes = {
  children: oneOfType([arrayOf(node), node]).isRequired,
  justify: string,
  align: string
};

CenteredLayout.defaultProps = {
  justify: "center",
  align: "center"
};
