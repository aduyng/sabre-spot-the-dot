import React from "react";
import PropTypes from "prop-types";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core";
import clsx from "clsx";
import { clamp, isNumber } from "lodash";

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
/**
 * If passed the "showColorBasedOnStatus" prop, the value will be clamped to 0-100 and used to determine the color of the circle.
 */
export default function CircularProgressWithLabel(props) {
  const styles = useStyles();
  const { value, showColorBasedStatus } = props;
  const progress = showColorBasedStatus ? clamp(value, 0, 100) : value;
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
          [styles.badStatus]: progress >= 75,
          [styles.mediumStatus]: progress >= 50 && progress < 75,
          [styles.goodStatus]: progress < 50
        })}
        value={progress % 100}
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
          {isNumber(value) ? `${Math.round(progress)}%` : "NA"}
        </Typography>
      </Box>
    </Box>
  );
}

CircularProgressWithLabel.propTypes = {
  value: PropTypes.number.isRequired,
  showColorBasedStatus: PropTypes.bool
};

CircularProgressWithLabel.defaultProps = {
  showColorBasedStatus: false
};
