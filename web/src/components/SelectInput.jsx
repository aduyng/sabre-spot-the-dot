import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import { makeStyles } from "@material-ui/core/styles";
import { string, number, func, arrayOf, shape, oneOfType, bool } from "prop-types";
import map from "lodash/map";
import isEmpty from "lodash/isEmpty";
import toString from "lodash/toString";

const useStyles = makeStyles(theme => ({
  formControl: {
    minWidth: theme.spacing(15),
    width: "100%"
  }
}));

const SelectioForm = ({
  label,
  name,
  onChange,
  value,
  itemList,
  required,
  error,
  helperText,
  disabled,
  noneItemDisplay,
  noneItemValue,
  menuItemProps,
  textFieldProps
}) => {
  const classes = useStyles();
  const [currentValue, setCurrentValue] = useState(isEmpty(value) ? "" : value);
  const onChangeSelectionHandler = event => {
    const { value: eValue } = event.target;
    setCurrentValue(eValue);
    onChange({ [name]: eValue });
  };

  if (isEmpty(itemList)) {
    return null;
  }

  return (
    <TextField
      {...textFieldProps}
      id={`select-${name}`}
      required={required}
      variant="outlined"
      select
      label={label}
      value={currentValue}
      onChange={onChangeSelectionHandler}
      className={classes.formControl}
      error={error}
      helperText={helperText}
      disabled={disabled}
    >
      {noneItemValue && (
        <MenuItem value={noneItemValue}>
          <em>{noneItemDisplay}</em>
        </MenuItem>
      )}
      {map(itemList, item => (
        <MenuItem {...menuItemProps} key={toString(item.code)} value={item.code}>
          {item.name}
        </MenuItem>
      ))}
    </TextField>
  );
};

SelectioForm.propTypes = {
  label: string.isRequired,
  name: string.isRequired,
  value: oneOfType([string, number, bool]),
  onChange: func,
  itemList: oneOfType([
    arrayOf(
      shape({
        code: oneOfType([string, number, bool]),
        name: string
      })
    ),
    shape({
      code: oneOfType([string, number, bool]),
      name: string
    })
  ]),
  required: bool,
  error: bool,
  helperText: string,
  disabled: bool,
  noneItemDisplay: string,
  noneItemValue: string,
  menuItemProps: shape({ "data-testid": string }),
  textFieldProps: shape({ "data-testid": string })
};

SelectioForm.defaultProps = {
  value: "",
  onChange: null,
  itemList: [],
  required: true,
  error: false,
  helperText: "",
  disabled: false,
  noneItemDisplay: undefined,
  noneItemValue: undefined,
  menuItemProps: undefined,
  textFieldProps: undefined
};

export default SelectioForm;
