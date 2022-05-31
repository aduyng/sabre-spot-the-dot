import React, { useMemo } from "react";
import { useSnackbar } from "notistack";
import { useQuery } from "@apollo/react-hooks";
import { Link } from "react-router-dom";
import makeStyles from "@material-ui/core/styles/makeStyles";
import { useTranslation } from "react-i18next";
import Card from "@material-ui/core/Card";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Avatar from "@material-ui/core/Avatar";
import AddIcon from "@material-ui/icons/Add";
import HomeIcon from "@material-ui/icons/Home";
import VpnKey from "@material-ui/icons/VpnKey";
import Page from "../../components/Page/Page";
import ProjectList from "./ProjectList";
import PageTitle from "../../components/PageTitle";
import SuccessButton from "../../components/SuccessButton";

import GET_PROJECTS from "./GET_PROJECTS.gql";
import getFirstKeyValue from "../../libs/getFirstKeyValue";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    display: "flex",
    width: "100%",
    "& .MuiCardHeader-action": {
      marginTop: "unset"
    }
  },
  avatarHeader: {
    backgroundColor: theme.palette.success.main
  },
  boxContent: {
    marginLeft: theme.spacing(2),
    width: "100%",
    "& .MuiCardContent-root": {
      paddingLeft: theme.spacing(0),
      paddingRight: theme.spacing(0)
    }
  },
  cardContent: {
    paddingTop: 0
  }
}));

export default function HomePage() {
  const { enqueueSnackbar } = useSnackbar();
  const classes = useStyles();
  const { t } = useTranslation();
  const isXsScreen = useMediaQuery(theme => theme.breakpoints.down("xs"));

  const { loading, error, data, refetch } = useQuery(GET_PROJECTS, {
    fetchPolicy: "network-only",
    errorPolicy: "all"
  });

  const { projects } = useMemo(() => ({ projects: getFirstKeyValue(data) }), [data]);

  if (error) {
    enqueueSnackbar(error.message, { variant: "error" });
    return null;
  }

  return (
    <Page loading={loading} data-testid="HomePage">
      <PageTitle
        crumbs={[
          {
            href: "/",
            label: t("Home"),
            Icon: HomeIcon
          }
        ]}
      />
      <div className={classes.root}>
        <Card className={classes.boxContent}>
          <CardHeader
            avatar={
              <Avatar className={classes.avatarHeader}>
                <VpnKey />
              </Avatar>
            }
            action={
              <SuccessButton
                variant="outlined"
                component={Link}
                to="/api-keys/new"
                data-testid="addNewApiKey"
              >
                <AddIcon />
                {!isXsScreen && t("Add API Key")}
              </SuccessButton>
            }
            title={t("API Keys")}
          />
          <CardContent className={classes.cardContent}>
            <ProjectList projects={projects} />
          </CardContent>
        </Card>
      </div>
    </Page>
  );
}
