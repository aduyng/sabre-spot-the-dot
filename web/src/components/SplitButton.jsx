import React, { useMemo } from "react";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { arrayOf, string, shape, func, element, bool, oneOfType } from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import isEmpty from "lodash/isEmpty";
import clsx from "clsx";
import { Link } from "react-router-dom";
import partition from "lodash/partition";

const useStyles = makeStyles(theme => ({
  root: {
    "&.hasOthers > button:first-child": {
      marginRight: "0 !important",
      borderRight: "none !important"
    },
    "&.hasOthers > button:nth-child(2)": {
      marginLeft: "0 !important",
      borderLeft: "none !important"
    }
  },
  dropdownMenu: {
    zIndex: theme.zIndex.tooltip
  },
  listItemIcon: {
    minWidth: theme.spacing(4)
  }
}));

export default function SplitButton({
  options,
  onClick,
  fullWidth,
  size,
  variant,
  color,
  className,
  disabled,
  splitButtonProps,
  placement,
  defaultId
}) {
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);
  const classes = useStyles();

  const createMenuItemClickHandler = ({ option }) => e => {
    e.stopPropagation();
    setOpen(false);
    return onClick && onClick({ option });
  };

  const onToggle = e => {
    e.stopPropagation();
    setOpen(prevOpen => !prevOpen);
  };

  const onClickAway = event => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  const [firstOption, ...restOptions] = useMemo(() => {
    if (!defaultId) {
      return options;
    }
    const groups = partition(options, option => option.id === defaultId);
    return [...groups[0], ...groups[1]];
  }, [options, defaultId]);
  return (
    <>
      <ButtonGroup
        fullWidth={fullWidth}
        variant={variant}
        disabled={disabled}
        color={color}
        className={clsx(classes.root, className, { hasOthers: !isEmpty(restOptions) })}
        ref={anchorRef}
        size={size}
      >
        <Button
          data-testid={firstOption.id || "splitButton"}
          variant={variant}
          onClick={createMenuItemClickHandler({ option: firstOption })}
          color={color}
          startIcon={firstOption.icon && <firstOption.icon />}
          to={firstOption.href}
          component={firstOption.href ? Link : undefined}
          disabled={firstOption.disabled}
          {...splitButtonProps}
        >
          {firstOption.label}
        </Button>

        {restOptions.length > 0 && (
          <Button variant={variant} onClick={onToggle} color={color} data-testid="dropdownButton">
            <ArrowDropDownIcon />
          </Button>
        )}
      </ButtonGroup>
      {restOptions.length > 0 && (
        <Popper
          open={open}
          anchorEl={anchorRef.current}
          transition
          disablePortal
          className={classes.dropdownMenu}
          placement={placement}
        >
          {({ TransitionProps }) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin: placement === "bottom" ? "center top" : "center bottom"
              }}
            >
              <Paper>
                <ClickAwayListener onClickAway={onClickAway}>
                  <MenuList>
                    {restOptions.map(
                      option =>
                        option && (
                          <MenuItem
                            dense={size === "small"}
                            data-testid={option.dataTestId}
                            className={className}
                            key={option.id}
                            onClick={createMenuItemClickHandler({ option })}
                            disabled={option.disabled}
                          >
                            {option.icon && (
                              <ListItemIcon className={classes.listItemIcon}>
                                <option.icon />
                              </ListItemIcon>
                            )}
                            <ListItemText primary={option.label} />
                          </MenuItem>
                        )
                    )}
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      )}
    </>
  );
}

SplitButton.propTypes = {
  options: arrayOf(
    shape({
      id: string.isRequired,
      label: oneOfType([string.isRequired, element.isRequired])
    })
  ).isRequired,
  onClick: func,
  size: string,
  variant: string,
  color: string,
  className: string,
  disabled: bool,
  fullWidth: bool,
  splitButtonProps: shape({ "data-testid": string }),
  placement: string,
  defaultId: string
};

SplitButton.defaultProps = {
  size: "small",
  onClick: undefined,
  variant: "contained",
  color: "primary",
  className: null,
  disabled: false,
  fullWidth: false,
  splitButtonProps: undefined,
  placement: undefined,
  defaultId: undefined
};
