import React, { useMemo } from "react";
import { useSnackbar } from "notistack";
import { useMutation, useQuery } from "@apollo/react-hooks";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { useTranslation } from "react-i18next";
import Card from "@material-ui/core/Card";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Avatar from "@material-ui/core/Avatar";
import get from "lodash/get";
import AddIcon from "@material-ui/icons/Add";
import HomeIcon from "@material-ui/icons/Home";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import VpnKey from "@material-ui/icons/VpnKey";
import Page from "../../../components/Page/Page";
import ApiKeyTable from "./ApiKeyTable";
import PageTitle from "../../../components/PageTitle";
import SuccessButton from "../../../components/SuccessButton";
import DELETE_API_KEY from "./DELETE_API_KEY.gql";

import GET_API_KEYS from "./GET_API_KEYS.gql";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    display: "flex",
    width: "100%",
    "& .MuiCardHeader-action": {
      marginTop: "unset"
    }
  },
  avatarHeader: {
    backgroundColor: theme.palette.success.main
  },
  boxContent: {
    marginLeft: theme.spacing(2),
    width: "100%",
    "& .MuiCardContent-root": {
      paddingLeft: theme.spacing(0),
      paddingRight: theme.spacing(0)
    }
  },
  cardContent: {
    paddingTop: 0
  }
}));

export default function ProfileApiKeyList() {
  const { enqueueSnackbar } = useSnackbar();
  const classes = useStyles();
  const { t } = useTranslation();
  const isXsScreen = useMediaQuery(theme => theme.breakpoints.down("xs"));

  const { loading, error, data, refetch } = useQuery(GET_API_KEYS, {
    fetchPolicy: "network-only",
    errorPolicy: "all"
  });

  const [deleteApiKey, { loading: isDeleting }] = useMutation(DELETE_API_KEY);

  const { apiKeys } = useMemo(() => ({ apiKeys: get(data, "getApiKeys", []) }), [data]);

  const onDeleteRequested = ({ apiKey }) => {
    return deleteApiKey({
      variables: { id: apiKey.id }
    }).then(() => refetch());
  };

  if (error) {
    enqueueSnackbar(error.message, { variant: "error" });
    return null;
  }

  return (
    <Page loading={loading} data-testid="ApiKeyPage">
      <PageTitle
        crumbs={[
          {
            href: "/",
            label: t("Home"),
            Icon: HomeIcon
          },
          {
            label: t("Profile"),
            Icon: AccountBoxIcon
          },
          {
            label: t("Api Keys"),
            Icon: VpnKey
          }
        ]}
      />
      <div className={classes.root}>
        <Card className={classes.boxContent}>
          <CardHeader
            avatar={
              <Avatar className={classes.avatarHeader}>
                <VpnKey />
              </Avatar>
            }
            action={
              <SuccessButton
                variant="outlined"
                component={Link}
                to="/api-keys/new"
                data-testid="addNewApiKey"
              >
                <AddIcon />
                {!isXsScreen && t("Add API Key")}
              </SuccessButton>
            }
            title={t("API Keys")}
          />
          <CardContent className={classes.cardContent}>
            <ApiKeyTable
              apiKeys={apiKeys}
              onDeleteRequested={onDeleteRequested}
              isProcessing={isDeleting}
            />
          </CardContent>
        </Card>
      </div>
    </Page>
  );
}
