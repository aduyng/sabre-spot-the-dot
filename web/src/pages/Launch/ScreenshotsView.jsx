import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { useState, useMemo } from "react";
import React from "react";
import DiffCard from "../../components/DiffCard/DiffCard";
import { useRef } from "react";
import { useEffect } from "react";
import { wrapGrid } from "animate-css-grid";
import { last } from "lodash";
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
  const [expanded, setExpanded] = useState(new Set()); // list of expanded ids
  const toggle = id => () =>
    setExpanded(set =>
      !set.has(id) ? new Set([...set, id]) : new Set([...set].filter(i => i !== id))
    );
  const mapping = screenshots.reduce((acc, sc) => {
    // take expanded ids and map over the scs
    const prev = last(acc);
    if (expanded.has(sc.id)) {
      return [
        ...acc,
        {
          ...sc,
          expanded: true,
          rightButton: true
        }
      ];
    }
    return [
      ...acc,
      {
        ...sc,
        expanded: false,
        rightButton: prev && prev.expanded ? true : prev && prev.rightButton ? false : true
      }
    ];
  }, []);
  console.log("mapping", mapping, expanded);
  return (
    <Grid container={true} innerRef={grid} spacing={3} className={styles.grid}>
      {mapping &&
        mapping.map(sc => {
          return <DiffCard screenshot={sc} toggle={toggle(sc.id)} key={sc.id} />;
        })}
    </Grid>
  );
}
