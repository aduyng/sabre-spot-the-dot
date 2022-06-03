import {
  Card,
  CardHeader,
  Typography,
  Grid,
  IconButton,
  CardMedia,
  CardContent,
  GridList,
  GridListTile,
  Collapse,
  Box
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import PropTypes from "prop-types";
import { useState } from "react";
import CircularProgressWithLabel from "./CircularProgressWithLabel";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import React from "react";
import { useRef } from "react";
import { useEffect } from "react";

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
  screenshot: { goldenUrl, diffUrl, url, diffPercentage, expanded, rightButton, name, id },
  toggle
}) {
  const classes = useStyles();
  const handleExpand = () => toggle();
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
        {rightButton ? (
          <RightButtonCardHeader />
        ) : (
          <CardHeader
            action={
              <Box paddingTop={1}>
                <CircularProgressWithLabel value={diffPercentage} />
              </Box>
            }
            avatar={
              <Box display="flex" alignItems="center" justifyContent="center">
                <IconButton onClick={handleExpand}>
                  <ChevronLeftIcon className={expanded ? classes.backwards : null} />
                </IconButton>
                <Typography>{name}</Typography>
              </Box>
            }
          />
        )}
        <CardContent>
          <GridList cols={expanded ? 3 : 1} cellHeight={180} className={classes.imagelist} >
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
  })
};
