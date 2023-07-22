import React from "react";
import { useState } from "react";
import halfIcon from "../../images/halfIcon.svg";
import sideArrowColor from "../../images/sideArrowColor.svg";
import padIcon from "../../images/padIcon.svg";
import wallet from "../../images/wallet.svg";
import upColor from "../../images/upColor.svg";
import leftArrow from "../../images/arrowLeft.svg";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import "./Wallet.css";
import BackArrow from "../../components/backArrow/BackArrow";
import { Link } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";
import Visibility from "@mui/icons-material/Visibility";
import Acctbox from "../../components/acctbox/Acctbox";
import { Card, Box, Typography } from "@mui/material";
import { useTheme } from "@mui/material";
import { AuthProvider } from "../../util/AuthContext";

import { useLocation } from "react-router-dom";

const walletItems = [
  {
    id: 1,
    icon: wallet,
    title: "Fund my wallet",
    small: "Add money to perform trasactions",
    direction: leftArrow,
    pathname: "/fwallet",
  },
  {
    id: 2,
    icon: sideArrowColor,
    title: "Transfer",
    small: "Pay merchant/Transfer funds to friends",
    direction: leftArrow,
    pathname: "/wtransfer",
  },
  {
    id: 3,
    icon: upColor,
    title: "Withdraw",
    small: "Get money back to your bank account",
    direction: leftArrow,
    pathname: "/fwithdraw",
  },
  {
    id: 4,
    icon: padIcon,
    title: "Airtime & Data",
    small: "Top your line",
    direction: leftArrow,
    pathname: "/frecharge",
  },
  {
    id: 5,
    icon: halfIcon,
    title: "Pay your bills",
    small: "Pay utility bills",
    direction: leftArrow,
    pathname: "/paybills",
  },
];

const Wallet = () => {
  const currentTheme = useTheme();

  return (
    <AuthProvider>
      <div className="gpt3__wallet">
        <BackArrow destination={"/home"} />

        <h6>My Wallet</h6>

        {/* header */}
        <Acctbox />

        {walletItems.map((item) => {
          return (
            <Link to={item.pathname} key={item.id}>
              <Card
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "16px",
                  gap: "16px",
                  boxShadow: "0px 4px 20px 10px rgba(0, 0, 0, 0.05)",
                  backgroundColor:
                    currentTheme.palette.type === "light" ? "#fff" : "#1E1E1E",
                  borderRadius: "8px",
                  height: "76px",
                  marginTop: "1rem",
                }}
                key={item.id}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                  }}
                >
                  <img src={item.icon} alt="wallet-icon" />
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "start",
                      justifyContent: "center",
                      gap: "7px",
                    }}
                  >
                    <Typography
                      sx={{
                        fontFamily: "raleWay",
                        fontSize: "16px",
                        fontWeight: 600,
                        //  color:currentTheme.palette.mode = 'light' ? "#1e1e1e" : "#ffff"
                      }}
                    >
                      {item.title}
                    </Typography>
                    <Typography
                      sx={{
                        fontFamily: "raleWay",
                        fontSize: "10px",
                        fontWeight: 500,
                        //  , color:currentTheme.palette.mode = 'light' ? "#727272" :"#ffff"
                      }}
                    >
                      {item.small}
                    </Typography>
                  </Box>
                </Box>

                <Box>
                  <img src={item.direction} alt="wallet-arrow" />
                </Box>
              </Card>
            </Link>
          );
        })}

        {/* NAVBAR */}
        <Navbar />
      </div>
    </AuthProvider>
  );
};

export default Wallet;
