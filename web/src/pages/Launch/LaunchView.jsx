import Promise from "bluebird";
import { useMutation, useQuery } from "@apollo/react-hooks";
import Typography from "@material-ui/core/Typography";
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
import { useSnackbar } from "notistack";
import React, { useMemo, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import isEmpty from "lodash/isEmpty";
import get from "lodash/get";
import Box from "@material-ui/core/Box";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Slider from "@material-ui/core/Slider";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Input from "@material-ui/core/Input";
import getGraphQLErrorsAsString from "../../graphql/getGraphQLErrorsAsString";
import ScreenshotsView from "./ScreenshotsView";
import initializeFirebase from "../../firebase/initialize";
import Page from "../../components/Page/Page";
import PageTitle from "../../components/PageTitle";
import formatDateTime from "../../libs/formatDateTime";
import GET_LAUNCH from "./GET_LAUNCH.gql";
import PageLoader from "../../components/PageLoader";
import joinLaunches from "./joinLaunches";
import SET_GOLDEN from "./SET_GOLDEN.gql";
import GET_JOB from "../Job/GET_JOB.gql";

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
  controlBox: {
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center"
    },
    marginInline: "5vw",
    marginBottom: theme.spacing(5),
    padding: "1rem",
    borderRadius: "1rem",
    backgroundColor: theme.palette.grey[100],
    display: "flex",
    gap: theme.spacing(2),
    alignItems: "center"
  },
  sortFilterForm: {
    minWidth: "180px",
    margin: theme.spacing(1)
  },
  sliderContainer: {
    width: "250px",
    marginLeft: theme.spacing(2)
  },
  goldenButton: {
    [theme.breakpoints.up("md")]: { marginLeft: "auto" }
  },
  cardHeaderRoot: {
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center"
    }
  },
  cardHeaderAction: {
    [theme.breakpoints.down("sm")]: {
      alignSelf: "center",
      marginTop: theme.spacing(1)
    }
  },
  stats: {
    [theme.breakpoints.down("sm")]: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center"
    }
  }
}));

const sortMap = {
  "Diff. Percentage": sc =>
    sc.slice().sort((a, b) => (b.diffPercentage % 100) - (a.diffPercentage % 100)),
  "Most Recent": sc => sc.slice().sort((a, b) => b.createdAt - a.createdAt),
  "": sc => sc
};

const cutoffFilter = (sc, cutoff) => {
  return sc.filter(s => (s.diffPercentage || 99) % 100 > (cutoff === "" ? 0 : Number(cutoff)));
};

export default function JobView() {
  const classes = useStyles();
  const { t } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();
  const firebase = initializeFirebase();
  const { launchId, projectId, jobId } = useParams();
  const [screenshots, setScreenshots] = useState([]);
  const [transformedScreenshots, setTransformedScreenshots] = useState(screenshots);
  const [sort, setSort] = useState("");
  const [cutoff, setCutoff] = useState(0);
  const { data, error, loading } = useQuery(GET_LAUNCH, {
    variables: { launchId, jobId, projectId }
  });
  const [setGolden, { data: mutationData, loading: mutationLoading }] = useMutation(SET_GOLDEN);

  const { thisLaunch, goldenLaunch, project, job } = useMemo(() => {
    if (!data) {
      return {};
    }

    return {
      thisLaunch: get(data, "getLaunch"),
      goldenLaunch: get(data, "getGoldenLaunch"),
      project: get(data, "getProject"),
      job: get(data, "getJob")
    };
  }, [data]);

  useEffect(() => {
    if (!thisLaunch || !goldenLaunch) {
      return;
    }
    const scs = joinLaunches({
      base: get(thisLaunch, "screenshots", []),
      golden: get(goldenLaunch, "screenshots", [])
    });

    Promise.map(scs, sc => {
      return Promise.all([
        sc.name
          ? firebase
              .storage()
              .ref(`screenshots/${projectId}/${jobId}/${launchId}/${sc.id}/${sc.name}`)
              .getDownloadURL()
          : undefined,
        sc.diff
          ? firebase
              .storage()
              .ref(`screenshots/${projectId}/${jobId}/${launchId}/${sc.id}/${sc.diff}`)
              .getDownloadURL()
          : undefined,
        sc.golden
          ? firebase
              .storage()
              .ref(
                `screenshots/${projectId}/${jobId}/${sc.goldenLaunchId}/${sc.goldenId}/${sc.golden}`
              )
              .getDownloadURL()
          : undefined
      ]).spread((baseUrl, diffUrl, goldenUrl) => {
        return {
          ...sc,
          baseUrl,
          diffUrl,
          goldenUrl
        };
      });
    }).then(screenshotsWithUrl => setScreenshots(screenshotsWithUrl));
  }, [thisLaunch, goldenLaunch, projectId, launchId, jobId, firebase]);

  useEffect(() => setTransformedScreenshots(sortMap[sort](cutoffFilter(screenshots, cutoff))), [
    sort,
    cutoff,
    screenshots
  ]);

  if (error) {
    enqueueSnackbar(error && error.message, { variant: "error" });
    return null;
  }

  if (loading || isEmpty(screenshots)) {
    return <PageLoader />;
  }
  const handleSelect = e => setSort(e.target.value);
  const handleCutoffChange = (_, val) => setCutoff(val);
  const handleInputChange = e => setCutoff(e.target.value === "" ? "" : Number(e.target.value));
  const handleBlur = () => {
    if (cutoff < 0) {
      setCutoff(0);
    } else if (cutoff > 100) {
      setCutoff(100);
    }
  };
  const onSetGolden = () =>
    setGolden({
      variables: { projectId, launchId, jobId },
      refetchQueries: [{ query: GET_JOB, variables: { projectId, id: jobId } }]
    })
      .then(resp => {
        const {
          data: { setGolden: res }
        } = resp;
        if (res === 200) {
          enqueueSnackbar(
            t("Golden launch set successfully. Golden launch is now {{name}}.", {
              name: get(thisLaunch, "name", "this launch.")
            }),
            { variant: "success" }
          );
        } else {
          enqueueSnackbar(t("You do not have permission to set this launch as golden."), {
            variant: "error"
          });
        }
      })
      .catch(err => {
        const errorAsString = getGraphQLErrorsAsString(err);
        const translatedError = t("Unable to save because {{error}}", { error: errorAsString });
        enqueueSnackbar(translatedError, {
          variant: "error"
        });
      });
  return (
    <Page>
      <PageTitle
        loading={mutationLoading}
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
            label: thisLaunch.name,
            Icon: FlightTakeoffIcon,
            href: `/projects/${projectId}/jobs/${jobId}/launches/${launchId}/screenshots`
          }
        ]}
      />

      <div className={classes.root}>
        <Card className={classes.boxContent}>
          <CardHeader
            classes={{
              root: classes.cardHeaderRoot,
              action: classes.cardHeaderAction
            }}
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
              <Box className={classes.stats}>
                <Typography>{t("Status: {{status}}", { status: thisLaunch.status })}</Typography>
                <Typography>
                  {t("Created At: {{createdAt}}", {
                    createdAt: formatDateTime(get(thisLaunch, "createdAt"))
                  })}
                </Typography>
                {get(thisLaunch, "branch") && (
                  <Typography>
                    {t("Branch: {{branch}}", { branch: get(thisLaunch, "branch") })}
                  </Typography>
                )}
                {get(thisLaunch, "commit") && (
                  <Typography>
                    {t("Commit: {{commit}}", { commit: get(thisLaunch, "commit") })}
                  </Typography>
                )}
                <Button href={get(thisLaunch, "url")} variant="contained" target="_blank">
                  Go To Jenkins Build
                </Button>
              </Box>
            }
          />

          <CardContent>
            <Box className={classes.controlBox}>
              <FormControl className={classes.sortFilterForm} variant="filled">
                <InputLabel id="sort-by-label">Sort By:</InputLabel>
                <Select labelId="sort-by-label" onChange={handleSelect} value={sort}>
                  {Object.keys(sortMap).map(s => (
                    <MenuItem key={s} value={s}>
                      {s || "None"}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <Box className={classes.sliderContainer}>
                <Typography>Difference Percentage Cutoff</Typography>
                <Grid container spacing={2} alignItems="center">
                  <Grid item xs>
                    <Slider value={cutoff} onChange={handleCutoffChange} />
                  </Grid>
                  <Grid item>
                    <Input
                      value={cutoff}
                      margin="dense"
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                      inputProps={{
                        step: 5,
                        min: 0,
                        max: 100,
                        type: "number"
                      }}
                    />
                  </Grid>
                </Grid>
              </Box>
              {!!(screenshots.length - transformedScreenshots.length) && (
                <Typography>
                  {`Currently not shown: 
                  ${screenshots.length - transformedScreenshots.length}`}
                </Typography>
              )}
              <Button
                variant="contained"
                color="secondary"
                disabled={thisLaunch.isGolden || mutationLoading || !!mutationData}
                className={classes.goldenButton}
                onClick={onSetGolden}
                // startIcon={<SaveIcon />}
                data-testid="setGoldenButton"
              >
                {thisLaunch.isGolden
                  ? t("Launch is already golden")
                  : mutationLoading || mutationData
                  ? t("Loading")
                  : t("Set Launch as Golden")}
              </Button>
            </Box>
            <ScreenshotsView screenshots={transformedScreenshots} />
          </CardContent>
        </Card>
      </div>
    </Page>
  );
}
