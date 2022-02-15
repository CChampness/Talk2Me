import React, { createContext, useContext, useState} from "react";

const GlobalContext = createContext();

export const useGlobalContext = () => useContext(GlobalContext);

export const GlobalProvider = ({ children }) => {
  const [messageUser, setMessageUser] = useState('');
  const [loggedInUser, setLoggedInUser] = useState('');
  return (
    <GlobalContext.Provider value={
      {messageUser, setMessageUser, loggedInUser, setLoggedInUser}
    }>
      { children }
    </GlobalContext.Provider>
  )
};

