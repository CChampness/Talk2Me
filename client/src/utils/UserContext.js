import React, { createContext, useContext, useState} from "react";

const UserContext = createContext();

export const useUserContext = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState('');
  return (
    <UserContext.Provider value={{currentUser, setCurrentUser}}>
      { children }
    </UserContext.Provider>
  )
};
