// MyContext.js
import React, { createContext, useState, useContext } from 'react';

const MyContext = createContext();

export const MyContextProvider = ({ children }) => {
  const [globalVariable, setGlobalVariable] = useState("en");

  return (
    <MyContext.Provider value={{ globalVariable, setGlobalVariable }}>
      {children}
    </MyContext.Provider>
  );
};

export const useGlobalVariable = () => useContext(MyContext);
