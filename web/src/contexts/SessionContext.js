import React, { useContext } from "react";

const SessionContext = React.createContext(null);
export const useSession = () => useContext(SessionContext);
export default SessionContext;
