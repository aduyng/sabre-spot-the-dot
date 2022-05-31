import React, { useMemo } from "react";
import { func, bool } from "prop-types";
import { Link, useLocation } from "react-router-dom";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import clsx from "clsx";
import Divider from "@material-ui/core/Divider";
import { useTranslation } from "react-i18next";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import DescriptionOutlined from "@material-ui/icons/DescriptionOutlined";
import SidebarProfileItem from "../SidebarProfileItem";
import { useConfig } from "../../contexts/ConfigContext";

const useStyles = makeStyles(theme => {
  return {
    drawer: {
      flexShrink: 0,
      "& .MuiListItemIcon-root": {
        minWidth: theme.spacing(3.5)
      }
    },
    drawerOpen: {
      width: theme.spacing(30),
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen
      })
    },
    drawerClose: {
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
      }),
      overflowX: "hidden",
      width: theme.spacing(7) + 1,
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(7.5)
      }
    },
    nested: {
      paddingLeft: theme.spacing(4),
      "& .MuiTypography-root": {
        fontSize: ".9rem"
      },
      "& .MuiSvgIcon-root": {
        width: ".85em",
        height: ".85em"
      }
    },
    list: {
      flexGrow: 1
    }
  };
});

export default function Sidebar({ isOpened, onClose }) {
  const classes = useStyles();
  const { t } = useTranslation();
  const config = useConfig();
  const location = useLocation();

  const { firstTabId, secondTabId } = useMemo(() => {
    return {
      firstTabId: location.pathname.split("/", 3).pop(),
      secondTabId: location.pathname.split("/", 4).pop()
    };
  }, [location.pathname]);

  return (
    <Drawer
      open={isOpened}
      classes={{
        paper: clsx(classes.drawer, {
          [classes.drawerOpen]: isOpened,
          [classes.drawerClose]: !isOpened
        })
      }}
      onClose={onClose}
      data-testid="sidebar"
    >
      <SidebarProfileItem
        firstTabId={firstTabId}
        secondTabId={secondTabId}
        isCompactMode={!isOpened}
        onClose={onClose}
      />
      <Divider />
      <List className={classes.list}>
        <ListItem
          button
          selected={firstTabId === "api-keys"}
          onClick={onClose}
          component={Link}
          to="/api-keys"
        >
          <ListItemIcon>
            <DescriptionOutlined color="primary" />
          </ListItemIcon>
          <ListItemText primary={t("API Keys")} />
        </ListItem>
      </List>
      <List>
        <ListItem>
          <ListItemText
            primary="Sabre Spot The Dot ©2022"
            secondary={t("v{{version}} #{{buildNumber}}", {
              version: config.version,
              buildNumber: config.buildNumber
            })}
          />
        </ListItem>
      </List>
    </Drawer>
  );
}

Sidebar.propTypes = {
  isOpened: bool.isRequired,
  onClose: func.isRequired
};
