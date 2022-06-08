import React, { useState } from "react";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import CardContent from "@material-ui/core/CardContent";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import Box from "@material-ui/core/Box";
import makeStyles from "@material-ui/core/styles/makeStyles";
import PropTypes from "prop-types";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import Zoom from "react-medium-image-zoom";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import CircularProgressWithLabel from "./CircularProgressWithLabel";
import "react-medium-image-zoom/dist/styles.css";
import Img from "./Img";

const useStyles = makeStyles(theme => ({
  expanded: {
    backgroundColor: theme.palette.grey[100],
    transition: "background-color 400ms linear"
  },
  notExpanded: {
    backgroundColor: "#FFFFFF",
    transition: "background-color 400ms linear"
  },
  regular: {
    transform: "rotate(0deg)",
    transition: "all 1s linear"
  },
  backwards: {
    transform: "rotate(180deg)"
  },
  imagelist: {
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column"
    },
    flexWrap: "nowrap",
    flexGrow: 0,
    flexBasis: 0
  },
  imagelistMobile: {
    flex: 1,
    flexDirection: "column"
  },
  cardContent: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  cardHeaderRoot: {
    paddingBottom: 0
  },
  trunc: {
    textOverflow: "ellipsis",
    overflow: "hidden",
    direction: "rtl",
    whiteSpace: "nowrap"
  },
  cardHeaderAction: {
    overflow: "hidden",
    flexShrink: 1
  }
}));
export default function DiffCard({
  screenshot: { goldenUrl, diffUrl, baseUrl, diffPercentage, name }
}) {
  const [expanded, setExpanded] = useState(false);
  const classes = useStyles();
  const handleExpand = () => setExpanded(val => !val);
  const isSmallScreenDown = useMediaQuery("(max-width:1100px)");
  const isMobile = useMediaQuery("(max-width:600px)");
  return (
    <Grid item xs={expanded || isMobile ? 12 : isSmallScreenDown ? 6 : 4}>
      <Card className={expanded ? classes.expanded : classes.notExpanded}>
        <CardHeader
          classes={{
            root: classes.cardHeaderRoot,
            action: classes.cardHeaderAction
          }}
          avatar={
            <CircularProgressWithLabel
              value={diffPercentage ? diffPercentage % 100 : "NA"}
              showColorBasedStatus
            />
          }
          action={
            <Box display="flex" alignItems="center" paddingTop={1}>
              <Typography className={classes.trunc}>{name}</Typography>
              <IconButton onClick={handleExpand}>
                <ChevronRightIcon className={expanded ? classes.backwards : null} />
              </IconButton>
            </Box>
          }
        />
        <CardContent>
          <GridList
            cols={expanded && !isMobile ? 3 : 1}
            cellHeight={240}
            className={classes.imagelist}
          >
            <GridListTile className={classes.cardContent}>
              <Zoom>
                <Img src={diffUrl} alt="diff" label="Difference" />
              </Zoom>
            </GridListTile>
            {expanded && (
              <GridListTile className={classes.cardContent}>
                <Zoom>
                  <Img src={goldenUrl} alt="golden" label="Golden Build" />
                </Zoom>
              </GridListTile>
            )}
            {expanded && (
              <GridListTile className={classes.cardContent}>
                <Zoom>
                  <Img src={baseUrl} alt="base" label="Current Build" />
                </Zoom>
              </GridListTile>
            )}
          </GridList>
        </CardContent>
      </Card>
    </Grid>
  );
}
DiffCard.propTypes = {
  screenshot: PropTypes.shape({
    baseUrl: PropTypes.string.isRequired,
    diffUrl: PropTypes.string.isRequired,
    goldenUrl: PropTypes.string.isRequired,
    diffPercentage: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    createdAt: PropTypes.number.isRequired,
    status: PropTypes.string.isRequired,
    expanded: PropTypes.bool
  }).isRequired
};
