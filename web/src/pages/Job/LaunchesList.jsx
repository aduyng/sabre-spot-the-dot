import Button from "@material-ui/core/Button";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Table from "@material-ui/core/Table";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import PageviewIcon from "@material-ui/icons/Pageview";
import get from "lodash/get";
import map from "lodash/map";
import { arrayOf, shape, string } from "prop-types";
import CheckIcon from "@material-ui/icons/Check";
import React from "react";
import { useTranslation } from "react-i18next";
import { Link, useRouteMatch } from "react-router-dom";
import { useTheme } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import TableBody from "../../components/TableListingPage/TableBody";
import TableHead from "../../components/TableListingPage/TableHead";
import formatDateTime from "../../libs/formatDateTime";

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

export default function LaunchesList({ launches }) {
  const classes = useStyles();
  const { t } = useTranslation();
  const { url } = useRouteMatch();
  const columns = [
    {
      id: "id",
      label: "ID"
    },
    {
      id: "status",
      label: "Status",
      fn: value => (value === "in-progress" ? <CircularProgress /> : value)
    },
    {
      id: "createdAt",
      label: "Created At",
      fn: value => formatDateTime(value)
    },
    {
      id: "updatedAt",
      label: "Updated At",
      fn: value => formatDateTime(value)
    },
    {
      id: "isGolden",
      label: "Golden Version",
      fn: value => (value ? <CheckIcon color="primary" fontSize="large" /> : "")
    },
    {
      id: "avgPercentDiff",
      label: "Avg. Percent Difference"
    }
  ];

  return (
    <TableContainer data-testid="JobsList">
      <Table className={classes.table} size="small">
        <TableHead columns={columns} includeActions />
        <TableBody
          rows={launches}
          keyField="id"
          numberOfColumns={columns.length + 1}
          rowRenderer={({ row }) => (
            <>
              <TableCell align="center" className={classes.buttonCell}>
                <Button
                  variant="outlined"
                  startIcon={<PageviewIcon />}
                  component={Link}
                  to={`${url}/${row.id}/screenshots`}
                >
                  {t("View")}
                </Button>
              </TableCell>
              {map(columns, column => {
                return (
                  <TableCell key={column.id} align={column.align}>
                    {column.fn ? column.fn(get(row, column.id)) : get(row, column.id)}
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
LaunchesList.propTypes = {
  launches: arrayOf(
    shape({
      id: string.isRequired,
      name: string.isRequired
    })
  )
};

LaunchesList.defaultProps = {
  launches: []
};
