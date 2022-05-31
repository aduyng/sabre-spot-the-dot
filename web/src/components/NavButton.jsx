import React from "react";
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router-dom";
import { string, func } from "prop-types";

export default function NavButton({ to, onClick, ...props }) {
  const history = useHistory();
  const defaultClickHandler = () => history.push(to);
  const clickHandler = onClick || defaultClickHandler;
  return <Button {...props} onClick={clickHandler} />;
}

NavButton.propTypes = {
  to: string.isRequired,
  onClick: func
};

NavButton.defaultProps = {
  onClick: undefined
};
