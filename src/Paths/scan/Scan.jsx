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
import vcart from "../../images/practise/vcart.svg";

import { Button } from "@mui/material";

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
import Acctbox from "../../components/acctbox/Acctbox";

const Scan = () => {
  console.log("Scan comp has re-rendered");
  const cart = useSelector((state) => state.cart);
  const user = useUser();

  const navigate = useNavigate();
  const [superMarketKey, setSuperMarketKey] = useState("");
  const [isTextVisible, setIsTextVisible] = useState(false);
  const [superMarketEntry, setSuperMarketEntry] = useState(false);

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
      setSuperMarketEntry(true);
    } else setSuperMarketEntry(false);
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
            maxHeight: "100vh",
            alignItems: "start",
            mx: "auto",
            width: { xs: "90%", sm: "70%", md: "100%" },
            padding: 0,
            marginBottom: "4rem",
          }}
        >
          <Acctbox />
          {superMarketEntry ? (
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
                    : "#2C2C2E",
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
          ) : (
            <Box
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
              }}
            ></Box>
          )}
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
              companyName={superMarket.data ? superMarket.data.companyName : ""}
              companyLocation={
                superMarket.data ? superMarket.data.location : ""
              }
            />
            {/* Bar code scanner stops */}
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
              gap: "15px",
              width: "100%",
              justifyContent: "center",
              marginY: "2rem",
            }}
          >
            <Box
              sx={{
                display: "flex",
                gap: "10px",
                background: "#262626",
                borderRadius: "8px",
                padding: "5px 10px",
                marginBottom: "0.5rem",
              }}
            >
              <Typography
                sx={{
                  color: "#fff",
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

            <Link to={"/cart"}>
              <Button
                sx={{
                  height: "48px",
                  background: "#FF0808",
                  borderRadius: "8px",
                  width: { xs: "300px", sm: "333px", md: "333px", lg: "333px" },
                  display: "flex",
                  padding: "10px, 16px, 10px, 16px",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "16px",
                  flexGrow: "1",
                  cursor: "pointer",
                  "&:hover": {
                    backgroundColor: "#FF0808", // Custom background color on hover
                  },
                  "&:active": {
                    backgroundColor: "#FF0808", // Custom background color on click
                  },
                }}
              >
                <img src={vcart} alt="vcart" />
                <Typography
                  sx={{
                    color: "#fff",
                    fontSize: "14px",
                    fontFamily: "raleWay",
                    fontWeight: "1000",
                    paddingTop: "7px",
                    textTransform: "capitalize",
                  }}
                >
                  Go to Cart
                </Typography>
              </Button>
            </Link>
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
