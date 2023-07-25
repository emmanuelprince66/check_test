import React from "react";
import { useState } from "react";
import QrReader from "react-qr-scanner";
import { Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Dialog } from "@mui/material";
import { Slide } from "@mui/material";
import WelcomeUser from "./WelcomeUser";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Qrscanner = () => {
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);

  const welcomeUser = () => {
    setOpen(true);

    setTimeout(() => {
      handleClose();
      navigate("/scan");
    }, 3000);
  };

  const handleQrScan = (data) => {
    if (data) {
      localStorage.setItem("myData", data.text);
      welcomeUser();
    }
  };

  const handleError = (err) => {
    console.log(err);
  };
  return (
    <Box>
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

      {/* Dialouge full screen modal start */}
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <WelcomeUser />
      </Dialog>

      {/* Dialouge full screen modal end */}
    </Box>
  );
};

export default Qrscanner;
