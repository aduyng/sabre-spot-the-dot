import { useQuery } from "@apollo/react-hooks";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
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
import firebase from "firebase";
import ScreenshotsView from "./ScreenshotsView";
import Page from "../../components/Page/Page";
import PageTitle from "../../components/PageTitle";
import formatDateTime from "../../libs/formatDateTime";
import GET_LAUNCH from "./GET_LAUNCH.gql";
import PageLoader from "../../components/PageLoader";
import joinLaunches from "./joinLaunches";

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
  const { data, error, loading } = useQuery(GET_LAUNCH, {
    variables: { launchId, jobId, projectId }
  });

  const { thisLaunch, goldenLaunch, projectName, jobName } = useMemo(
    () => ({
      thisLaunch: get(data, "getLaunch"),
      goldenLaunch: get(data, "getGoldenLaunch"),
      project: get(data, "getProject"),
      job: get(data, "getJob")
    }),
    [data]
  );

  const { screenshots } = useMemo(() => {
    if (!thisLaunch || !goldenLaunch) return {};
    const scs = joinLaunches({
      base: get(thisLaunch, "screenshots", []),
      golden: get(goldenLaunch, "screenshots", [])
    });
    const withUrl = scs.map(sc => ({
      ...sc,
      baseUrl: sc.name
        ? firebase
            .storage()
            .ref(`${projectId}/${jobId}/${launchId}/${sc.id}/${sc.name}`)
            .getDownloadURL()
        : undefined,
      diffUrl: sc.diff
        ? firebase
            .storage()
            .ref(`${projectId}/${jobId}/${launchId}/${sc.id}/${sc.diff}`)
            .getDownloadURL()
        : undefined,
      goldenUrl: sc.golden
        ? firebase
            .storage()
            .ref(`${projectId}/${jobId}/${sc.goldenLaunchId}/${sc.goldenId}/${sc.golden}`)
            .getDownloadURL()
        : undefined
    }));
    return { screenshots: withUrl };
  }, [thisLaunch, goldenLaunch, projectId, launchId, jobId]);

  if (error) {
    enqueueSnackbar(error && error.message, { variant: "error" });
    return null;
  }
  if (loading) {
    return <PageLoader />;
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
            label: projectName,
            Icon: AccountTreeIcon
          },
          {
            label: jobName,
            href: `/projects/${projectId}/jobs/${jobId}/launches`,
            Icon: WorkIcon
          },
          {
            label: thisLaunch.name,
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
            disableTypography
            title={
              <Typography variant="h3">
                {t("Screenshots for {{launch}}", { launch: thisLaunch.name })}
              </Typography>
            }
            action={
              <>
                <Typography>{t("Status: {{status}}", { status: thisLaunch.status })}</Typography>
                <Typography>
                  {t("Created At: {{createdAt}}", {
                    createdAt: formatDateTime(get(thisLaunch, "createdAt"))
                  })}
                </Typography>
                <Typography>
                  {t("Branch: {{branch}}", { branch: get(thisLaunch, "branch") })}
                </Typography>
                <Typography>
                  {t("Commit: {{commit}}", { commit: get(thisLaunch, "commit") })}
                </Typography>
                <Link href={get(thisLaunch, "url")}>URL</Link>
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
