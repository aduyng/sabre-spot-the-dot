import { useQuery } from "@apollo/react-hooks";
import Avatar from "@material-ui/core/Avatar";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import makeStyles from "@material-ui/core/styles/makeStyles";
import AccountTreeIcon from "@material-ui/icons/AccountTree";
import FlightTakeoffIcon from "@material-ui/icons/FlightTakeoff";
import HomeIcon from "@material-ui/icons/Home";
import WorkIcon from "@material-ui/icons/Work";
import { get } from "lodash";
import { useSnackbar } from "notistack";
import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import GET_PROJECT from "../Project/GET_PROJECT.gql";
import Page from "../../components/Page/Page";
import PageTitle from "../../components/PageTitle";
import GET_JOB from "./GET_JOB.gql";
import LaunchesList from "./LaunchesList";

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

export default function JobView() {
  const classes = useStyles();
  const { t } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();
  const { jobId, projectId } = useParams();
  const { data, error } = useQuery(GET_JOB, {
    variables: { id: jobId }
  });
  const { data: projectData, error: pError } = useQuery(GET_PROJECT, {
    variables: { id: projectId }
  });
  const { launches, job } = useMemo(
    () => ({ launches: get(data, "getLaunches"), job: get(data, "getJob") }),
    [data]
  );
  const { project } = useMemo(
    () => ({
      project: get(projectData, "getProject")
    }),
    [projectData]
  );
  if (!data || !projectData) return null;
  if (error) {
    enqueueSnackbar((error && error.message) || (pError && pError.message), { variant: "error" });
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
            href: `/projects/${project.id}/jobs`,
            label: project.name,
            Icon: AccountTreeIcon
          },
          {
            label: job.name,
            Icon: WorkIcon
          }
        ]}
      />

      <div className={classes.root}>
        <Card className={classes.boxContent}>
          <CardHeader
            avatar={
              <Avatar className={classes.avatarHeader}>
                <FlightTakeoffIcon />
              </Avatar>
            }
            data-testid="projects-header"
            title={t("Launches for {{project}}", { project: job.name })}
          />
          <CardContent>
            <LaunchesList launches={launches} />
          </CardContent>
        </Card>
      </div>
    </Page>
  );
}
