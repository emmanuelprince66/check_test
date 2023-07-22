import React, { useEffect, useState } from "react";
import QRCode from "react-qr-code";
import useUser from "../hooks/useUser";
import { Box, Typography } from "@mui/material";
import { useTheme } from "@mui/material";

const QrCode = () => {
  const [value, setValue] = useState("");
  const currentTheme = useTheme();

  const user = useUser();

  useEffect(() => {
    setValue(user.data.id);
  }, []);

  return (
    <Box
      sx={{
        textAlign: "center",
      }}
    >
      <Box>
        <Typography
          sx={{
            fontFamily: "raleWay",
            fontWeight: "900",
            fontSize: "18px",
            color: currentTheme.palette.type === "light" ? "#000" : "#EEEEEE",
            marginBottom: "1rem",
          }}
        >
          My Qr Code
        </Typography>
      </Box>

      <QRCode
        size={256}
        style={{ height: "15rem", width: "15rem" }}
        value={value}
        viewBox={`0 0 256 256`}
      />
    </Box>
  );
};

export default QrCode;
