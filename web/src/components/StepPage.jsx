import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Button from "@material-ui/core/Button";
import Toolbar from "@material-ui/core/Toolbar";
import Box from "@material-ui/core/Box";
import SaveIcon from "@material-ui/icons/Save";
import DeleteIcon from "@material-ui/icons/Delete";
import ArrowBack from "@material-ui/icons/ArrowBack";
import { arrayOf, bool, element, elementType, func, oneOfType, shape, string } from "prop-types";
import clsx from "clsx";

const useStyles = makeStyles(theme => ({
  form: {
    width: "100%",
    minHeight: theme.spacing(25),
    backgroundColor: theme.palette.common.white
  },
  content: {
    flex: 1
  },
  footer: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between"
  },
  button: {
    width: "100%",
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      width: "unset"
    }
  },
  deleteButton: {
    marginLeft: "auto",
    marginRight: 0
  }
}));

const StepPage = ({
  children,
  showPreviousButton,
  showNextButton,
  showDeleteButton,
  previousButtonProps,
  nextButtonProps,
  deleteButtonProps
}) => {
  const classes = useStyles();

  const previousBtnProp = {
    title: "Previous",
    icon: ArrowBack,
    onClick: null,
    ...previousButtonProps
  };

  const nextBtnProp = {
    title: "Save Changes & Next",
    icon: SaveIcon,
    onClick: null,
    ...nextButtonProps
  };

  const deleteBtnProps = {
    title: "Delete",
    icon: DeleteIcon,
    onClick: null,
    ...deleteButtonProps
  };

  return (
    <Box className={classes.form}>
      <div className={classes.content}>{children}</div>
      <Toolbar disableGutters className={classes.footer}>
        {showPreviousButton && (
          <Button
            variant="outlined"
            color="default"
            onClick={previousBtnProp.onClick}
            startIcon={<previousBtnProp.icon />}
            className={classes.button}
          >
            {previousBtnProp.title}
          </Button>
        )}
        {showNextButton && (
          <Button
            variant="outlined"
            color="primary"
            startIcon={<nextBtnProp.icon />}
            onClick={nextBtnProp.onClick}
            className={classes.button}
          >
            {nextBtnProp.title}
          </Button>
        )}
        {showDeleteButton && (
          <Button
            variant="contained"
            color="primary"
            className={clsx(classes.button, classes.deleteButton)}
            startIcon={<deleteBtnProps.icon />}
            onClick={deleteBtnProps.onClick}
          >
            {deleteBtnProps.title}
          </Button>
        )}
      </Toolbar>
    </Box>
  );
};

const buttonPropTypes = shape({
  title: string,
  icon: elementType,
  onClick: func
});

StepPage.propTypes = {
  children: oneOfType([arrayOf(element), element]),
  showPreviousButton: bool,
  showNextButton: bool,
  showDeleteButton: bool,
  previousButtonProps: buttonPropTypes,
  nextButtonProps: buttonPropTypes,
  deleteButtonProps: buttonPropTypes
};

StepPage.defaultProps = {
  children: null,
  showPreviousButton: true,
  showNextButton: true,
  showDeleteButton: true,
  previousButtonProps: null,
  nextButtonProps: null,
  deleteButtonProps: null
};

export default StepPage;
