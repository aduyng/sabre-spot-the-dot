import React, { useCallback, useMemo } from "react";
import { useHistory } from "react-router-dom";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Helmet from "react-helmet";
import { useTranslation } from "react-i18next";
import Typography from "@material-ui/core/Typography";
import { string, node, arrayOf, oneOfType, bool, shape } from "prop-types";
import Button from "@material-ui/core/Button";
import ArrowBack from "@material-ui/icons/ArrowBack";
import Grid from "@material-ui/core/Grid";
import CircularProgress from "@material-ui/core/CircularProgress";
import last from "lodash/last";
import isEmpty from "lodash/isEmpty";
import CloseIcon from "@material-ui/icons/Close";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Breadcrumbs from "./Breadcrumbs/Breadcrumbs";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    paddingBottom: theme.spacing(1)
  },
  nameAndButtons: {
    display: "flex",
    flexDirection: "row"
  },
  buttons: {
    flexGrow: 1,
    textAlign: "right",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    "& .MuiButton-root + .MuiButton-root": {
      marginLeft: theme.spacing(0.5)
    },
    "& .MuiButtonGroup-root + button": {
      marginLeft: theme.spacing(0.5)
    },
    "& .MuiButton-outlined": {
      marginLeft: theme.spacing(0.5)
    }
  },
  name: {
    flexGrow: 4
  },
  backButtons: {
    flexGrow: 1,
    textAlign: "right",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    "& .MuiButton-root + .MuiButton-root": {
      marginLeft: theme.spacing(0.5)
    },
    "& .MuiButtonGroup-root + button": {
      marginLeft: theme.spacing(0.5)
    },
    "& .MuiButton-outlined": {
      marginBottom: theme.spacing(0.5),
      marginLeft: theme.spacing(0.5)
    }
  }
}));

export default function PageTitle({
  name,
  buttons,
  loading = false,
  showBackButton = true,
  crumbs
}) {
  const classes = useStyles();
  const history = useHistory();
  const { t } = useTranslation();
  const isSmScreen = useMediaQuery(theme => theme.breakpoints.down("xs"));
  const isLgScreen = useMediaQuery(theme => theme.breakpoints.up("sm"));
  const onBackClick = useCallback(() => {
    if (history.length > 1) {
      return history.goBack();
    }
    return window.close();
  }, [history]);

  const pageName = useMemo(() => {
    if (isEmpty(crumbs)) {
      return name;
    }

    return last(crumbs).label;
  }, [name, crumbs]);

  return (
    <div className={classes.root}>
      <Helmet>
        <title>
          {pageName}
          :: Sabre SpotTheDot
        </title>
      </Helmet>
      <Grid container className={classes.nameAndButtons}>
        <Grid item xs={8} sm={7} md={8}>
          {isEmpty(crumbs) && pageName && (
            <Typography variant="h6" gutterBottom className={classes.name}>
              {pageName}
            </Typography>
          )}
          {!isEmpty(crumbs) && <Breadcrumbs crumbs={crumbs} />}
        </Grid>

        {loading && (
          <Grid item sm={1} md={1}>
            <CircularProgress color="secondary" />
          </Grid>
        )}
        {!loading && isSmScreen && showBackButton && (
          <Grid item xs={4} className={classes.backButtons}>
            {showBackButton && (
              <Button
                data-testid="backButton"
                variant="outlined"
                onClick={onBackClick}
                key="back"
                startIcon={history.length > 1 ? <ArrowBack /> : <CloseIcon />}
              >
                {t(history.length > 1 ? "Back" : "Close")}
              </Button>
            )}
          </Grid>
        )}
        {(buttons || showBackButton) && (
          <Grid item xs={12} sm={5} md={4} className={classes.buttons}>
            {buttons}
            {!loading && isLgScreen && showBackButton && (
              <Button
                data-testid="backButton"
                variant="outlined"
                onClick={onBackClick}
                key="back"
                startIcon={history.length > 1 ? <ArrowBack /> : <CloseIcon />}
              >
                {t(history.length > 1 ? "Back" : "Close")}
              </Button>
            )}
          </Grid>
        )}
      </Grid>
    </div>
  );
}

PageTitle.propTypes = {
  name: string,
  buttons: oneOfType([arrayOf(node), node]),
  loading: bool,
  showBackButton: bool,
  crumbs: arrayOf(
    shape({
      href: string,
      method: string,
      label: string.isRequired
    })
  )
};

PageTitle.defaultProps = {
  name: undefined,
  buttons: undefined,
  loading: false,
  showBackButton: true,
  crumbs: undefined
};
