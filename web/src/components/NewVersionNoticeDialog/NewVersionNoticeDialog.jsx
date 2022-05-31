import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import get from "lodash/get";
import useFetch from "use-http";
import { useSnackbar } from "notistack";
import makeStyles from "@material-ui/core/styles/makeStyles";
import { useConfig } from "../../contexts/ConfigContext";
import { NEW_VERSION_CHECK_INTERVAL } from "../../consts";
import SuccessButton from "../SuccessButton";
import WarningButton from "../WarningButton";

const useStyles = makeStyles(theme => ({
  successButton: {
    marginRight: theme.spacing(0.5)
  }
}));

export default function NewVersionNoticeDialog() {
  const { t } = useTranslation();
  const config = useConfig();
  const classes = useStyles();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const { get: getBuildJSON } = useFetch(
    `./build.json?_=${Date.now()}`,
    {
      cachePolicy: "no-cache",
      persist: false
    },
    []
  );

  const createOnDismissClickHandler = ({ key }) => () => closeSnackbar(key);

  const onRefreshClick = () => {
    window.location.reload();
  };

  const versionCheck = () => {
    return getBuildJSON().then(response => {
      const version = get(response, "version");
      if (version && config.version !== version) {
        const action = key => (
          <>
            <SuccessButton className={classes.successButton} onClick={onRefreshClick}>
              {t("Refresh")}
            </SuccessButton>
            <WarningButton variant="outlined" onClick={createOnDismissClickHandler({ key })}>
              {t("Dismiss")}
            </WarningButton>
          </>
        );
        enqueueSnackbar(
          t(
            `A new version "{{version}}" of this app is available. Please refresh to get the latest updates.`,
            { version: get(response, "version") }
          ),
          {
            action,
            persist: true,
            preventDuplicate: true,
            anchorOrigin: { horizontal: "center", vertical: "top" }
          }
        );
      }
    });
  };

  useEffect(() => {
    const interval = setInterval(() => {
      versionCheck();
    }, NEW_VERSION_CHECK_INTERVAL);
    return () => clearInterval(interval);
  });

  return null;
}
