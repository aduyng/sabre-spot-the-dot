import { useQuery } from "@apollo/react-hooks";
import { makeStyles } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import AccountTreeIcon from "@material-ui/icons/AccountTree";
import FlightTakeoffIcon from "@material-ui/icons/FlightTakeoff";
import SettingsIcon from "@material-ui/icons/Settings";
import HomeIcon from "@material-ui/icons/Home";
import WorkIcon from "@material-ui/icons/Work";
import get from "lodash/get";
import { useSnackbar } from "notistack";
import React, { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton/";
import Box from "@material-ui/core/Box";
import Collapse from "@material-ui/core/Collapse";
import Page from "../../components/Page/Page";
import PageTitle from "../../components/PageTitle";
import GET_JOB from "./GET_JOB.gql";
import LaunchesList from "./LaunchesList";
import PageLoader from "../../components/PageLoader";
import JobSettings from "./JobSettings";

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
      paddingRight: theme.spacing(0)
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
  },
  gearBox: {
    display: "flex",
    justifyContent: "flex-end",
    gap: theme.spacing(1),
    alignItems: "center",
    marginTop: theme.spacing(1)
  }
}));

export default function JobView() {
  const classes = useStyles();
  const { t } = useTranslation();
  const [collapse, setCollapse] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const { jobId, projectId } = useParams();
  const { data, error } = useQuery(GET_JOB, {
    variables: { id: jobId, projectId }
  });
  const { launches, job, project, config } = useMemo(
    () => ({
      launches: get(data, "getLaunches"),
      job: get(data, "getJob"),
      project: get(data, "getProject"),
      config: get(data, "getResembleConfig")
    }),
    [data]
  );

  const toggleCollapse = () => setCollapse(c => !c);
  if (error) {
    enqueueSnackbar(error && error.message, { variant: "error" });
    return null;
  }
  if (!data) return <PageLoader />;
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
            title={
              <Typography variant="h3">{t("Builds for {{job}}", { job: job.name })}</Typography>
            }
            action={
              <Box className={classes.gearBox}>
                {config && (
                  <>
                    <Typography>Job Settings</Typography>
                    <IconButton onClick={toggleCollapse}>
                      <SettingsIcon />
                    </IconButton>
                  </>
                )}
              </Box>
            }
            disableTypography
          />
          <CardContent>
            <Collapse in={collapse}>
              <JobSettings config={config} />
            </Collapse>
            <LaunchesList launches={launches} />
          </CardContent>
        </Card>
      </div>
    </Page>
  );
}
