import React from "react";
import { arrayOf, bool, func, instanceOf, oneOfType, shape, string, number } from "prop-types";
import makeStyles from "@material-ui/core/styles/makeStyles";
import { useTranslation } from "react-i18next";
import { grey, red } from "@material-ui/core/colors";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import differenceInDays from "date-fns/differenceInDays";
import map from "lodash/map";
import get from "lodash/get";
import Table from "@material-ui/core/Table";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import clsx from "clsx";
import Typography from "@material-ui/core/Typography";
import DeleteIcon from "@material-ui/icons/Delete";
import TableHead from "../../../components/TableListingPage/TableHead";
import TableBody from "../../../components/TableListingPage/TableBody";
import formatDateTime from "../../../libs/formatDateTime";
import ConfirmButton from "../../../components/ConfirmButton";

const useStyles = makeStyles(theme => ({
  table: {},
  expirationDateStatus: {
    fontSize: ".725rem"
  },
  colorExpiration00: {
    color: grey[500]
  },
  colorExpiration30: {
    color: red[800]
  },
  colorExpiration60: {
    color: red[200]
  },
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

export default function ApiKeyTable({ apiKeys, onDeleteRequested, isProcessing }) {
  const { t } = useTranslation();
  const classes = useStyles();

  const createOnDeleteRequestHandler = ({ row }) => () => onDeleteRequested({ apiKey: row });

  const columns = [
    {
      id: "id",
      label: "ID"
    },
    {
      id: "description",
      label: "Description"
    },
    {
      id: "expiresAt",
      label: "Expires At",
      align: "center"
    }
  ];

  return (
    <TableContainer data-testid="ApiKeyList">
      <Table className={classes.table} size="small">
        <TableHead columns={columns} includeActions />
        <TableBody
          rows={apiKeys}
          keyField="id"
          numberOfColumns={columns.length + 1}
          rowRenderer={({ row }) => (
            <>
              <TableCell align="center" className={classes.buttonCell}>
                <ConfirmButton
                  confirmDialogContent={t("Are you sure you want delete this API Key?")}
                  buttonLabel={t("Delete")}
                  onProceed={createOnDeleteRequestHandler({ row })}
                  confirmDialogTitle={t("Delete API Key")}
                  isProcessing={isProcessing}
                  buttonProps={{
                    "data-testid": "deleteApiKeyButton",
                    startIcon: <DeleteIcon />,
                    size: "small"
                  }}
                  buttonClassName={classes.deleteButton}
                />
              </TableCell>
              {map(columns, column => {
                if (column.id === "expiresAt") {
                  return (
                    <TableCell data-testid="expDateCell" key={column.id} align={column.align}>
                      {formatDateTime(row.expiresAt)}
                      <Typography
                        variant="button"
                        display="block"
                        data-testid="expiredWarning"
                        className={clsx(
                          classes.expirationDateStatus,
                          {
                            [classes.colorExpiration00]:
                              differenceInDays(new Date(row.expirationDate), new Date()) < 0
                          },
                          {
                            [classes.colorExpiration30]:
                              differenceInDays(new Date(row.expirationDate), new Date()) >= 0 &&
                              differenceInDays(new Date(row.expirationDate), new Date()) <= 30
                          }
                        )}
                      >
                        {differenceInDays(new Date(row.expirationDate), new Date()) < 0 &&
                          t(`Expired`)}
                        {differenceInDays(new Date(row.expirationDate), new Date()) >= 0 &&
                          differenceInDays(new Date(row.expirationDate), new Date()) <= 60 &&
                          t(`Expires in {{days}}`, {
                            days: formatDistanceToNow(new Date(row.expirationDate))
                          })}
                      </Typography>
                    </TableCell>
                  );
                }
                return (
                  <TableCell key={column.id} align={column.align} data-testid="descriptionCell">
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
ApiKeyTable.propTypes = {
  apiKeys: arrayOf(
    shape({
      description: string.isRequired,
      expiresAt: oneOfType([number, instanceOf(Date)])
    })
  ),
  onDeleteRequested: func.isRequired,
  isProcessing: bool
};

ApiKeyTable.defaultProps = {
  apiKeys: null,
  isProcessing: false
};
