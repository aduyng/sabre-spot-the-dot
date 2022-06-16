import React, { useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import { useParams } from "react-router-dom";
import { useSnackbar } from "notistack";
import { makeStyles } from "@material-ui/core/styles";
import { useTranslation } from "react-i18next";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Avatar from "@material-ui/core/Avatar";
import AddIcon from "@material-ui/icons/Add";
import SaveIcon from "@material-ui/icons/Save";
import HomeIcon from "@material-ui/icons/Home";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import TextField from "@material-ui/core/TextField";
import isLength from "validator/lib/isLength";
import VpnKey from "@material-ui/icons/VpnKey";
import isEmpty from "lodash/isEmpty";
import Page from "../../../components/Page/Page";
import getGraphQLErrorsAsString from "../../../graphql/getGraphQLErrorsAsString";
import PageTitle from "../../../components/PageTitle";
import formatDateTime from "../../../libs/formatDateTime";

import CREATE_API_KEY from "./CREATE_API_KEY.gql";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    display: "flex",
    width: "100%"
  },
  avatarHeader: {
    backgroundColor: theme.palette.success.main
  },
  boxContent: {
    marginLeft: theme.spacing(2),
    width: "100%",
    "& .MuiCardContent-root": {
      paddingLeft: theme.spacing(0),
      paddingRight: theme.spacing(4)
    }
  },
  toolbar: {
    display: "block",
    padding: theme.spacing(0),
    [theme.breakpoints.up("sm")]: {
      display: "flex"
    }
  },
  button: {
    width: "100%",
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1),
    [theme.breakpoints.up("sm")]: {
      width: "unset",
      marginTop: "unset"
    }
  }
}));

export default function ApiKeyNew() {
  const classes = useStyles();
  const { t } = useTranslation();
  const { profileId, companyCode } = useParams();
  const { enqueueSnackbar } = useSnackbar();
  const [createEAndO, { loading: isSaving }] = useMutation(CREATE_API_KEY);
  const [createdApiKey, setCreatedApiKey] = useState(false);
  const [description, setDescription] = useState({
    value: ""
  });
  const isDescriptionValid = value => value != null && isLength(value, { min: 3, max: 255 });

  const onDescriptionChange = event => {
    const error = !isDescriptionValid(event.target.value);

    setDescription({
      value: event.target.value,
      error,
      helperText: error
        ? t("The description must be in between {{min}} and {{max}} characters!", {
            min: 3,
            max: 255
          })
        : undefined
    });
  };

  const onSubmitClick = () => {
    return createEAndO({
      variables: {
        description: description.value
      }
    })
      .then(response => {
        const {
          data: { createApiKey }
        } = response;
        setCreatedApiKey(createApiKey);
      })
      .catch(error => {
        const errorAsString = getGraphQLErrorsAsString(error);
        const translatedError = t("Unable to save because {{error}}", { error: errorAsString });
        enqueueSnackbar(translatedError, {
          variant: "error"
        });
      });
  };

  return (
    <Page>
      <PageTitle
        crumbs={[
          {
            href: `/${companyCode}`,
            label: t("Home"),
            Icon: HomeIcon
          },
          {
            label: t("Profile"),
            Icon: AccountBoxIcon
          },
          {
            label: t("Api Keys"),
            Icon: VpnKey,
            href: `/${companyCode}/account/profile/${profileId}/api-keys`
          },
          {
            label: t("Add New API Key"),
            Icon: AddIcon
          }
        ]}
        loading={isSaving}
      />

      <div className={classes.root}>
        <Card className={classes.boxContent}>
          <CardHeader
            avatar={
              <Avatar className={classes.avatarHeader}>
                <VpnKey />
              </Avatar>
            }
            data-testid="newApiKey"
            title={t("Add New API Key")}
          />
          <CardContent className={classes.boxContent}>
            <TextField
              margin="normal"
              label={t("Description")}
              fullWidth
              required
              disabled={isSaving || !isEmpty(createdApiKey)}
              variant="outlined"
              onChange={onDescriptionChange}
              inputProps={{ "data-testid": "description" }}
              {...description}
            />
            <Toolbar disableGutters className={classes.toolbar}>
              <Button
                variant="contained"
                color="primary"
                disabled={
                  isSaving ||
                  isEmpty(description.value) ||
                  description.error ||
                  !isEmpty(createdApiKey)
                }
                className={classes.button}
                onClick={onSubmitClick}
                startIcon={<SaveIcon />}
                data-testid="saveButton"
              >
                {t("Save")}
              </Button>
            </Toolbar>
            {!isEmpty(createdApiKey) && (
              <>
                <TextField
                  margin="normal"
                  label={t("Generated API Keys")}
                  fullWidth
                  required
                  disabled
                  variant="outlined"
                  inputProps={{ "data-testid": "plainTextKey" }}
                  helperText={t(
                    "Please copy and save this API Key. You won't be able to see it again after leaving this page"
                  )}
                  value={createdApiKey.plainTextKey}
                />

                <TextField
                  margin="normal"
                  label={t("Expires At")}
                  fullWidth
                  required
                  disabled
                  variant="outlined"
                  inputProps={{ "data-testid": "expiresAt" }}
                  helperText={t(
                    "This is the expiration date and time. Please make sure to create a new key before that"
                  )}
                  value={formatDateTime(createdApiKey.expiresAt)}
                />
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </Page>
  );
}
