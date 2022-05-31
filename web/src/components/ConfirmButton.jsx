import React, { useState } from "react";
import { bool, func, shape, string } from "prop-types";
import makeStyles from "@material-ui/core/styles/makeStyles";
import clsx from "clsx";
import ConfirmDialog from "./ConfirmDialog";
import ButtonWithReason from "./ButtonWithReason/ButtonWithReason";

const useStyles = makeStyles(theme => ({
  button: {
    marginRight: theme.spacing(1),
    "&:disabled": {
      background: theme.palette.action.disabledBackground
    }
  }
}));

const ConfirmButton = ({
  buttonLabel,
  buttonClassName,
  buttonProps,
  confirmDialogTitle,
  confirmDialogContent,
  confirmDialogProps,
  onProceed,
  onCancel,
  isProcessing,
  isProcessingInBackground
}) => {
  const classes = useStyles();

  const [isConfirming, setIsConfirming] = useState(false);
  const onButtonClick = () => setIsConfirming(true);
  const onNo = () => {
    setIsConfirming(false);
    if (onCancel) {
      onCancel();
    }
  };

  const onYes = args => {
    if (isProcessingInBackground) {
      setIsConfirming(false);
    }
    Promise.resolve(onProceed(args)).then(() => setIsConfirming(false));
  };

  return (
    <>
      <ButtonWithReason
        variant="outlined"
        className={clsx(classes.button, buttonClassName)}
        {...buttonProps}
        onClick={onButtonClick}
      >
        {buttonLabel}
      </ButtonWithReason>

      {isConfirming && (
        <ConfirmDialog
          {...confirmDialogProps}
          disableBackdropClick
          title={confirmDialogTitle}
          showLoading={isProcessing}
          content={confirmDialogContent}
          disabledButtons={isProcessing}
          open
          onNo={onNo}
          onYes={onYes}
        />
      )}
    </>
  );
};

ConfirmButton.propTypes = {
  buttonLabel: string.isRequired,
  buttonClassName: string,
  confirmDialogTitle: string.isRequired,
  confirmDialogContent: string.isRequired,
  buttonProps: shape({}),
  confirmDialogProps: shape({}),
  onProceed: func.isRequired,
  onCancel: func,
  isProcessing: bool,
  isProcessingInBackground: bool
};

ConfirmButton.defaultProps = {
  buttonProps: undefined,
  confirmDialogProps: undefined,
  onCancel: undefined,
  buttonClassName: undefined,
  isProcessing: false,
  isProcessingInBackground: false
};

export default ConfirmButton;
