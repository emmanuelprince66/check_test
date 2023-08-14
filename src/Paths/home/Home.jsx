import React from "react";
import "./Home.css";
import notiLogo from "../../images/notiLogo.svg";
import groupLogo from "../../images/groupLogo.svg";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import plusLogo from "../../images/plusLogo.svg";
import HomeCard from "../../components/homecard/HomeCard";
import Qacess from "../../components/qaccess/Qacess";
import Navbar from "../../components/navbar/Navbar";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Card, Box, Typography } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import FormattedPrice from "../../components/FormattedPrice";

import QrCodeRoundedIcon from "@mui/icons-material/QrCodeRounded";
import NotificationsRoundedIcon from "@mui/icons-material/NotificationsRounded";
import { useLocation } from "react-router-dom";

import exclamgreen from "../../images/practise/exclamgreen.svg";

import { useTheme } from "@mui/material";
import { AuthProvider } from "../../util/AuthContext";
import useUser from "../../hooks/useUser";
import Scanner from "../../components/scanner/Scanner";
import Qrscanner from "../../components/Qrscanner";
import { Link } from "react-router-dom";
import Acctbox from "../../components/acctbox/Acctbox";

const Home = () => {
  const currentTheme = useTheme();
  const navigate = useNavigate();
  const [isTextVisible, setIsTextVisible] = useState(false);

  const user = useUser();
  console.log(user.data);

  return (
    <AuthProvider>
      <div className="gpt3__home">
        {/* <Card
          sx={{
            height: "92px",
            width: "100%",
            borderRadius: "16px",
            padding: "0.5rem",
            marginY: "1rem",
            backgroundColor:
              currentTheme.palette.type === "light" ? "#FFEDED" : "#2C2C2E",
          }}
        >
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "start",
            }}
          >
            <Box>
              {!isTextVisible ? (
                <Typography
                  sx={{
                    fontFamily: "raleWay",
                    fontWeight: "600",
                    fontSize: "18px",
                  }}
                >
                  ******************
                </Typography>
              ) : (
                <Typography
                  sx={{
                    fontFamily: "raleWay",
                    fontWeight: "600",
                    fontSize: "18px",
                  }}
                >
                  {user.data ? (
                    <FormattedPrice amount={user.data.balance} />
                  ) : (
                    <CircularProgress />
                  )}
                </Typography>
              )}
            </Box>

            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
                alignItems: "end",
                width: "100%",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  borderRadius: "8px",
                  backgroundColor: "rgba(220, 0, 25, 0.1)",
                  padding: "4px 8px 4px 8px",
                }}
              >
                {isTextVisible ? (
                  <Visibility
                    sx={{ color: "#C57600", fontSize: "15px" }}
                    onClick={() => setIsTextVisible(false)}
                  />
                ) : (
                  <VisibilityOff
                    sx={{ color: "#C57600", fontSize: "15px" }}
                    onClick={() => setIsTextVisible(true)}
                  />
                )}
                <Typography
                  sx={{
                    fontWeight: "400",
                    fontSize: "10px",
                    color:
                      currentTheme.palette.type === "light"
                        ? "#1e1e1e"
                        : "#ffff",
                    letterSpacing: "-0.24px",
                    fontFamily: "raleWay",
                    paddingTop: "1px",
                  }}
                >
                  Show Balance
                </Typography>
              </Box>
              <Box
                sx={{
                  height: "36px",
                  background:
                    "linear-gradient(180deg, #31DC61 0%, #19953C 100%)",
                  borderRadius: "8px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "0.5rem",
                  width: "103px",
                  marginTop: "1rem",
                }}
              >
                <img src={plusLogo} alt="plus-logo" />
                <Link to="/fwallet">
                  <Typography
                    sx={{
                      color: "#fff",
                      fontSize: "12px",
                      fontFamily: "raleWay",
                    }}
                  >
                    Fund Wallet
                  </Typography>
                </Link>
              </Box>
            </Box>
          </Box>
        </Card> */}

        <Acctbox />

        {/* Header */}

        {/* CARD */}

        <Card
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "0.3rem",
            gap: "7px",
            borderRadius: "11px",
            width: "100%",
            marginBottom: "2rem",
            marginTop: "1rem",
            backgroundColor:
              currentTheme.palette.type === "light"
                ? "rgba(232, 229, 229, 1)"
                : "#2C2C2E",
          }}
        >
          <img src={exclamgreen} alt="ex" />
          <Typography
            sx={{
              color: currentTheme.palette.type === "light" ? "#000" : "#fff",
              paddingTop: "1px",
              fontFamily: "raleWay",
              fontWeight: "400",
              fontSize: "16px",
            }}
          >
            Scan Qr code to start shopping.
          </Typography>
        </Card>

        {/* Scanner*/}

        <Box
          sx={{
            maxHeight: "19rem",
            overflow: "hidden",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: "20px",
            marginBottom: "20%",

            padding: "1rem",
          }}
        >
          <Qrscanner />
        </Box>

        {/* Scanner */}

        {/* NAVBAR */}
        <Navbar />
      </div>
    </AuthProvider>
  );
};

export default Home;
