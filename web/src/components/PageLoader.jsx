import React from "react";
import { bool, number, string } from "prop-types";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    height: "100%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center"
  },
  container: {
    display: "flex",
    margin: "auto",
    alignItems: "center",
    justifyContent: "center"
  },
  gridContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  boxItem: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  }
}));

export default function PageLoader({ size, center, progressClassName, progressColor }) {
  const classes = useStyles();
  const theme = useTheme();
  if (center) {
    return (
      <Grid container spacing={0} className={classes.gridContainer}>
        <Grid item xs={3} className={classes.boxItem}>
          <CircularProgress
            data-testid="circularProgressIcon"
            disableShrink
            size={theme.spacing(size)}
            color={progressColor}
            className={progressClassName}
          />
        </Grid>
      </Grid>
    );
  }
  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <CircularProgress
          disableShrink
          size={theme.spacing(size)}
          color={progressColor}
          className={progressClassName}
        />
      </div>
    </div>
  );
}

PageLoader.propTypes = {
  size: number,
  center: bool,
  progressClassName: string,
  progressColor: string
};

PageLoader.defaultProps = {
  size: 8,
  center: false,
  progressClassName: undefined,
  progressColor: "primary"
};
