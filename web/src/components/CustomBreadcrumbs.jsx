import React from "react";
import { useHistory } from "react-router-dom";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import { string, arrayOf, shape } from "prop-types";
import Link from "@material-ui/core/Link";

export default function CustomBreadcrumbs({ items, ...props }) {
  const history = useHistory();

  const createOnClickHandler = to => event => {
    event.preventDefault();
    return history.push(to);
  };

  return (
    <Breadcrumbs {...props}>
      {items.map(({ to, name, ...itemProps }) => (
        <Link key={to} {...itemProps} color="inherit" href={to} onClick={createOnClickHandler(to)}>
          {name}
        </Link>
      ))}
    </Breadcrumbs>
  );
}

CustomBreadcrumbs.propTypes = {
  items: arrayOf(shape({ to: string.isRequired, name: string.isRequired })).isRequired
};
