import React, { useState } from "react";
import { oneOfType, node, arrayOf, string } from "prop-types";
import makeStyles from "@material-ui/core/styles/makeStyles";
import clsx from "clsx";
import isEmpty from "lodash/isEmpty";
// import { lighten } from "@material-ui/core/styles/colorManipulator";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Sidebar from "../components/Sidebar/Sidebar";
import { getItemJson } from "../libs/storage";
import ScrollToTop from "../components/ScrollToTop/ScrollToTop";
import AppBar from "../components/AppBar";

const useStyles = makeStyles(theme => ({
  root: {
    height: "100%",
    width: "100%"
  },
  sidebarOpened: {},
  mainContent: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    marginTop: theme.spacing(10)
  },
  impersonating: {
    // temporary disable so that we can capture screenshots for help guide
    // backgroundColor: lighten(theme.palette.warning.light, 0.75)
  }
}));

export default function FullLayout({ children, matchingPath }) {
  const classes = useStyles();
  const [isSidebarOpened, setIsSidebarOpened] = useState(false);
  const isImpersonating = !isEmpty(getItemJson({ key: "impersonatedUserIds", defaultValue: [] }));
  const isSmallScreenSizeAndDown = useMediaQuery(theme => theme.breakpoints.down("sm"));

  const onSidebarToggle = () => {
    setIsSidebarOpened(!isSidebarOpened);
  };
  const onCloseSidebar = () => isSidebarOpened && setIsSidebarOpened(false);

  return (
    <div
      id="fullLayout"
      className={clsx(classes.root, {
        [classes.sidebarOpened]: isSidebarOpened,
        [classes.impersonating]: isImpersonating
      })}
    >
      <AppBar matchingPath={matchingPath} onToggleDrawerClick={onSidebarToggle} />
      <Sidebar isOpened={isSidebarOpened} onClose={onCloseSidebar} />
      <main className={classes.mainContent}>{children}</main>
      {!isSmallScreenSizeAndDown && <ScrollToTop />}
    </div>
  );
}

FullLayout.propTypes = {
  children: oneOfType([arrayOf(node), node]).isRequired,
  matchingPath: string.isRequired
};
