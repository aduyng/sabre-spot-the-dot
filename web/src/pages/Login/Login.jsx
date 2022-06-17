import React from "react";
import { Redirect, useLocation } from "react-router-dom";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import Paper from "@material-ui/core/Paper";
import firebase from "firebase/app";
import "firebase/auth";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { useTranslation } from "react-i18next";
import Helmet from "react-helmet";
import { useSession } from "../../contexts/SessionContext";
import { useConfig } from "../../contexts/ConfigContext";
import FullscreenBackground from "../../components/FullscreenBackground/FullscreenBackground";

const useStyles = makeStyles(theme => {
  return {
    paper: {
      width: theme.spacing(38),
      zIndex: 2,
      backgroundColor: theme.palette.common.white,
      position: "relative",
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(42)
      },
      [theme.breakpoints.up("md")]: {
        width: theme.spacing(50)
      }
    },
    logo: {
      marginTop: theme.spacing(2),
      width: "80%"
    },
    logoContainer: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      marginBottom: theme.spacing(3)
    },
    prompt: {
      [theme.breakpoints.up("md")]: {
        fontWeight: "bold"
      }
    },
    version: {
      fontSize: "smaller"
    },
    slogan: {
      fontSize: ".75rem",
      [theme.breakpoints.up("sm")]: {
        fontSize: ".85rem"
      },
      [theme.breakpoints.up("md")]: {
        fontSize: ".90rem"
      },
      [theme.breakpoints.up("lg")]: {
        fontSize: "1rem"
      }
    },
    systemMessage: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: theme.spacing(1)
    }
  };
});

const uiConfig = {
  signInFlow: "popup",
  signInOptions: [
    {
      provider: firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      customParameters: {
        prompt: "select_account"
      }
    }
  ]
};

export default () => {
  const session = useSession();
  const location = useLocation();
  const classes = useStyles();
  const config = useConfig();
  const { t } = useTranslation();

  const cfg = {
    ...uiConfig,
    signInSuccessUrl:
      location.state && location.state.from
        ? `${location.state.from.pathname}${location.state.from.search}`
        : "/",
    siteName: "Sabre SpotTheDot"
  };

  if (session && session.user) {
    const redirectTo = (location.state && location.state.from) || {
      pathname: "/"
    };
    return <Redirect to={redirectTo} />;
  }

  return (
    <>
      <Helmet>
        <title>Sabre SpotTheDot</title>
      </Helmet>
      <FullscreenBackground src="/bg-large.jpg" />
      <Paper className={classes.paper} elevation={2}>
        <div className={classes.logoContainer}>
          <img src="/sabre-logo-red.svg" className={classes.logo} data-testid="logo" alt="Logo" />
        </div>
        <Typography severity="warning" className={classes.prompt} data-testid="prompt">
          {t("Please Sign In To Continue")}
        </Typography>
        <StyledFirebaseAuth uiConfig={cfg} firebaseAuth={firebase.auth()} />
        <Typography component="span" variant="body2" className={classes.version}>
          {`Sabre SpotTheDot, v${config.version} #${config.buildNumber}`}
        </Typography>
      </Paper>
    </>
  );
};
