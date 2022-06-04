import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles(theme => ({
  div: { height: "240px", width: "100%", display: "flex", flexDirection: "column" },
  img: {
    maxWidth: "inherit",
    maxHeight: "inherit",
    height: "inherit",
    width: "inherit",
    objectFit: "cover"
  },
  label: {
    position: "relative",
    bottom: "50px",
    left: "10px",
    display: "inline",
    backgroundColor: theme.palette.grey[700],
    opacity: "0.7",
    color: "white",
    width: "fit-content",
    padding: "2px 4px",
    borderRadius: "4px"
  }
}));

const Img = ({ src, alt, label }) => {
  const styles = useStyles();
  return (
    <div className={styles.div}>
      <img className={styles.img} src={src} alt={alt} />
      <Typography className={styles.label}>{label}</Typography>
    </div>
  );
};
export default Img;
Img.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired
};
