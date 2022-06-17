import React from "react";
import { string } from "prop-types";
import Box from "@material-ui/core/Box";
import "firebase/auth";
import { makeStyles } from "@material-ui/core/styles";
import ProgressiveImage from "react-progressive-image";
import clsx from "clsx";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import useTheme from "@material-ui/core/styles/useTheme";

const useStyles = makeStyles(theme => {
  return {
    root: {
      position: "fixed",
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      height: "100%",
      display: "flex",
      justifyContent: "center"
    },
    image: {
      height: "100%",
      opacity: 1,
      [theme.breakpoints.up("md")]: {
        height: "auto"
      },
      [theme.breakpoints.up("xl")]: {
        width: "100%"
      }
    },
    imageBlur: {
      filter: `blur(${theme.spacing(1.5)}px)`
    },
    loading: {
      opacity: 0.5
    }
  };
});

export default function FullscreenBackground({ className, ...rest }) {
  const classes = useStyles();
  const theme = useTheme();
  const isSMAndDown = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <Box className={clsx(classes.root, className, { smallScreen: isSMAndDown })}>
      <ProgressiveImage {...rest}>
        {(src, loading) => (
          <img
            className={clsx(classes.image, {
              [classes.imageBlur]: loading,
              [classes.loading]: loading
            })}
            src={src}
            alt={rest.alt}
          />
        )}
      </ProgressiveImage>
    </Box>
  );
}

FullscreenBackground.propTypes = {
  className: string
};

FullscreenBackground.defaultProps = {
  className: undefined
};
