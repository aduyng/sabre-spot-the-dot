import React from "react";
import { arrayOf, shape, string } from "prop-types";
import makeStyles from "@material-ui/core/styles/makeStyles";
import map from "lodash/map";
import get from "lodash/get";
import Table from "@material-ui/core/Table";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import DeleteIcon from "@material-ui/icons/Delete";
import Button from "@material-ui/core/Button";
import PageviewIcon from "@material-ui/icons/Pageview";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import TableHead from "../../components/TableListingPage/TableHead";
import TableBody from "../../components/TableListingPage/TableBody";
import ConfirmButton from "../../components/ConfirmButton";

const useStyles = makeStyles(theme => ({
  table: {},
  buttonCell: {
    width: theme.spacing(10)
  },
  deleteButton: {
    color: theme.palette.common.white,
    background: theme.palette.error.main,
    "&:hover": {
      background: theme.palette.error.dark
    }
  }
}));

export default function ProjectList({ projects }) {
  const classes = useStyles();
  const { t } = useTranslation();

  const columns = [
    {
      id: "id",
      label: "ID"
    },
    {
      id: "name",
      label: "Name"
    }
  ];

  return (
    <TableContainer data-testid="ProjectList">
      <Table className={classes.table} size="small">
        <TableHead columns={columns} includeActions />
        <TableBody
          rows={projects}
          keyField="id"
          numberOfColumns={columns.length + 1}
          rowRenderer={({ row }) => (
            <>
              <TableCell align="center" className={classes.buttonCell}>
                <Button
                  variant="outlined"
                  startIcon={<PageviewIcon />}
                  component={Link}
                  to={`/projects/${row.id}`}
                >
                  {t("View")}
                </Button>
              </TableCell>
              {map(columns, column => {
                return (
                  <TableCell key={column.id} align={column.align}>
                    {get(row, column.id)}
                  </TableCell>
                );
              })}
            </>
          )}
        />
      </Table>
    </TableContainer>
  );
}
ProjectList.propTypes = {
  projects: arrayOf(
    shape({
      id: string.isRequired,
      name: string.isRequired
    })
  )
};

ProjectList.defaultProps = {
  projects: []
};