import React from "react";
import { Typography, Box, Card } from "@mui/material";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@emotion/react";
import notrans from "../images/practise/notrans.svg";

const NoResult = ({ notification, mainText, smallText, btn, buttonText }) => {
  const currentTheme = useTheme();
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        width: "100%",
      }}
    >
      <Typography
        variant="h2"
        sx={{
          fontFamily: "raleWay",
          color: currentTheme.palette.type === "light" ? "#000" : "#000",
          fontWeight: 600,
          fontSize: "24px",
        }}
      >
        {mainText}
      </Typography>

      <Box
        sx={{
          minWidth: "100%",
          minHeight: "60vh",
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <img src={notrans} alt="no-trans-image" />

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            marginTop: "1.3rem",
          }}
        >
          <Typography
            sx={{
              fontFamily: "raleWay",
              color: currentTheme.palette.type === "light" ? "#000" : "#000",
              fontWeight: 600,
              fontSize: "28.18px",
            }}
          >
            {notification}
          </Typography>

          <Typography
            sx={{
              fontFamily: "raleWay",
              color:
                currentTheme.palette.type === "light" ? "#727272" : "#727272",
              fontWeight: 400,
              fontSize: "16px",
              lineHeight: "18.78px",
              letterSpacing: "3%",
            }}
          >
            {smallText}
          </Typography>
        </Box>

        {btn && (
          <Button
            sx={{
              background:
                currentTheme.palette.type === "light" ? "#dc0019" : "#dc0019",
              width: "327px",
              height: "48px",
              textTransform: "capitalize",
              padding: "10px",
              borderRadius: "8px",
              color: "#fff",
              "&:hover": {
                backgroundColor:
                  currentTheme.palette === "light" ? "#dc0019" : "#dc0019",
              },
              fontFamily: "raleWay",
              marginTop: "2rem",
            }}
          >
            {buttonText}
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default NoResult;
