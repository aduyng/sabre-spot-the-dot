import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import makeStyles from "@material-ui/core/styles/makeStyles";
import formatPercentage from "../libs/formatPercentage";

const useStyles = makeStyles(theme => ({
  colorDone: {
    color: theme.palette.success.light
  },
  colorWarning: {
    color: theme.palette.warning.light
  },
  colorError: {
    color: theme.palette.error.light
  }
}));

export default function CircularProgressWithLabel({ value, ...props }) {
  const classes = useStyles();

  return (
    <Box position="relative" display="inline-flex">
      <CircularProgress
        variant="determinate"
        value={value}
        {...props}
        className={clsx({
          [classes.colorDone]: value >= 100,
          [classes.colorWarning]: value < 100 && value >= 75,
          [classes.colorError]: value < 75
        })}
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
        <Typography
          variant="caption"
          component="div"
          className={clsx(
            {
              [classes.colorDone]: value >= 100
            },
            {
              [classes.colorWarning]: value < 100 && value >= 75
            },
            {
              [classes.colorError]: value < 75
            }
          )}
        >
          {formatPercentage(value, "0%")}
        </Typography>
      </Box>
    </Box>
  );
}

CircularProgressWithLabel.propTypes = {
  value: PropTypes.number.isRequired
};
