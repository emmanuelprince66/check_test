import React from "react";
import InfoRoundedIcon from "@mui/icons-material/InfoRounded";
import { Divider, useTheme } from "@mui/material";
import { Box, Typography } from "@mui/material";
import useUser from "../hooks/useUser";
import FormattedPrice from "./FormattedPrice";

const InsufficientFund = ({ totalPrice }) => {
  const currentTheme = useTheme();
  const user = useUser();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "1rem",
        marginY: "1rem",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: "5px" }}>
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
        >
          Insufficent Balance
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "10px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "start",
            borderRight: "1px solid #E8E5E5",
            paddingRight: "1.5rem",
          }}
        >
          <Typography
            sx={{
              fontFamily: "raleWay",
              fontWeight: 600,
              fontSize: "14px",
              textAlign: "center",
              color:
                currentTheme.palette.type === "light" ? "#727272" : "#727272",
            }}
            id="modal-modal-title"
          >
            Wallet Balance
          </Typography>

          <Typography
            sx={{
              fontFamily: "raleWay",
              fontWeight: 1000,
              fontSize: "18px",
              textAlign: "center",
              color:
                currentTheme.palette.type === "light" ? "#C57600" : "#C57600",
            }}
            id="modal-modal-title"
          >
            {user.data ? <FormattedPrice amount={user.data.balance} /> : ""}
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "end",
            paddingLeft: "1rem",
          }}
        >
          <Typography
            sx={{
              fontFamily: "raleWay",
              fontWeight: 600,
              fontSize: "14px",
              textAlign: "center",
              color:
                currentTheme.palette.type === "light" ? "#727272" : "#727272",
            }}
            id="modal-modal-title"
          >
            Amount to Pay
          </Typography>

          <Typography
            sx={{
              fontFamily: "raleWay",
              fontWeight: 1000,
              fontSize: "18px",
              textAlign: "center",
              color:
                currentTheme.palette.type === "light" ? "#C57600" : "#C57600",
            }}
            id="modal-modal-title"
          >
            {user.data ? <FormattedPrice amount={totalPrice} /> : ""}
          </Typography>
        </Box>

        {/* 
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "start",
          }}
        >
          <Typography
            sx={{
              fontFamily: "raleWay",
              fontWeight: 600,
              fontSize: "14px",
              textAlign: "center",
              color: currentTheme.palette.type === "light" ? "#000" : "#000",
            }}
            id="modal-modal-title"
          >
            Wallet Balance
          </Typography>

          <Typography
            sx={{
              fontFamily: "raleWay",
              fontWeight: 1000,
              fontSize: "18px",
              textAlign: "center",
              color:
                currentTheme.palette.type === "light" ? "#C57600" : "#C57600",
            }}
            id="modal-modal-title"
          >
            {user.data ? <FormattedPrice amount={user.data.balance} /> : ""}
          </Typography>
        </Box> */}
      </Box>
    </Box>
  );
};

export default InsufficientFund;
