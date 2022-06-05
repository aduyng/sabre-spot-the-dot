import { Grid, makeStyles } from "@material-ui/core";
import React, { useRef, useEffect } from "react";
import PropTypes from "prop-types";
import { wrapGrid } from "animate-css-grid";
import Typography from "@material-ui/core/Typography";
import DiffCard from "../../components/DiffCard/DiffCard";

const useStyles = makeStyles({
  grid: {
    width: "90vw",
    minHeight: "100vh",
    margin: "0 auto"
  },
  emptyText: {
    textAlign: "center"
  }
});

export default function ScreenshotsView({ screenshots }) {
  const styles = useStyles();
  const grid = useRef();

  useEffect(() => {
    wrapGrid(grid.current, {
      easing: "easeInOut",
      stagger: 10,
      duration: 400
    });
  }, []);

  return (
    <Grid container innerRef={grid} spacing={2} className={styles.grid}>
      {screenshots && screenshots.length > 0 ? (
        screenshots.map(sc => {
          return <DiffCard screenshot={sc} key={sc.id} />;
        })
      ) : (
        <Typography className={styles.emptyText}>
          Looks like there is no screenshots to show...
        </Typography>
      )}
    </Grid>
  );
}

ScreenshotsView.propTypes = {
  screenshots: PropTypes.arrayOf(PropTypes.shape({})).isRequired
};
