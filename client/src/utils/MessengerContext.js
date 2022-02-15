import React, { createContext, useContext, useState} from "react";

const MessengerContext = createContext();

export const useMessengerContext = () => useContext(MessengerContext);

export const MessengerProvider = ({ children }) => {
  const [messageUser, setMessageUser] = useState('');
  return (
    <MessengerContext.Provider value={{messageUser, setMessageUser}}>
      { children }
    </MessengerContext.Provider>
  )
};
