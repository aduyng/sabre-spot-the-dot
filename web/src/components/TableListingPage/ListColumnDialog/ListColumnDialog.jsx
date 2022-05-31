import React, { useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { useTranslation } from "react-i18next";
import Button from "@material-ui/core/Button";
import { arrayOf, func, shape } from "prop-types";
import map from "lodash/map";
import update from "immutability-helper";
import Columns from "./Columns";

export default function ListColumnDialog({ onClose, columns: initialColumns, onSave }) {
  const { t } = useTranslation();
  const [columns, setColumns] = useState(initialColumns);

  const onSaveButtonClick = () => {
    onSave({ columns });
  };

  const moveColumn = (dragIndex, hoverIndex) => {
    const dragCard = columns[dragIndex];
    setColumns(
      update(columns, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, dragCard]
        ]
      })
    );
  };

  const onSelectAllColumnsToggle = (event, checked) => {
    setColumns(map(columns, column => ({ ...column, selected: checked })));
  };

  const onColumnToggle = ({ index, checked }) => {
    const updated = map(columns, (col, i) => {
      return {
        ...col,
        selected: i === index ? checked : col.selected
      };
    });
    setColumns(updated);
  };

  return (
    <Dialog open onClose={onClose}>
      <DialogTitle id="form-dialog-title">{t("Select Columns")}</DialogTitle>
      <DialogContent>
        <Columns
          columns={columns}
          moveColumn={moveColumn}
          onSelectAllColumnsToggle={onSelectAllColumnsToggle}
          onColumnToggle={onColumnToggle}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onSaveButtonClick} color="primary">
          {t("Save Changes")}
        </Button>
        <Button onClick={onClose} color="primary">
          {t("Cancel")}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

ListColumnDialog.propTypes = {
  onClose: func.isRequired,
  columns: arrayOf(shape({})).isRequired,
  onSave: func.isRequired
};
