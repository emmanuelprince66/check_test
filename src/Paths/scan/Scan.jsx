import React, { useEffect, useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import Scanner from "../../components/scanner/Scanner";
import { AuthProvider } from "../../util/AuthContext";
import BackArrow from "../../components/backArrow/BackArrow";
import { ToastContainer, toast } from "react-toastify";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import plusLogo from "../../images/plusLogo.svg";
import { Link } from "react-router-dom";
import notiLogo from "../../images/notiLogo.svg";

import {
  Box,
  Container,
  Card,
  Typography,
  CircularProgress,
} from "@mui/material";
import { useTheme } from "@mui/material";
import { useSelector } from "react-redux";
import "./Scan.css";
import useSuperMarket from "../../hooks/useSuperMarket";
import { useNavigate } from "react-router-dom";
import { Dialog } from "@mui/material";
import { Slide } from "@mui/material";
import FormattedPrice from "../../components/FormattedPrice";
import useUser from "../../hooks/useUser";

const Scan = () => {
  const cart = useSelector((state) => state.cart);
  const user = useUser();

  const navigate = useNavigate();
  const [superMarketKey, setSuperMarketKey] = useState("");
  const [isTextVisible, setIsTextVisible] = useState(false);

  const superMarket = useSuperMarket(superMarketKey);

  const currentTheme = useTheme();

  const calculateTotalPrice = () => {
    if (cart.length === 0) {
      return 0;
    }

    let totalPrice = 0;

    cart.forEach((cartItem) => {
      totalPrice += cartItem.price;
    });

    return totalPrice;
  };
  const totalPrice = calculateTotalPrice();

  useEffect(() => {
    const val = localStorage.getItem("myData");
    if (val) {
      setSuperMarketKey(val);
    } else {
      navigate("/home");
    }
  }, []);

  return (
    <AuthProvider>
      <Box
        sx={{
          maxWidth: "31%",
          mx: "auto",
          marginTop: "1rem",
          maxWidth: { xs: "100%", sm: "100%", md: "31%" },
        }}
      >
        <Container
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "start",
            mx: "auto",
            width: { xs: "90%", sm: "70%", md: "100%" },
            padding: 0,
            marginBottom: "4rem",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
            }}
          >
            <Box>
              <BackArrow destination="/home" />
            </Box>
          </Box>
          <Card
            sx={{
              height: "92px",
              width: "100%",
              borderRadius: "16px",
              padding: "0.5rem",
              backgroundColor:
                currentTheme.palette.type === "light" ? "#FFEDED" : "#FFEDED",
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
          </Card>

          <Card
            sx={{
              display: "flex",
              textAlign: "center",
              alignItems: "center",
              justifyContent: "center",
              maxWidth: "15rem",
              mx: "auto",
              padding: "0.3rem",
              gap: "7px",
              borderRadius: "11px",
              width: "100%",
              marginBottom: "2rem",
              marginTop: "1rem",
              backgroundColor:
                currentTheme.palette.type === "light"
                  ? "rgba(232, 229, 229, 1)"
                  : "rgba(232, 229, 229, 1)",
            }}
          >
            <Typography
              sx={{
                fontFamily: "raleWay",
                fontWeight: "600",
              }}
            >
              {superMarket.data ? (
                superMarket.data.companyName
              ) : (
                <CircularProgress size="1.5rem" color="error" />
              )}
            </Typography>
          </Card>

          <Box
            sx={{
              minWidth: "100%",
              minHeight: "100%",
              overflow: "hidden",
              borderRadius: "20px",
              borderTop: "20px",
              justifyContent: "center",
              alignItems: "center",
              padding: "1rem",
            }}
          >
            {/* Bar code scanner starts */}

            <Scanner
              superMarketId={
                superMarket.data ? superMarket.data.inventoryName : ""
              }
            />
            {/* Bar code scanner stops */}
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "4px",
              width: "100%",
              justifyContent: "center",
              marginY: "2rem",
            }}
          >
            <Typography
              sx={{
                color: "#000",
                fontWeight: "600",
                fontFamily: "raleWay",
              }}
            >
              Total value in cart :
            </Typography>
            <Typography
              sx={{
                color: "#000",
                fontWeight: "600",
                fontFamily: "raleWay",
                color: "red",
              }}
            >
              <FormattedPrice amount={totalPrice} />
            </Typography>
          </Box>
        </Container>

        <ToastContainer />
      </Box>

      {/* NAVBAR */}

      <Navbar />
    </AuthProvider>
  );
};

export default Scan;
