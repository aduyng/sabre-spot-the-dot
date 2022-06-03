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
import CircularProgressWithLabel from "./CircularProgressWithLabel";

const useStyles = makeStyles({
  root: {
    width: "100%"
  },
  regular: {
    transform: "rotate(0deg)",
    transition: "all 1s linear"
  },
  backwards: {
    transform: "rotate(180deg)"
  },
  imagelist: {
    flexWrap: "nowrap",
    flexGrow: 0,
    flexBasis: 0
  }
});

export default function DiffCard({
  screenshot: { goldenUrl, diffUrl, url, diffPercentage, name }
}) {
  const [expanded, setExpanded] = useState(false);
  const classes = useStyles();
  const handleExpand = () => setExpanded(val => !val);
  const RightButtonCardHeader = () => (
    <CardHeader
      avatar={<CircularProgressWithLabel value={diffPercentage} />}
      action={
        <Box display="flex" alignItems="center" paddingTop={1}>
          <Typography>{name}</Typography>
          <IconButton onClick={handleExpand}>
            <ChevronRightIcon className={expanded ? classes.backwards : null} />
          </IconButton>
        </Box>
      }
    />
  );

  return (
    <Grid item xs={expanded ? 12 : 6}>
      <Card className={classes.root}>
        <RightButtonCardHeader />
        <CardContent>
          <GridList cols={expanded ? 3 : 1} cellHeight={180} className={classes.imagelist}>
            <GridListTile>
              <img src={diffUrl} alt="diff" />
            </GridListTile>
            {expanded ? (
              <>
                <GridListTile>
                  <img src={goldenUrl} alt="base" />
                </GridListTile>
                <GridListTile>
                  <img src={url} alt="new" />
                </GridListTile>
              </>
            ) : null}
          </GridList>
        </CardContent>
      </Card>
    </Grid>
  );
}
DiffCard.propTypes = {
  screenshot: PropTypes.shape({
    url: PropTypes.string.isRequired,
    diffUrl: PropTypes.string.isRequired,
    goldenUrl: PropTypes.string.isRequired,
    diffPercentage: PropTypes.number.isRequired,
    size: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    createdAt: PropTypes.number.isRequired,
    status: PropTypes.string.isRequired,
    expanded: PropTypes.bool.isRequired,
    rightButton: PropTypes.bool.isRequired
  }).isRequired
};
