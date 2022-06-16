import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { arrayOf, bool, func, node, oneOfType, string } from "prop-types";
import isEmpty from "lodash/isEmpty";
import CheckIcon from "@material-ui/icons/Check";
import CloseIcon from "@material-ui/icons/Close";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";
import useTheme from "@material-ui/core/styles/useTheme";

const useStyles = makeStyles(theme => ({
  progressContainer: {
    display: "flex",
    justifyContent: "center",
    marginTop: theme.spacing(1)
  }
}));

export default function ConfirmDialog({
  open,
  onYes,
  onNo,
  title,
  content,
  disabledButtons,
  isConfirmRequired,
  confirmTextLabel,
  confirmTextValue,
  noLabel,
  yesLabel,
  showLoading,
  ...props
}) {
  const classes = useStyles();
  const theme = useTheme();
  const [confirmText, setConfirmText] = useState({ value: confirmTextValue });

  const onConfirmTextChange = event => {
    setConfirmText({ value: event.target.value });
  };

  const onNoClick = () => {
    setConfirmText({ value: undefined });
    return onNo();
  };

  const onYesClick = () => onYes({ confirmText: confirmText.value });
  return (
    <Dialog open={open} onClose={onNo} data-testid="confirmPopup" {...props}>
      {title && <DialogTitle>{title}</DialogTitle>}
      {content && (
        <DialogContent>
          <DialogContentText>{content}</DialogContentText>
          {isConfirmRequired && (
            <TextField
              data-testid="confirmTextField"
              margin="normal"
              autoFocus
              required
              multiline
              rowsMax={3}
              fullWidth
              value={confirmText.value}
              label={confirmTextLabel}
              variant="outlined"
              onChange={onConfirmTextChange}
            />
          )}
          {showLoading && (
            <span className={classes.progressContainer}>
              <CircularProgress size={theme.spacing(4)} />
            </span>
          )}
        </DialogContent>
      )}
      <DialogActions>
        <Button
          data-testid="yesButton"
          onClick={onYesClick}
          startIcon={<CheckIcon color="inherit" />}
          color="primary"
          autoFocus
          disabled={disabledButtons || (isConfirmRequired && isEmpty(confirmText.value))}
        >
          {yesLabel}
        </Button>
        <Button
          data-testid="noButton"
          onClick={onNoClick}
          startIcon={<CloseIcon color="inherit" />}
          color="default"
          disabled={disabledButtons}
        >
          {noLabel}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

ConfirmDialog.propTypes = {
  open: bool.isRequired,
  onNo: func.isRequired,
  onYes: func.isRequired,
  disabledButtons: bool,
  showLoading: bool,
  isConfirmRequired: bool,
  confirmTextLabel: string,
  confirmTextValue: string,
  title: string,
  content: oneOfType([arrayOf(node), node]),
  noLabel: string,
  yesLabel: string
};

ConfirmDialog.defaultProps = {
  title: null,
  content: null,
  isConfirmRequired: false,
  showLoading: false,
  disabledButtons: false,
  confirmTextLabel: undefined,
  confirmTextValue: undefined,
  noLabel: "No",
  yesLabel: "Yes"
};
