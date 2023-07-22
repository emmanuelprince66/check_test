import React from "react";
import { Typography, Box, Card } from "@mui/material";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@emotion/react";

const NoResult = ({ notification, smallText, buttonText, linkText }) => {
  const currentTheme = useTheme();
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        width: "100%",
      }}
    >
      <Card
        sx={{
          width: "100%",
          background: "  rgba(197, 118, 0, 0.1);",
          padding: "1rem",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: "6px",
        }}
      >
        <Typography
          sx={{
            fontFamily: "raleWay",
            fontWeight: "900",
            fontSize: "15px",
          }}
        >
          {notification}
        </Typography>
        <Typography
          sx={{
            fontFamily: "raleWay",
            fontWeight: "400",
            fontSize: "10px",
          }}
        >
          {smallText}
        </Typography>

        <Box
          sx={{
            width: "100%",
            my: "0.5rem",
          }}
        >
          <Button
            onClick={() => navigate(linkText)}
            sx={{
              background:
                currentTheme.palette.type === "light" ? "#dc0019" : "#dc0019",
              width: "95%",
              padding: "10px",
              borderRadius: "8px",
              color: "#fff",
              "&:hover": {
                backgroundColor:
                  currentTheme.palette === "light" ? "#dc0019" : "#dc0019",
              },
              fontFamily: "raleWay",
            }}
          >
            {buttonText}
          </Button>
        </Box>
      </Card>
    </Box>
  );
};

export default NoResult;
