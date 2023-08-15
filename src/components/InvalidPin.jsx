import React from "react";
import InfoRoundedIcon from "@mui/icons-material/InfoRounded";
import { useTheme } from "@mui/material";
import { Box, Typography } from "@mui/material";

const InvalidPin = () => {
  const currentTheme = useTheme();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "1rem",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: "3px" }}>
        <InfoRoundedIcon sx={{ color: "#dc0019" }} />

        <Typography
          sx={{
            fontFamily: "raleWay",
            fontWeight: 1000,
            fontSize: "16px",
            textAlign: "center",
            color:
              currentTheme.palette.type === "light" ? "#dc0019" : "#dc0019",
          }}
          id="modal-modal-title"
        >
          invalid pin
        </Typography>
      </Box>
      <Box>
        <Typography
          sx={{
            fontFamily: "raleWay",
            fontWeight: 600,
            fontSize: "13px",
            textAlign: "center",
            width: "80%",
            mx: "auto",
            color:
              currentTheme.palette.type === "light" ? "#1E1E1E" : "#dc0019",
          }}
          id="modal-modal-title"
        >
          You entered an incorrect PIN kindly retry .If you have forgotten your
          PIN , click "forgot PIN" to reset it.
        </Typography>
      </Box>
    </Box>
  );
};

export default InvalidPin;
