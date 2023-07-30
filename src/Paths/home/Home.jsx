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

const Home = () => {
  const currentTheme = useTheme();
  const navigate = useNavigate();
  // const [isTextVisible, setIsTextVisible] = useState(false);

  const user = useUser();
  console.log(user.data);

  return (
    <AuthProvider>
      <div className="gpt3__home">
        <Card
          sx={{
            height: "70px",
            width: "100%",
            borderRadius: "16px",
            padding: "0.5rem",
            marginY: "1rem",
            backgroundColor:
              currentTheme.palette.type === "light" ? "#fff" : "#333333",
          }}
        >
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
                alignItems: "start",
                flex: "4",
              }}
            >
              <Typography
                sx={{
                  fontFamily: "raleWay",
                  fontWeight: "400",
                  fontSize: "10px",
                }}
              >
                My Balance
              </Typography>

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
            </Box>

            <Box
              sx={{
                height: "36px",
                background: "#F6473C",
                borderRadius: "8px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "0.5rem",
                flexGrow: "1",
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
        </Card>

        {/* Header */}

        {/* CARD */}

        <Card
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "0.3rem",
            gap: "7px",
            width: "100%",
            marginBottom: "2rem",
            backgroundColor:
              currentTheme.palette.type === "light" ? "#fff" : "#333333",
          }}
        >
          <img src={exclamgreen} alt="ex" />
          <Typography
            sx={{
              color: currentTheme.palette.type === "light" ? "#000" : "#fff",
              paddingTop: "1px",
              fontFamily: "raleWay",
            }}
          >
            Scan Qr code to start shopping.
          </Typography>
        </Card>

        {/* Scanner*/}

        <Box
          sx={{
            minWidth: "100%",
            minHeight: "100%",
            overflow: "hidden",
            display: "flex",
            padding: "0.5rem",
            justifyContent: "center",
            alignItems: "center",
            border: `2px hidden ${
              currentTheme.palette.type === "light" ? "#000" : "#fff"
            }`,
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
