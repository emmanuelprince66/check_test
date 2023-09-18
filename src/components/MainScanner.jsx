import React from "react";
import Navbar from "./navbar/Navbar";
import Qrscanner from "./Qrscanner";
import {
  Box,
  CircularProgress,
  Container,
  Typography,
  Button,
} from "@mui/material";
import SuperMrktScanner from "./SuperMrktScanner";

const MainScanner = () => {
  return (
    <Box
      sx={{
        maxWidth: "31%",
        mx: "auto",
        marginTop: "1rem",
        maxWidth: { xs: "100%", sm: "80%", md: "31%" },
        padding: "1rem",
      }}
    >
      {/* You can create like a tab here where the user can select if he wants to scan 
      for supermarket or resturant*/}
      {/* tabs start */}
      <Box> Add the tab here</Box>
      {/* tabs ends */}
      {/* supermarket scanner */}
      <Box>
        <SuperMrktScanner />
      </Box>
      {/* supermarket scanner  ends*/}
      <Navbar />
    </Box>
  );
};

export default MainScanner;
