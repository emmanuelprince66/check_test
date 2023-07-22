import React from "react";
import BackArrow from "../../components/backArrow/BackArrow";
import "./Fwallet.css";
import exLogo from "../../images/exLogo.svg";
import copyIcon from "../../images/copyIcon.svg";
import { Box, Card, Typography } from "@mui/material";
import Navbar from "../../components/navbar/Navbar";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material";
import { AuthProvider } from "../../util/AuthContext";

import useUser from "../../hooks/useUser";

const Fwallet = () => {
  const navigate = useNavigate();
  const currentTheme = useTheme();

  const user = useUser();
  console.log(user.data);

  return (
    <AuthProvider>
      <div className="gpt3__fwallet">
        <div onClick={() => navigate(-1)}>
          <BackArrow />
        </div>

        <h6>Fund Wallet</h6>
        <p className="text-one">
          Fund your check wallet via your bank account.
        </p>

        <div className="gpt3__fwithdraw-details">
          <div>
            <img src={exLogo} alt="act-logo" />
          </div>

          <div>
            <p>
              The account details provided below is unique to your Check Retail
              Account.
            </p>
          </div>
        </div>

        <Typography
          sx={{
            fontWeight: 400,
            fontSize: "14px",
            lineHeight: "18px",
            color: currentTheme.palette.type === "light" ? "#1e1e1e" : "#fff",
            margin: "1rem 0 0.5rem",
            fontFamily: "raleWay",
          }}
        >
          1. &nbsp; Copy the account details provided below.
        </Typography>

        <Card
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "start",
            padding: "16px",
            background:
              currentTheme.palette.type === "light" ? "#f8f8f8" : "#1e1e1e",
            border: "1px solid #cdcdcd",
            borderRadius: "8px",
            gap: "16px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "5px",
            }}
          >
            <Typography
              variant="h4"
              sx={{
                fontWeight: 600,
                fontSize: "16px",
                lineHeight: "19px",
                display: "flex",
                alignItems: "center",
                color:
                  currentTheme.palette.type === "light" ? "#1e1e1e" : "#fff",
                fontFamily: "raleWay",
              }}
            >
              Bank Name
            </Typography>

            <Typography
              variant="h6"
              sx={{
                fontWeight: 400,
                fontSize: "14px",
                lineHeight: "16px",
                display: "flex",
                alignItems: "center",
                color:
                  currentTheme.palette.type === "light"
                    ? "#727272"
                    : " #727272",
                marginBottom: "1rem",
                fontFamily: "raleWay",
              }}
            >
              Providus Bank
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "5px",
            }}
          >
            <Typography
              variant="h4"
              sx={{
                fontWeight: 600,
                fontSize: "16px",
                lineHeight: "19px",
                display: "flex",
                alignItems: "center",
                color:
                  currentTheme.palette.type === "light" ? "#1e1e1e" : "#fff",
                fontFamily: "raleWay",
              }}
            >
              Your Acct Name
            </Typography>

            <Typography
              variant="h6"
              sx={{
                fontWeight: 400,
                fontSize: "14px",
                lineHeight: "16px",
                display: "flex",
                alignItems: "center",
                color: "#727272",
                marginBottom: "1rem",
                fontFamily: "raleWay",
              }}
            >
              {user.data ? user.data.firstName : ""}
            </Typography>
          </Box>

          <Typography
            variant="h6"
            sx={{
              fontWeight: 400,
              fontSize: "14px",
              display: "flex",
              alignItems: "center",
              color: "#727272",
              fontFamily: "raleWay",
            }}
          >
            Your Acct Number
          </Typography>

          <Box
            sx={{
              display: "flex",
              gap: "3px",
            }}
          >
            <Typography
              sx={{
                fontFamily: "raleWay",
                fontWeight: "600",
              }}
            >
              {user.data
                ? user.data.virtualAccountNumber === null
                  ? "NIL"
                  : user.data.virtualAccountNumber
                : "NIL"}
            </Typography>
            <img src={copyIcon} alt="" />
          </Box>
        </Card>

        <Typography
          sx={{
            fontWeight: 400,
            fontSize: "14px",
            lineHeight: "18px",
            color: currentTheme.palette.mode === "light" ? "#1e1e1e" : "#fff",
            margin: "1rem 0 0.5rem",
            fontFamily: "raleWay",
          }}
        >
          2. &nbsp; Your Check Retail wallet will be funded immediately.
        </Typography>
        <Typography
          sx={{
            fontWeight: 400,
            fontSize: "14px",
            lineHeight: "18px",
            color: currentTheme.palette.mode === "light" ? "#1e1e1e" : "#fff",
            margin: "1rem 0 0.5rem",
            fontFamily: "raleWay",
          }}
        >
          3. &nbsp; Transfer the amount you want to fund, using Mobile Banking.
        </Typography>

        <Navbar />
      </div>
    </AuthProvider>
  );
};

export default Fwallet;
