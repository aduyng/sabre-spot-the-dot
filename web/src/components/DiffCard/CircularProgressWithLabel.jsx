import React from "react";
import PropTypes from "prop-types";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core";
import clsx from "clsx";

const useStyles = makeStyles(theme => ({
  root: {
    position: "relative"
  },
  bottom: {
    color: theme.palette.primary.light
  },
  top: {
    position: "absolute",
    left: 0
  },
  badStatus: {
    color: theme.palette.error.main
  },
  mediumStatus: {
    color: theme.palette.warning.main
  },
  goodStatus: {
    color: theme.palette.success.main
  },
  circle: {
    strokeLinecap: "round"
  }
}));
export default function CircularProgressWithLabel(props) {
  const styles = useStyles();
  let { value } = props;
  value %= 100; // needed for demo
  return (
    <Box position="relative" display="inline-flex" className={styles.box}>
      <CircularProgress
        variant="determinate"
        className={styles.bottom}
        value={100}
        size={50}
        thickness={4}
      />
      <CircularProgress
        variant="determinate"
        thickness={4}
        className={clsx(styles.top, {
          [styles.badStatus]: value >= 75,
          [styles.mediumStatus]: value >= 50 && value < 75,
          [styles.goodStatus]: value < 50
        })}
        value={value % 100}
        size={50}
        classes={{ circle: styles.circle }}
      />
      <Box
        top={0}
        left={0}
        bottom={0}
        right={0}
        position="absolute"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Typography variant="body1" component="div" color="textPrimary">
          {`${Math.round(value % 100)}%`}
        </Typography>
      </Box>
    </Box>
  );
}

CircularProgressWithLabel.propTypes = {
  /**
   * The value of the progress indicator for the determinate variant.
   * Value between 0 and 100.
   */
  value: PropTypes.number.isRequired
};
