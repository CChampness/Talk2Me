import React, { createContext, useContext, useState} from "react";

const MessengerContext = createContext();
const { Provider } = MessengerContext;

const MessengerProvider = () => {
  const [messageUser, setMessageUser] = useState('');
  return <Provider value={{messageUser, setMessageUser}} />;
};

const useMessengerContext = () => {
  return useContext(MessengerContext);
};

export { MessengerProvider, useMessengerContext };
