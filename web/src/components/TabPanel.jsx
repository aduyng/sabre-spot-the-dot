import React from "react";
import { arrayOf, node, oneOfType, string, number } from "prop-types";

export default function TabPanel({ id, children, value, index, ...other }) {
  return (
    <div role="tabpanel" hidden={value !== index} id={`${id}-${index}`} {...other}>
      {value === index && children}
    </div>
  );
}

TabPanel.propTypes = {
  id: string.isRequired,
  children: oneOfType([arrayOf(node), node]).isRequired,
  index: number.isRequired,
  value: number.isRequired
};
