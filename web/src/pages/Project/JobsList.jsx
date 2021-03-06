import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import PageviewIcon from "@material-ui/icons/Pageview";
import get from "lodash/get";
import map from "lodash/map";
import { arrayOf, shape, string } from "prop-types";
import React from "react";
import { useTranslation } from "react-i18next";
import { Link, useRouteMatch } from "react-router-dom";
import TableBody from "../../components/TableListingPage/TableBody";
import TableHead from "../../components/TableListingPage/TableHead";

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

export default function JobsList({ jobs }) {
  const classes = useStyles();
  const { t } = useTranslation();
  const { url } = useRouteMatch();

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
    <TableContainer data-testid="JobsList">
      <Table className={classes.table} size="small">
        <TableHead columns={columns} includeActions />
        <TableBody
          rows={jobs}
          keyField="id"
          numberOfColumns={columns.length + 1}
          rowRenderer={({ row }) => (
            <>
              <TableCell align="center" className={classes.buttonCell}>
                <Button
                  variant="outlined"
                  startIcon={<PageviewIcon />}
                  component={Link}
                  to={`${url}/${row.id}/launches`}
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
JobsList.propTypes = {
  jobs: arrayOf(
    shape({
      id: string.isRequired,
      name: string.isRequired
    })
  )
};

JobsList.defaultProps = {
  jobs: []
};
