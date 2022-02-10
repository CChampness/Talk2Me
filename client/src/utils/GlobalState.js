import React, { createContext, useContext } from "react";

const MessengerContext = createContext();
const { Provider } = MessengerContext;

const MessengerProvider = (messageUser) => {
  console.log("messageUser: ",messageUser);
  localStorage.setItem("messageUser", messageUser);
  return <Provider value={messageUser} />;
};

const useMessengerContext = () => {
  return localStorage.getItem("messageUser"); //useContext(MessengerContext);
};

export { MessengerProvider, useMessengerContext };
