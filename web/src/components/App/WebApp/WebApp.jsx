import React, { useMemo } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import { ApolloProvider, useQuery } from "@apollo/react-hooks";
import { SnackbarProvider } from "notistack";
import isEmpty from "lodash/isEmpty";
import DateFnsUtils from "@date-io/date-fns";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import { makeStyles } from "@material-ui/core/styles";
import ConfiguredApp from "./ConfiguredApp/ConfiguredApp";
import createTheme from "../../../styles/theme";
import ConfigContext from "../../../contexts/ConfigContext";
import PageLoader from "../../PageLoader";
import createClient from "../../../graphql/createClient";
import "../../../i18n/i18n";
import NewVersionNotice from "../../NewVersionNoticeDialog/NewVersionNoticeDialog";
import globalConfig from "./global.json";
import GET_CONFIGURATION_QUERY from "./GET_CONFIGURATION.gql";

const client = createClient();

const useStyles = makeStyles(() => ({
  snackBar: {
    whiteSpace: "break-spaces"
  }
}));

export default function App() {
  const classes = useStyles();
  const { loading: isConfigurationLoading, data: configuration } = useQuery(
    GET_CONFIGURATION_QUERY,
    { client }
  );

  const { theme, config } = useMemo(() => {
    const t = createTheme();
    if (!configuration) {
      return { theme: t };
    }

    const cfg = {
      ...configuration.config,
      ...globalConfig
    };
    return { config: cfg, theme: t };
  }, [configuration]);

  const showLoading = isConfigurationLoading || isEmpty(configuration);
  return (
    <DndProvider backend={HTML5Backend}>
      <ThemeProvider theme={theme}>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <ApolloProvider client={client}>
            <ConfigContext.Provider value={config}>
              {showLoading ? (
                <PageLoader center />
              ) : (
                <SnackbarProvider
                  maxSnack={5}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "center"
                  }}
                  autoHideDuration={config.toastAutoHideDuration || 5000}
                  classes={{
                    root: classes.snackBar
                  }}
                >
                  <CssBaseline />
                  <ConfiguredApp />
                  <NewVersionNotice />
                </SnackbarProvider>
              )}
            </ConfigContext.Provider>
          </ApolloProvider>
        </MuiPickersUtilsProvider>
      </ThemeProvider>
    </DndProvider>
  );
}
