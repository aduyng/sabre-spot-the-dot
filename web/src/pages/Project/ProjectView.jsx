import { useQuery } from "@apollo/react-hooks";
import { Typography } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import { makeStyles } from "@material-ui/core/styles";
import AccountTreeIcon from "@material-ui/icons/AccountTree";
import HomeIcon from "@material-ui/icons/Home";
import WorkIcon from "@material-ui/icons/Work";
import { get } from "lodash";
import { useSnackbar } from "notistack";
import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import Page from "../../components/Page/Page";
import PageLoader from "../../components/PageLoader";
import PageTitle from "../../components/PageTitle";
import GET_PROJECT from "./GET_PROJECT.gql";
import JobsList from "./JobsList";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    display: "flex",
    width: "100%"
  },
  avatarHeader: {
    backgroundColor: theme.palette.success.main
  },
  boxContent: {
    marginLeft: theme.spacing(2),
    width: "100%",
    "& .MuiCardContent-root": {
      paddingLeft: theme.spacing(0),
      paddingRight: theme.spacing(4)
    }
  },
  toolbar: {
    display: "block",
    padding: theme.spacing(0),
    [theme.breakpoints.up("sm")]: {
      display: "flex"
    }
  },
  button: {
    width: "100%",
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1),
    [theme.breakpoints.up("sm")]: {
      width: "unset",
      marginTop: "unset"
    }
  }
}));

export default function ProjectView() {
  const classes = useStyles();
  const { t } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();
  const { projectId } = useParams();
  const { data, error } = useQuery(GET_PROJECT, {
    variables: { id: projectId }
  });
  const { jobs, project } = useMemo(() => {
    return { jobs: get(data, "getJobs"), project: get(data, "getProject") };
  }, [data]);
  if (!data) return <PageLoader />;
  if (error) {
    enqueueSnackbar(error.message, { variant: "error" });
    return null;
  }
  return (
    <Page>
      <PageTitle
        crumbs={[
          {
            href: `/`,
            label: t("Home"),
            Icon: HomeIcon
          },
          {
            label: project.name,
            Icon: AccountTreeIcon
          }
        ]}
      />

      <div className={classes.root}>
        <Card className={classes.boxContent}>
          <CardHeader
            avatar={
              <Avatar className={classes.avatarHeader}>
                <WorkIcon />
              </Avatar>
            }
            data-testid="projects-header"
            title={
              <Typography variant="h3">
                {t("Jobs for {{project}}", { project: project.name })}
              </Typography>
            }
            disableTypography
          />
          <CardContent>
            <JobsList jobs={jobs} />
          </CardContent>
        </Card>
      </div>
    </Page>
  );
}
