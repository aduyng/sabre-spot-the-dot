import React, { useState } from "react";
import Box from "@material-ui/core/Box";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Button from "@material-ui/core/Button";
import ViewColumnIcon from "@material-ui/icons/ViewColumn";
import { useTranslation } from "react-i18next";
import Grid from "@material-ui/core/Grid";
import { arrayOf, node, oneOfType, shape, func } from "prop-types";
import ListColumnDialog from "./ListColumnDialog/ListColumnDialog";

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    flexDirection: "column"
  },
  buttons: {
    alignItems: "flex-end",
    display: "flex",
    flexDirection: "column",
    "& .button": {
      alignSelf: "flex-end"
    }
  }
}));

export default function ListHeader({ columns, children, onColumnsUpdated }) {
  const classes = useStyles();
  const { t } = useTranslation();
  const [isListColumnDialogOpen, setListColumnDialogOpen] = useState(false);

  const onColumnsButtonClick = () => setListColumnDialogOpen(true);
  const onListColumnDialogClose = () => setListColumnDialogOpen(false);

  return (
    <Box paddingTop={2} paddingLeft={1.5} paddingRight={1.5} className={classes.root}>
      <Grid container>
        <Grid item sm={8} md={9} lg={10} xl={11}>
          {children}
        </Grid>
        <Grid item sm={4} md={3} lg={2} xl={1} className={classes.buttons}>
          <Button
            size="medium"
            variant="outlined"
            startIcon={<ViewColumnIcon />}
            onClick={onColumnsButtonClick}
          >
            {t("Columns")}
          </Button>
        </Grid>
      </Grid>
      {isListColumnDialogOpen && (
        <ListColumnDialog
          onClose={onListColumnDialogClose}
          columns={columns}
          onSave={onColumnsUpdated}
        />
      )}
    </Box>
  );
}

ListHeader.propTypes = {
  columns: arrayOf(shape()).isRequired,
  children: oneOfType([arrayOf(node), node]).isRequired,
  onColumnsUpdated: func.isRequired
};
