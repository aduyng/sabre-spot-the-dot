import React from "react";
import { oneOfType, node, arrayOf, string } from "prop-types";
import FullLayout from "../layouts/FullLayout";
import PrivateRoute from "./PrivateRoute";

export default function PrivateRouteWithFullLayout({ children, ...props }) {
  const { path } = props;
  return (
    <PrivateRoute {...props}>
      <FullLayout matchingPath={path}>{children}</FullLayout>
    </PrivateRoute>
  );
}

PrivateRouteWithFullLayout.propTypes = {
  children: oneOfType([arrayOf(node), node]).isRequired,
  path: string.isRequired
};
