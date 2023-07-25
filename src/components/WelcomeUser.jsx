import React from "react";
import { Card, Box, Typography } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import checkLogo from "../images/checkLogo.svg";
import { useTheme } from "@mui/material";
import { useState, useEffect } from "react";
import useSuperMarket from "../hooks/useSuperMarket";

const WelcomeUser = () => {
  const currentTheme = useTheme();
  const [superMarketKey, setSuperMarketKey] = useState("");
  const superMarket = useSuperMarket(superMarketKey);

  useEffect(() => {
    const val = localStorage.getItem("myData");
    val ? setSuperMarketKey(val) : "";
  }, []);
  return (
    <Box
      sx={{
        display: "flex",
        height: "100%",
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        gap: "1rem",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "end",
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            height: "-20rem",
          }}
        >
          <img src={checkLogo} className="checkLogo" alt="check-retail-logo" />
        </Box>

        <Typography
          variant="h2"
          sx={{
            marginTop: "-2.4rem",
            fontFamily: "raleWay",
            letterSpacing: "0.2em",
            color:
              currentTheme.palette.type === "light" ? "#000000" : "#EEEEEE",
            fontSize: "10px",
          }}
        >
          RETAIL
        </Typography>
      </Box>

      <Box
        sx={{
          marginBottom: "1rem",
          marginTop: "2rem",
        }}
      >
        <Typography
          variant="h2"
          sx={{
            fontFamily: "raleWay",
            letterSpacing: "0.2em",
            color:
              currentTheme.palette.type === "light" ? "#000000" : "#EEEEEE",
            fontSize: "15px",
            fontWeight: "500",
          }}
        >
          Welcome to
        </Typography>
      </Box>
      <Box>
        <Typography
          variant="h2"
          sx={{
            fontFamily: "raleWay",
            letterSpacing: "0.2em",
            color:
              currentTheme.palette.type === "light" ? "#000000" : "#EEEEEE",
            fontSize: "19px",
            fontWeight: "1000",
          }}
        >
          {superMarket.data ? (
            superMarket.data.companyName
          ) : (
            <CircularProgress size="1.5rem" color="error" />
          )}
        </Typography>
      </Box>
    </Box>
  );
};

export default WelcomeUser;
