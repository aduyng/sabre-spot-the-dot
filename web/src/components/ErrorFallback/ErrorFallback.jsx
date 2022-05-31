import React from "react";
import { shape, string } from "prop-types";
import ParticlesBg from "particles-bg";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Typography from "@material-ui/core/Typography";
import { useTranslation } from "react-i18next";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import HomeIcon from "@material-ui/icons/Home";
import CloseIcon from "@material-ui/icons/Close";
import CardActions from "@material-ui/core/CardActions";
import ExitToApp from "@material-ui/icons/ExitToApp";
import SuccessButton from "../SuccessButton";
import { useSession } from "../../contexts/SessionContext";
import DangerButton from "../DangerButton";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    height: "100%",
    width: "100%"
  },
  gridContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh",
    background: "transparent"
  },
  card: {
    minHeight: "80%"
  },
  details: {
    color: theme.palette.error.main
  },
  joking: {
    color: theme.palette.error.light,
    marginBottom: theme.spacing(2)
  },
  title: {
    color: theme.palette.text.primary
  },
  cardActions: {
    display: "block",
    [theme.breakpoints.up("sm")]: {
      display: "flex"
    }
  },
  button: {
    width: "100%",
    marginTop: theme.spacing(0.5),

    [theme.breakpoints.up("sm")]: {
      marginRight: theme.spacing(0.5)
    }
  },
  content: {
    minHeight: theme.spacing(33.5)
  }
}));

export default function ErrorFallback({ error }) {
  const classes = useStyles();
  const { t } = useTranslation();
  const session = useSession();

  // eslint-disable-next-line no-console
  console.error("FROM ERROR FALLBACK: ", error);

  const onHomeClick = event => {
    event.stopPropagation();
    const [, companyCode] = window.location.pathname.split("/");
    window.location.replace(`${window.location.origin}/${companyCode}`);
  };

  const onCloseClick = event => {
    event.stopPropagation();
    window.history.go(-1);
    window.location.reload();
  };

  const onLogoutClick = () => {
    if (session && session.logOut) {
      session.logOut();
    }
  };

  return (
    <div className={classes.root}>
      <Grid container spacing={0} className={classes.gridContainer}>
        <Grid item xs={11} md={6}>
          <Card className={classes.card}>
            <CardContent className={classes.content}>
              <Typography className={classes.title} color="textPrimary" gutterBottom variant="h4">
                {t("You broke it!")}
              </Typography>
              <Typography className={classes.joking} variant="h6">
                {t("Just kidding, something went wrong:")}
              </Typography>
              <Typography className={classes.details}>{error.message}</Typography>
            </CardContent>
            <CardActions disableSpacing className={classes.cardActions}>
              <SuccessButton
                className={classes.button}
                startIcon={<HomeIcon />}
                onClick={onHomeClick}
              >
                {t("Home")}
              </SuccessButton>
              <Button
                className={classes.button}
                variant="outlined"
                startIcon={<CloseIcon />}
                onClick={onCloseClick}
              >
                {t("Go Back")}
              </Button>
              <DangerButton
                className={classes.button}
                variant="outlined"
                startIcon={<ExitToApp />}
                onClick={onLogoutClick}
              >
                {t("Log Out")}
              </DangerButton>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
      <ParticlesBg type="color" bg />
    </div>
  );
}

ErrorFallback.propTypes = {
  error: shape({ message: string.isRequired }).isRequired
};
