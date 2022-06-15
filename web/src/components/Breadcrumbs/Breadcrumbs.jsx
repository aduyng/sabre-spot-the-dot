import React, { useMemo } from "react";
import Typography from "@material-ui/core/Typography";
import MuiBreadcrumbs from "@material-ui/core/Breadcrumbs";
import Link from "@material-ui/core/Link";
import map from "lodash/map";
import size from "lodash/size";
import last from "lodash/last";
import { arrayOf, elementType, shape, string } from "prop-types";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: theme.spacing(1)
  },
  icon: {
    marginRight: theme.spacing(0.25),
    marginBottom: -theme.spacing(0.25),
    width: theme.spacing(2),
    height: theme.spacing(2)
  }
}));

function createOnCrumbClickHandler({ href, history, method }) {
  return event => {
    event.preventDefault();
    if (method === "replace") {
      return history.replace(href);
    }

    return history.push(href);
  };
}

export default function Breadcrumbs({ crumbs }) {
  const history = useHistory();
  const classes = useStyles();
  const isXSScreenSizeAndDown = useMediaQuery(theme => theme.breakpoints.down("xs"));
  const isSmallScreenSizeAndDown = useMediaQuery(theme => theme.breakpoints.down("sm"));
  const maxIndex = useMemo(() => size(crumbs) - 1, [crumbs]);

  if (isXSScreenSizeAndDown) {
    const lastCrumb = last(crumbs);

    return (
      <MuiBreadcrumbs className={classes.root}>
        return (
        <Typography color="primary">
          <lastCrumb.Icon className={classes.icon} color="primary" />
          <span>{lastCrumb.label}</span>
        </Typography>
        );
      </MuiBreadcrumbs>
    );
  }

  if (isSmallScreenSizeAndDown) {
    return (
      <MuiBreadcrumbs className={classes.root}>
        {map(crumbs, ({ href, label, method, Icon, title }, index) => {
          const key = href || label;
          if (index < maxIndex) {
            if (!href) {
              return (
                <Typography key={key} color="textSecondary" title={title}>
                  <Icon className={classes.icon} />
                </Typography>
              );
            }

            return (
              <Link
                key={key}
                title={title}
                color="inherit"
                href={href}
                onClick={createOnCrumbClickHandler({ href, history, method })}
              >
                <Icon className={classes.icon} />
              </Link>
            );
          }

          return (
            <Typography key={key} color="primary" title={title}>
              <Icon className={classes.icon} color="primary" />
              <span>{label}</span>
            </Typography>
          );
        })}
      </MuiBreadcrumbs>
    );
  }

  return (
    <MuiBreadcrumbs className={classes.root}>
      {map(crumbs, ({ href, label, method, Icon, title }, index) => {
        const key = href || label;
        if (index < maxIndex) {
          if (!href) {
            return (
              <Typography key={key} color="textSecondary" title={title}>
                <Icon className={classes.icon} />
                <span>{label}</span>
              </Typography>
            );
          }

          return (
            <Link
              key={key}
              color="inherit"
              href={href}
              title={title}
              onClick={createOnCrumbClickHandler({ href, history, method })}
            >
              <Icon className={classes.icon} />
              <span>{label}</span>
            </Link>
          );
        }

        return (
          <Typography key={key} color="primary" title={title}>
            <Icon className={classes.icon} color="primary" />
            <span data-value="lastBreadcrumbLabel">{label}</span>
          </Typography>
        );
      })}
    </MuiBreadcrumbs>
  );
}

Breadcrumbs.propTypes = {
  crumbs: arrayOf(
    shape({
      href: string,
      method: string,
      label: string.isRequired,
      Icon: elementType.isRequired,
      title: string
    })
  ).isRequired
};
