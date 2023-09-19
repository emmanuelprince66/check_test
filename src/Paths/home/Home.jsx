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

  // useEffect(() => {
  //   setTimeout(() => {
  //     setShowScanner(true);
  //   }, 4000);
  // }, []);

  const handleShowAmount = () => {
    !isTextVisible
      ? setIsTextVisible(!isTextVisible)
      : setIsTextVisible(!isTextVisible);
  };

  return (
    <AuthProvider>
      <div className="gpt3__home">
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "0.2rem",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
            }}
          >
            <img src={groupLogo} alt="group-logo" />
            <Typography
              sx={{
                color:
                  currentTheme.palette.type === "light" ? "#1e1e1e" : "#ffff",
                fontFamily: "raleWay",
                fontWeight: "1000",
                fontSize: "16px",
              }}
            >
              {`${user.data ? user.data.firstName : ""} ${
                user.data ? user.data.lastName : ""
              }  `}
            </Typography>
          </Box>

          <Box>
            <img src={notiLogo} alt="noti-logo" />
          </Box>
        </Box>

        {/* Account Box Card */}
        <Card
          sx={{
            height: "110px",
            maxWidth: "100%",
            borderRadius: "16px",
            padding: "0.9rem",
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
            <Box
              sx={{
                flex: "1",
                width: "100%",
              }}
            >
              {!isTextVisible ? (
                <Typography
                  sx={{
                    fontFamily: "raleWay",
                    fontWeight: "600",
                    fontSize: "18px",
                  }}
                >
                  ***********
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
              }}
            >
              <Box
                onClick={() => handleShowAmount()}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  width: "103px",
                  height: "28px",
                  borderRadius: "8px",
                  backgroundColor: "rgba(220, 0, 25, 0.1)",
                  padding: "4px 8px 4px 8px",
                  cursor: "pointer",
                }}
              >
                {isTextVisible ? (
                  <Visibility sx={{ color: "#C57600", fontSize: "15px" }} />
                ) : (
                  <VisibilityOff sx={{ color: "#C57600", fontSize: "15px" }} />
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
                  {isTextVisible ? "Hide Balance" : "Show Balance"}
                </Typography>
              </Box>
            </Box>
          </Box>

          <Box
            sx={{
              display: "flex",
              justifyContent: {
                xs: "space-between",
                sm: "space-evenly",
                md: "space-evenly",
                lg: "space-evenly",
              },
              alignItems: "center",
              gap: "1rem",
            }}
          >
            <Box
              sx={{
                height: "36px",
                background: "linear-gradient(180deg, #31DC61 0%, #19953C 100%)",
                borderRadius: "8px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "0.5rem",
                width: "145px",
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

            <Box
              sx={{
                height: "36px",
                background: "#EB001B",
                borderRadius: "8px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "0.5rem",
                width: "145px",
                marginTop: "1rem",
              }}
            >
              <Link to="/wtransfer">
                <Typography
                  sx={{
                    color: "#fff",
                    fontSize: "12px",
                    fontFamily: "raleWay",
                  }}
                >
                  Transfer
                </Typography>
              </Link>
            </Box>
          </Box>
        </Card>
        {/* Account Box Card end */}

        <Typography
          sx={{
            color: currentTheme.palette.type === "light" ? "#1e1e1e" : "#ffff",
            fontFamily: "raleWay",
            fontWeight: "1000",
            fontSize: "16px",
            marginBottom: "1rem",
          }}
        >
          Your Insights
        </Typography>

        <HomeCard />

        {/* Header */}

        {/* CARD */}
        {/* 
        <Card
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
