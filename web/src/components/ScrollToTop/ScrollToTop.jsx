import React, { useEffect, useState } from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import Fab from "@material-ui/core/Fab";
import debounce from "lodash/debounce";

const useStyles = makeStyles(theme => ({
  fab: {
    position: "fixed",
    right: theme.spacing(2),
    bottom: theme.spacing(6)
  }
}));

export default function ScrollToTop() {
  const [show, setShow] = useState(false);
  const classes = useStyles();

  const checkScrollTop = debounce(() => {
    setShow(window.pageYOffset > 76);
  }, 100);

  useEffect(() => {
    window.addEventListener("scroll", checkScrollTop);
    return () => window.removeEventListener("scroll", checkScrollTop);
  }, [checkScrollTop]);

  const onClick = () => {
    setShow(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!show) {
    return null;
  }

  return (
    <Fab
      size="small"
      color="secondary"
      aria-label="move to top"
      className={classes.fab}
      onClick={onClick}
    >
      <ArrowUpwardIcon />
    </Fab>
  );
}
