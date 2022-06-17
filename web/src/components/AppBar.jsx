import React from "react";
import { func } from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import MUIAppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import Badge from "@material-ui/core/Badge";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import MenuIcon from "@material-ui/icons/Menu";
import NotificationsIcon from "@material-ui/icons/Notifications";
import { Helmet } from "react-helmet/es/Helmet";
import { useTranslation } from "react-i18next";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import useTheme from "@material-ui/core/styles/useTheme";
import ExitToAppOutlined from "@material-ui/icons/ExitToAppOutlined";
import { useConfig } from "../contexts/ConfigContext";
import { useSession } from "../contexts/SessionContext";

const useStyles = makeStyles(theme => ({
  grow: {
    flexGrow: 1
  },

  appBar: {
    borderBottom: `${theme.spacing(0.5)}px solid ${theme.palette.primary.dark}`,
    backgroundColor: theme.palette.common.white
  },

  innerGrow: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  logo: {
    maxWidth: 250,
    maxHeight: 40,
    [theme.breakpoints.up("sm")]: {
      maxHeight: 50
    }
  },
  versionNotes: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "unset"
    }
  },
  beta: {
    position: "absolute",
    top: theme.spacing(0.125),
    color: theme.palette.primary.main,
    fontWeight: "bold"
  },
  version: {
    position: "absolute",
    bottom: theme.spacing(1.25),
    color: theme.palette.grey[400]
  },
  systemMessage: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  tabletRightButtons: {
    display: "flex",
    flexDirection: "row"
  },
  desktopRightButtons: {
    display: "flex",
    flexDirection: "row"
  },
  switchBackButton: {
    height: theme.spacing(5),
    marginLeft: theme.spacing(1)
  },
  rightButton: {
    marginLeft: theme.spacing(1)
  }
}));

export default function AppBar({ onToggleDrawerClick }) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const session = useSession();
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const config = useConfig();
  const { t } = useTranslation();
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const theme = useTheme();

  const isSMSAndUpScreen = useMediaQuery(theme.breakpoints.up("sm"));

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const onSignOutClick = () => session.logOut();

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton aria-label="show 11 new notifications" color="inherit">
          <Badge badgeContent={11} color="secondary">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>{t("Notifications")}</p>
      </MenuItem>
    </Menu>
  );

  return (
    <div className={classes.grow} data-testid="appBar">
      <Helmet>
        <link rel="icon" type="image/png" href="/sabre-logo-red.svg" alt="Logo" />
        <title>Sabre SpotTheDot</title>
      </Helmet>
      <MUIAppBar position="fixed" data-testid="appBar" className={classes.appBar} elevation={1}>
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="primary"
            aria-label="open drawer"
            onClick={onToggleDrawerClick}
            data-testid="toggleSidebarButton"
          >
            <MenuIcon />
          </IconButton>
          <img
            src="/sabre-logo-red.svg"
            className={classes.logo}
            alt="Logo"
            data-testid="logoImage"
          />
          <div className={classes.versionNotes}>
            <div className={classes.version}>{config.version}</div>
          </div>
          <div className={classes.innerGrow} />
          <div className={classes.innerGrow} />
          {isSMSAndUpScreen && (
            <div className={classes.desktopRightButtons}>
              <Button
                variant="outlined"
                startIcon={<ExitToAppOutlined />}
                onClick={onSignOutClick}
                data-testid="onSignOut"
                className={classes.rightButton}
              >
                {t("Sign Out")}
              </Button>
            </div>
          )}
          {!isSMSAndUpScreen && (
            <div className={classes.tabletRightButtons}>
              <IconButton
                onClick={onSignOutClick}
                data-testid="onSignOut"
                className={classes.rightButton}
              >
                <ExitToAppOutlined />
              </IconButton>
            </div>
          )}
        </Toolbar>
      </MUIAppBar>
      {renderMobileMenu}
      {renderMenu}
    </div>
  );
}

AppBar.propTypes = {
  onToggleDrawerClick: func.isRequired
};
