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
  const [showScanner, setShowScanner] = useState(false);

  const user = useUser();

  useEffect(() => {
    setTimeout(() => {
      setShowScanner(true);
    }, 4000);
  }, []);

  return (
    <AuthProvider>
      <div className="gpt3__home">
        <Acctbox />

        <HomeCard />

        {/* Header */}

        {/* CARD */}

        {/* <Card
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "0.3rem",
            gap: "7px",
            borderRadius: "11px",
            width: { xs: "95%", sm: "48%", md: "70%", lg: "70%" },
            mx: "auto",
            marginBottom: "2rem",
            marginTop: "0.5rem",
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
        </Card> */}

        {/* Scanner*/}

        {/* <Box
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
          {showScanner ? (
            <Qrscanner />
          ) : (
            <CircularProgress
              size="3.5rem"
              sx={{
                marginTop: "3rem",
              }}
              color="error"
            />
          )}
        </Box> */}

        {/* Scanner */}

        {/* NAVBAR */}
        <Navbar />
      </div>
    </AuthProvider>
  );
};

export default Home;
