import React, { createContext, useState, useContext, useEffect } from "react";
import Quagga from "quagga";

const ScanContext = createContext();

export const MyContextProvider = ({ children }) => {
  const [result, setResult] = useState("");

  return (
    <ScanContext.Provider value={{ result, setResult }}>
      {children}
    </ScanContext.Provider>
  );
};

export const useMyContext = () => {
  return useContext(ScanContext);
};
