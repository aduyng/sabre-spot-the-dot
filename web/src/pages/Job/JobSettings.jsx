import React, { useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import Link from "@material-ui/core/Link";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import FormControl from "@material-ui/core/FormControl";
import { useTranslation } from "react-i18next";
import { RgbColorPicker } from "react-colorful";
import { useSnackbar } from "notistack";
import clamp from "lodash/clamp";
import map from "lodash/map";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import startCase from "lodash/startCase";
import get from "lodash/get";
import clsx from "clsx";
import Slider from "@material-ui/core/Slider";
import { shape, string, number } from "prop-types";

import { useParams } from "react-router-dom";
import UPDATE_CONFIG from "./UPDATE_CONFIG.gql";

const useStyles = makeStyles(theme => ({
  container: {
    padding: theme.spacing(2)
  },
  itemCenter: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    gap: theme.spacing(2)
  },
  topPadding: {
    paddingTop: theme.spacing(2)
  },
  h6: {
    font: theme.typography.h6
  }
}));

const colors = [
  { name: "Red", key: "r" },
  { name: "Green", key: "g" },
  { name: "Blue", key: "b" }
];

const diffIgnore = ["nothing", "less", "colors", "antialiasing", "alpha"];

const colorMethods = [
  "flat",
  "movement",
  "flatDifferenceIntensity",
  "movementDifferenceIntensity",
  "diffOnly"
];

const getColorFromConfig = config => {
  return {
    r: get(config, ["output", "errorColor", "red"]),
    g: get(config, ["output", "errorColor", "green"]),
    b: get(config, ["output", "errorColor", "blue"])
  };
};

export default function JobSettings({ config }) {
  const { enqueueSnackbar } = useSnackbar();
  const { t } = useTranslation();
  const classes = useStyles();
  const [saveConfig] = useMutation(UPDATE_CONFIG);
  const { jobId, projectId } = useParams();
  const [color, setColor] = useState(() => getColorFromConfig(config));
  const [values, setValues] = useState(() => getColorFromConfig(config));
  const [ignoreOption, setIgnoreOption] = useState(() => get(config, "ignore"));
  const [colorMethod, setColorMethod] = useState(() => get(config, ["output", "errorType"]));
  const [transparency, setTransparency] = useState(
    () => get(config, ["output", "transparency"]) * 100
  );

  const createColorChangeHandler = key => e => {
    const { value } = e.target;
    setColor(c => ({ ...c, [key]: clamp(value, 0, 255) || 0 }));
    setValues(v => ({ ...v, [key]: value || 0 }));
  };

  const colorPickerHandler = value => {
    setColor(value);
    setValues(value);
  };

  const onBlur = () => {
    setValues(v => ({
      ...Object.keys(v).reduce((obj, key) => ({ ...obj, [key]: clamp(v[key], 0, 255) }), {})
    }));
  };

  const handleIgnoreOptionChange = e => {
    setIgnoreOption(e.target.value);
  };

  const handleColorMethodChange = e => {
    setColorMethod(e.target.value);
  };

  const handleTransparencyChange = (_, value) => {
    setTransparency(value);
  };

  const handleResetDefaults = () => {
    setIgnoreOption(diffIgnore[0]);
    setColorMethod(colorMethods[0]);
    setColor({ r: 255, g: 0, b: 255 });
    setValues({ r: 255, g: 0, b: 255 });
    setTransparency(100);
  };

  const handleSave = async () => {
    saveConfig({
      variables: {
        jobId,
        projectId,
        config: {
          overlay: `rgb(${color.r}, ${color.g}, ${color.b})`,
          ignoreMethod: ignoreOption,
          errorMethod: colorMethod,
          transparency
        }
      }
    })
      .then(() => {
        enqueueSnackbar("New config successfully saved!", { variant: "success" });
      })
      .catch(err => {
        enqueueSnackbar(`Error saving config: ${err && err.message}`, { variant: "error" });
      });
  };

  return (
    <Grid container className={classes.container}>
      <Grid item xs={2} className={classes.itemCenter}>
        <Typography align="center" variant="h6" component="label" htmlFor="color-picker-input">
          Overlay Color
        </Typography>
        <RgbColorPicker color={color} onChange={colorPickerHandler} />
      </Grid>
      <Grid item xs={1} className={clsx(classes.itemCenter, classes.topPadding)}>
        {map(colors, ({ name, key }) => (
          <ClickAwayListener onClickAway={onBlur}>
            <TextField
              label={t("{{name}}", { name })}
              value={values[key]}
              onChange={createColorChangeHandler(key)}
              key={key}
            />
          </ClickAwayListener>
        ))}
      </Grid>
      <Grid item xs={1} className={clsx(classes.itemCenter, classes.topPadding)}>
        <Typography component="label" htmlFor="transparency-slider">
          Transparency
        </Typography>
        <Typography component="label" htmlFor="transparency-slider">
          {`${transparency}%`}
        </Typography>
        <Slider
          id="transparency-slider"
          orientation="vertical"
          value={transparency}
          min={0}
          max={100}
          onChange={handleTransparencyChange}
        />
      </Grid>
      <Grid item xs={3} className={clsx(classes.itemCenter, classes.topPadding)}>
        <FormControl>
          <FormControlLabel
            label="Ignore Method"
            classes={{
              label: classes.h6
            }}
            labelPlacement="top"
            control={
              <RadioGroup
                name="ignore method"
                value={ignoreOption}
                onChange={handleIgnoreOptionChange}
              >
                {map(diffIgnore, option => (
                  <FormControlLabel
                    value={option}
                    key={option}
                    control={<Radio />}
                    label={`Ignore ${startCase(option)}`}
                  />
                ))}
              </RadioGroup>
            }
          />
        </FormControl>
      </Grid>
      <Grid item sx={3} className={clsx(classes.itemCenter, classes.topPadding)}>
        <FormControl>
          <FormControlLabel
            labelPlacement="top"
            label="Color Method"
            control={
              <RadioGroup
                name="color method"
                value={colorMethod}
                onChange={handleColorMethodChange}
              >
                {map(colorMethods, option => (
                  <FormControlLabel
                    value={option}
                    key={option}
                    control={<Radio />}
                    label={startCase(option)}
                  />
                ))}
              </RadioGroup>
            }
          />
        </FormControl>
      </Grid>
      <Grid item xs={2}>
        <Box className={clsx(classes.itemCenter, classes.topPadding)}>
          <Button variant="contained" color="secondary" fullWidth onClick={handleResetDefaults}>
            Reset Defaults
          </Button>
          <Button variant="contained" color="primary" fullWidth onClick={handleSave}>
            Save
          </Button>
          <Link target="_blank" href="http://rsmbl.github.io/Resemble.js/">
            What are these?
          </Link>
        </Box>
      </Grid>
    </Grid>
  );
}

JobSettings.propTypes = {
  config: shape({
    ignore: string.isRequired,
    output: shape({
      errorColor: shape({
        red: number.isRequired,
        green: number.isRequired,
        blue: number.isRequired
      }),
      transparency: number.isRequired,
      errorType: string.isRequired
    })
  }).isRequired
};
