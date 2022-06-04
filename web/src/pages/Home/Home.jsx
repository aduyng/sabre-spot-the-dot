import React, { useMemo } from "react";
import { useSnackbar } from "notistack";
import { useQuery } from "@apollo/react-hooks";
import makeStyles from "@material-ui/core/styles/makeStyles";
import { useTranslation } from "react-i18next";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import AccountTreeIcon from "@material-ui/icons/AccountTree";
import CardContent from "@material-ui/core/CardContent";
import Avatar from "@material-ui/core/Avatar";
import HomeIcon from "@material-ui/icons/Home";
import Typography from "@material-ui/core/Typography";
import Page from "../../components/Page/Page";
import ProjectList from "./ProjectList";
import PageTitle from "../../components/PageTitle";
import GET_PROJECTS from "./GET_PROJECTS.gql";
import getFirstKeyValue from "../../libs/getFirstKeyValue";
import PageLoader from "../../components/PageLoader";

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

  const { loading, error, data } = useQuery(GET_PROJECTS, {
    fetchPolicy: "network-only",
    errorPolicy: "all"
  });

  const { projects } = useMemo(() => ({ projects: getFirstKeyValue(data) }), [data]);
  if (error) {
    enqueueSnackbar(error.message, { variant: "error" });
    return null;
  }
  if (!data) {
    return <PageLoader />;
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
                <AccountTreeIcon />
              </Avatar>
            }
            title={<Typography variant="h3">{t("Projects")}</Typography>}
            disableTypography
          />
          <CardContent className={classes.cardContent}>
            <ProjectList projects={projects} />
          </CardContent>
        </Card>
      </div>
    </Page>
  );
}
