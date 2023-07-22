import React, { createContext, useState, useContext, useEffect } from "react";
import Quagga from "quagga";

const ScanContext = createContext();

export const MyContextProvider = ({ children }) => {
  const [result, setResult] = useState("");
  // useEffect(() => {
  //   Quagga.init(
  //     {
  //       inputStream: {
  //         name: "Live",
  //         type: "LiveStream",
  //         target: document.querySelector("#scanner-container"),
  //         constraints: {
  //           facingMode: "environment", // or user
  //         },
  //       },
  //       frequency: 5,
  //       decoder: {
  //         readers: ["ean_reader"], // Specify the barcode format(s) you want to scan
  //       },
  //     },
  //     (err) => {
  //       if (err) {
  //         console.error("Error initializing Quagga:", err);
  //         return;
  //       }
  //       Quagga.start();
  //     }
  //   );

  //   Quagga.onDetected((data) => {
  //     setResult(data.codeResult.code);
  //   });

  //   return () => {
  //     Quagga.stop();
  //   };
  // }, []);
  return (
    <ScanContext.Provider value={{ result }}>{children}</ScanContext.Provider>
  );
};

export const useMyContext = () => {
  return useContext(ScanContext);
};
