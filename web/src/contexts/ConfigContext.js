import React, { useContext } from "react";

const Context = React.createContext(null);

export const useConfig = () => useContext(Context);
export default Context;
