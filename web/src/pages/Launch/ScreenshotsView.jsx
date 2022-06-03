import { Grid, makeStyles } from "@material-ui/core";
import React, { useRef, useEffect } from "react";
import PropTypes from "prop-types";
import { wrapGrid } from "animate-css-grid";
import DiffCard from "../../components/DiffCard/DiffCard";

const useStyles = makeStyles({
  grid: {
    width: "90vw",
    minHeight: "100vh",
    margin: "0 auto"
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
    <Grid container innerRef={grid} spacing={3} className={styles.grid}>
      {screenshots &&
        screenshots.map(sc => {
          return <DiffCard screenshot={sc} key={sc.id} />;
        })}
    </Grid>
  );
}

ScreenshotsView.propTypes = {
  screenshots: PropTypes.arrayOf(
    PropTypes.shape({
      expanded: PropTypes.bool.isRequired,
      rightButton: PropTypes.bool.isRequired
    })
  ).isRequired
};
