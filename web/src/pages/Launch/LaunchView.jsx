import { useQuery } from "@apollo/react-hooks";
import { CircularProgress, Typography } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import makeStyles from "@material-ui/core/styles/makeStyles";
import AccountTreeIcon from "@material-ui/icons/AccountTree";
import FlightTakeoffIcon from "@material-ui/icons/FlightTakeoff";
import HomeIcon from "@material-ui/icons/Home";
import PhotoLibraryIcon from "@material-ui/icons/PhotoLibrary";
import WorkIcon from "@material-ui/icons/Work";
import { get } from "lodash";
import { useSnackbar } from "notistack";
import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import ScreenshotsView from "./ScreenshotsView";
import Page from "../../components/Page/Page";
import PageTitle from "../../components/PageTitle";
import formatDateTime from "../../libs/formatDateTime";
import GET_JOB from "../Job/GET_JOB.gql";
import GET_PROJECT from "../Project/GET_PROJECT.gql";
import GET_LAUNCH from "./GET_LAUNCH.gql";

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
  const { launchId, projectId, jobId } = useParams();
  const { data, error } = useQuery(GET_LAUNCH, {
    variables: { id: launchId }
  });
  const { data: projectData, pError } = useQuery(GET_PROJECT, {
    variables: { id: projectId }
  });
  const { data: jobData, jError } = useQuery(GET_JOB, {
    variables: { id: jobId }
  });

  const { project } = useMemo(
    () => ({
      project: get(projectData, "getProject")
    }),
    [projectData]
  );
  const { launch, screenshots } = useMemo(
    () => ({ launch: get(data, "getLaunch"), screenshots: get(data, "getScreenshots") }),
    [data]
  );
  const { job } = useMemo(() => ({ job: get(jobData, "getJob") }), [jobData]);
  if (!data || !projectData || !jobData) return null;
  if (error || pError || jError) {
    enqueueSnackbar(
      (error && error.message) || (pError && pError.message) || (jError && jError.message),
      { variant: "error" }
    );
    return null;
  }

  let status;
  if (launch.status === "PROCESSING") {
    status = <CircularProgress />;
  } else if (launch.status === "ERROR") {
    status = "Error";
  } else {
    status = (
      <Typography>
        {t("Completed At: {{completedAt}}", {
          completedAt: formatDateTime(launch.completedAt)
        })}
      </Typography>
    );
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
            href: `/projects/${projectId}/jobs`,
            label: project.name,
            Icon: AccountTreeIcon
          },
          {
            label: job.name,
            href: `/projects/${projectId}/jobs/${jobId}/launches`,
            Icon: WorkIcon
          },
          {
            label: launch.id,
            Icon: FlightTakeoffIcon,
            href: `/projects/${projectId}/jobs/${jobId}/launches/${launchId}/screenshots`
          }
        ]}
      />

      <div className={classes.root}>
        <Card className={classes.boxContent}>
          <CardHeader
            avatar={
              <Avatar className={classes.avatarHeader}>
                <PhotoLibraryIcon />
              </Avatar>
            }
            data-testid="projects-header"
            title={t("Screenshots for Launch #{{launch}}", { launch: launch.id })}
            action={
              <>
                <Typography>{t("Status: {{status}}", { status: launch.status })}</Typography>
                <Typography>
                  {t("Started At: {{startedAt}}", { startedAt: formatDateTime(launch.startedAt) })}
                </Typography>
                {status}
              </>
            }
          />

          <CardContent>
            <ScreenshotsView screenshots={screenshots} />
          </CardContent>
        </Card>
      </div>
    </Page>
  );
}
