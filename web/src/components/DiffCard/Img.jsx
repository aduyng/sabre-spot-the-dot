import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";
import { useTranslation } from "react-i18next";

const useStyles = makeStyles(theme => ({
  div: { height: "240px", width: "100%", display: "flex", flexDirection: "column" },
  img: {
    maxWidth: "inherit",
    maxHeight: "inherit",
    height: "inherit",
    width: "inherit",
    objectFit: "cover",
    border: `1px solid ${theme.palette.common.black}`
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
  const { t } = useTranslation();
  return (
    <div className={styles.div}>
      {src ? (
        <>
          <img className={styles.img} src={src} alt={alt} />
          <Typography className={styles.label}>{label}</Typography>
        </>
      ) : (
        <Typography>{t("No Image Found")}</Typography>
      )}
    </div>
  );
};
export default Img;
Img.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired
};

Img.defaultProps = {
  src: ""
};
