import React, { createContext, useContext, useState} from "react";

const GlobalContext = createContext();

export const useGlobalContext = () => useContext(GlobalContext);

export const GlobalProvider = ({ children }) => {
  const [messageUser, setMessageUser] = useState('');
  const [loggedInUser, setLoggedInUser] = useState('');
  const [msgTgtName, setMsgTgtName] = useState('');
  const [msgTgtType, setMsgTgtType] = useState('');
  return (
    <GlobalContext.Provider value={
      {messageUser, setMessageUser,
       loggedInUser, setLoggedInUser,
       msgTgtName, setMsgTgtName,
       msgTgtType, setMsgTgtType
      }
    }>
      { children }
    </GlobalContext.Provider>
  )
};

