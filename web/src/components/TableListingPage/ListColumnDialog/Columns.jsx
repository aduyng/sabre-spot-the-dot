import React, { useMemo } from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import List from "@material-ui/core/List";
import map from "lodash/map";
import every from "lodash/every";
import { shape, string, arrayOf, func } from "prop-types";
import Divider from "@material-ui/core/Divider";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Checkbox from "@material-ui/core/Checkbox";
import ListItemText from "@material-ui/core/ListItemText";
import ListItem from "@material-ui/core/ListItem";
import { useTranslation } from "react-i18next";
import Column from "./Column";

const useStyles = makeStyles({
  selectAllListItem: {
    paddingBottom: 0
  }
});

/**
 * @see https://codesandbox.io/s/react-dnd-material-ui-15o4i?file=/src/index.js
 */
export default function Columns({ columns, moveColumn, onSelectAllColumnsToggle, onColumnToggle }) {
  const classes = useStyles();
  const { t } = useTranslation();

  const createOnToggleHandler = ({ column, index }) => (event, checked) =>
    onColumnToggle({ column, index, checked });

  const isAllChecked = useMemo(() => every(columns, column => column.selected), [columns]);

  return (
    <List>
      <ListItem className={classes.selectAllListItem}>
        <ListItemIcon>
          <Checkbox
            edge="start"
            tabIndex={-1}
            disableRipple
            onChange={onSelectAllColumnsToggle}
            checked={isAllChecked}
          />
        </ListItemIcon>
        <ListItemText primary={t("Select All Columns")} />
      </ListItem>
      <Divider />
      {map(columns, (column, i) => (
        <Column
          key={column.id}
          index={i}
          id={column.id}
          column={column}
          moveColumn={moveColumn}
          onToggle={createOnToggleHandler({ column, index: i })}
        />
      ))}
    </List>
  );
}

Columns.propTypes = {
  columns: arrayOf(shape({ id: string.isRequired, label: string.isRequired })).isRequired,
  moveColumn: func.isRequired,
  onSelectAllColumnsToggle: func.isRequired,
  onColumnToggle: func.isRequired
};
