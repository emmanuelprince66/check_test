import React from "react";
import Navbar from "./navbar/Navbar";
import Qrscanner from "./Qrscanner";
import { Box, CircularProgress, Typography, Button } from "@mui/material";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";

const SuperMrktScanner = () => {
  const [showScanner, setShowScanner] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setShowScanner(true);
    }, 4000);
  }, []);

  return (
    <div>
      {/* Scanner*/}

      <Box
        sx={{
          maxHeight: "19rem",
          overflow: "hidden",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: "20px",
          marginBottom: "20%",

          padding: "1rem",
        }}
      >
        {showScanner ? (
          <Qrscanner />
        ) : (
          <CircularProgress
            size="3.5rem"
            sx={{
              marginTop: "3rem",
            }}
            color="error"
          />
        )}
      </Box>

      {/* Scanner */}
      <ToastContainer />

      <Navbar />
    </div>
  );
};

export default SuperMrktScanner;
