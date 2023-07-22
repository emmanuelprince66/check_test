import React from "react";
import Quagga from "quagga";
import { useState } from "react";
import QrReader from "react-qr-scanner";
import { Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Qrscanner = () => {
  const [result, setResult] = useState("");
  const navigate = useNavigate();

  const handleQrScan = (data) => {
    if (data) {
      setResult(data.text);
      navigate(`/scan/${data.text}`);
      // Handle the detected QR code as per your application's requirements
    }
  };

  const handleError = (err) => {
    console.log(err);
  };
  return (
    <Box>
      <QrReader
        delay={300}
        onError={handleError}
        onScan={handleQrScan}
        style={{ maxWidth: "100%", maxHeight: "100%" }}
        constraints={{
          video: { facingMode: "environment" },
        }}
      />
    </Box>
  );
};

export default Qrscanner;
