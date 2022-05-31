import React, { lazy, Suspense } from "react";
import { BrowserRouter as RRDRouter, Switch, Route } from "react-router-dom";
import CenteredLayout from "../layouts/CenteredLayout";
import PrivateRouteWithFullLayout from "./PrivateRouteWithFullLayout";

import PageLoader from "../components/PageLoader";

const Login = lazy(() => import("../pages/Login/Login"));
const Home = lazy(() => import("../pages/Home/Home"));

const AccountApiKeys = lazy(() => import("../pages/Profile/ApiKey/ApiKeyList"));
const AccountApiKeysNew = lazy(() => import("../pages/Profile/ApiKey/ApiKeyNew"));

export default function Router() {
  return (
    <RRDRouter>
      <Suspense fallback={<PageLoader />}>
        <Switch>
          <PrivateRouteWithFullLayout path="/api-keys/new">
            <AccountApiKeysNew />
          </PrivateRouteWithFullLayout>
          <PrivateRouteWithFullLayout path="/api-keys">
            <AccountApiKeys />
          </PrivateRouteWithFullLayout>
          <Route exact path="/login">
            <CenteredLayout>
              <Login />
            </CenteredLayout>
          </Route>
          <PrivateRouteWithFullLayout path="*">
            <Home />
          </PrivateRouteWithFullLayout>
        </Switch>
      </Suspense>
    </RRDRouter>
  );
}
