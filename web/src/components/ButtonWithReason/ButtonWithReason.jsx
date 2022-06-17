import React from "react";
import Button from "@material-ui/core/Button";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import noop from "lodash/noop";
import Tooltip from "@material-ui/core/Tooltip";
import { func, node, string } from "prop-types";

const useStyles = makeStyles(() => ({
  withReason: {
    opacity: 0.75
  }
}));

export default function ButtonWithReason({
  startIcon,
  disabledReason,
  className,
  onClick,
  ...props
}) {
  const classes = useStyles();

  if (disabledReason) {
    return (
      <Tooltip title={disabledReason} placement="top">
        <Button
          startIcon={<ErrorOutlineIcon />}
          disableRipple
          disableFocusRipple
          {...props}
          onClick={noop}
          className={clsx(className, classes.withReason)}
        />
      </Tooltip>
    );
  }

  return <Button startIcon={startIcon} className={className} onClick={onClick} {...props} />;
}

ButtonWithReason.propTypes = {
  startIcon: node,
  disabledReason: string,
  className: string,
  onClick: func
};

ButtonWithReason.defaultProps = {
  startIcon: undefined,
  disabledReason: undefined,
  className: undefined,
  onClick: undefined
};
