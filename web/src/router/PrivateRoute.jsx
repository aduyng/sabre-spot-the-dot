import React from "react";
import { Route, Redirect } from "react-router-dom";
import { oneOfType, node, arrayOf } from "prop-types";
import { useSession } from "../contexts/SessionContext";

export default function PrivateRoute({ children, ...rest }) {
  const session = useSession();
  return (
    <Route
      {...rest}
      render={({ location }) => {
        if (!session) {
          return (
            <Redirect
              to={{
                pathname: `/login`,
                state: { from: location }
              }}
            />
          );
        }
        return children;
      }}
    />
  );
}

PrivateRoute.propTypes = {
  children: oneOfType([arrayOf(node), node]).isRequired
};
