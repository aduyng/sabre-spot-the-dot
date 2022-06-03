import React, { lazy, Suspense } from "react";
import { BrowserRouter as RRDRouter, Switch, Route } from "react-router-dom";
import CenteredLayout from "../layouts/CenteredLayout";
import PrivateRouteWithFullLayout from "./PrivateRouteWithFullLayout";

const PageLoader = lazy(() => import("../components/PageLoader"));
const ProjectView = lazy(() => import("../pages/Project/ProjectView"));
const JobView = lazy(() => import("../pages/Job/JobView"));
const LaunchView = lazy(() => import("../pages/Launch/LaunchView"));

const Login = lazy(() => import("../pages/Login/Login"));
const Home = lazy(() => import("../pages/Home/Home"));

const AccountApiKeys = lazy(() => import("../pages/Profile/ApiKey/ApiKeyList"));
const AccountApiKeysNew = lazy(() => import("../pages/Profile/ApiKey/ApiKeyNew"));

export default function Router() {
  return (
    <RRDRouter>
      <Suspense fallback={<PageLoader />}>
        <Switch>
          <PrivateRouteWithFullLayout path="/projects/:projectId/jobs/:jobId/launches/:launchId/screenshots">
            <LaunchView />
          </PrivateRouteWithFullLayout>
          <PrivateRouteWithFullLayout path="/projects/:projectId/jobs/:jobId/launches">
            <JobView />
          </PrivateRouteWithFullLayout>
          <PrivateRouteWithFullLayout path="/projects/:projectId/jobs">
            <ProjectView />
          </PrivateRouteWithFullLayout>
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
