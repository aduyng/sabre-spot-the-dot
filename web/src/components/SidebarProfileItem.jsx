import React, { useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import { string } from "prop-types";
import get from "lodash/get";
import { useSession } from "../contexts/SessionContext";

const useStyles = makeStyles(theme => ({
  item: {
    paddingLeft: theme.spacing(1)
  },
  nested: {
    paddingLeft: theme.spacing(4)
  }
}));

export default function SidebarProfileItem({ firstTabId }) {
  const classes = useStyles();
  const session = useSession();
  const menuAnchorRef = useRef(null);
  const avatarAnchorRef = useRef(null);

  const userName = get(session, "user.name");
  const avatarUrl = get(session, "user.avatarUrl");
  const initials = get(session, "user.initials");

  return (
    <List>
      <ListItem
        selected={firstTabId === "account"}
        alignItems="flex-start"
        className={classes.item}
        data-testid="currentUser"
      >
        <ListItemAvatar>
          <Avatar ref={avatarAnchorRef} alt={userName} src={avatarUrl}>
            {initials}
          </Avatar>
        </ListItemAvatar>
        <ListItemText data-testid="currentUserName" ref={menuAnchorRef} primary={userName} />
      </ListItem>
    </List>
  );
}

SidebarProfileItem.propTypes = {
  firstTabId: string.isRequired
};

SidebarProfileItem.defaultProps = {};
