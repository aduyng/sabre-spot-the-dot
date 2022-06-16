/* eslint-disable import/extensions */
import React, { useCallback, useState } from "react";
import { string, func, bool, number, shape, arrayOf } from "prop-types";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import { useTranslation } from "react-i18next";
import isLength from "validator/lib/isLength";
import trim from "lodash/trim";
import map from "lodash/map";
import every from "lodash/every";
// eslint-disable-next-line import/no-unresolved
import PaymentModeAliasForm from "./PaymentModeAliasForm/PaymentModeAliasForm";

const isNaN = require("lodash/isNaN");
const toNumber = require("lodash/toNumber");

const useStyles = makeStyles(theme => ({
  form: {
    padding: theme.spacing(2)
  }
}));

export default function PaymentModeForm({
  code: initialCode,
  name: initialName,
  premiumMultiplier: initialPremiumMultiplier,
  aliases,
  onChange
}) {
  const { t } = useTranslation();

  const codeHelperText = t("Enter the code of the payment mode");
  const nameHelperText = t("Enter the name of the payment mode");
  const premiumMultiplierHelperText = t("Enter the premium multiplier of the payment mode");
  const classes = useStyles();

  const [code, setCode] = useState({ value: initialCode || "", helperText: codeHelperText });
  const [name, setName] = useState({ value: initialName || "", helperText: nameHelperText });
  const [premiumMultiplier, setPremiumMultiplier] = useState({
    value: initialPremiumMultiplier || 12,
    helperText: nameHelperText
  });
  const [paymentAliasList, setPaymentAliasList] = useState(map(aliases, alias => alias.alias));

  const isCodeValid = value => isLength(value, { min: 1, max: 255 });
  const isNameValid = value => isLength(value, { min: 1, max: 255 });
  const isMultiplierValid = value => !isNaN(toNumber(value)) && toNumber(value) > 0;
  const isAliasesValid = list => every(list, item => isLength(item, { min: 2, max: 40 }));
  const triggerChange = useCallback(
    changes => {
      const values = {
        code: code.value,
        name: name.value,
        premiumMultiplier: parseInt(premiumMultiplier.value, 10),
        aliases: paymentAliasList,
        ...changes
      };
      return onChange({
        values,
        hasError:
          !isCodeValid(values.code) ||
          !isNameValid(values.name) ||
          !isAliasesValid(values.aliases) ||
          !isMultiplierValid(values.premiumMultiplier)
      });
    },
    [code, name, premiumMultiplier, onChange, paymentAliasList]
  );

  const onPaymentModeAliasChange = values => {
    setPaymentAliasList(values.aliases);
    triggerChange({ aliases: values.aliases });
  };

  const onMultiplierChange = event => {
    const error = !isMultiplierValid(event.target.value);

    setPremiumMultiplier({
      value: event.target.value,
      error,
      helperText: error
        ? t("The multiplier must be a number greater than 0!")
        : premiumMultiplierHelperText
    });
    triggerChange({ premiumMultiplier: parseInt(trim(event.target.value), 10) });
  };
  const onCodeChange = event => {
    const error = !isCodeValid(event.target.value);

    setCode({
      value: event.target.value,
      error,
      helperText: error
        ? t("The code must be in between {{min}} and {{max}} characters!", { min: 1, max: 255 })
        : codeHelperText
    });
    triggerChange({ code: trim(event.target.value) });
  };
  const onNameChange = event => {
    const error = !isNameValid(event.target.value);

    setName({
      value: event.target.value,
      error,
      helperText: error
        ? t("The name must be in between {{min}} and {{max}} characters!", { min: 1, max: 255 })
        : nameHelperText
    });
    triggerChange({ name: trim(event.target.value) });
  };

  return (
    <form className={classes.form} noValidate autoComplete="off">
      <TextField
        margin="normal"
        label={t("Code")}
        required
        variant="outlined"
        fullWidth
        onChange={onCodeChange}
        inputProps={{ "data-testid": "code" }}
        {...code}
      />
      <TextField
        margin="normal"
        label={t("Name")}
        required
        variant="outlined"
        fullWidth
        onChange={onNameChange}
        inputProps={{ "data-testid": "name" }}
        {...name}
      />

      <TextField
        type="number"
        margin="normal"
        label={t("Premium Multiplier")}
        required
        variant="outlined"
        fullWidth
        onChange={onMultiplierChange}
        inputProps={{ "data-testid": "premiumMultiplier" }}
        {...premiumMultiplier}
      />
      <PaymentModeAliasForm aliases={aliases} onChange={onPaymentModeAliasChange} />
    </form>
  );
}

PaymentModeForm.propTypes = {
  code: string,
  name: string,
  premiumMultiplier: number,
  isEditing: bool,
  onChange: func.isRequired,
  aliases: arrayOf(
    shape({
      id: number,
      alias: string
    })
  )
};

PaymentModeForm.defaultProps = {
  name: "",
  code: "",
  premiumMultiplier: 12,
  isEditing: false,
  aliases: []
};
