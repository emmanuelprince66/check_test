import React, { useEffect, useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import BackArrow from "../../components/backArrow/BackArrow";
import { useNavigate } from "react-router-dom";
import { Card, Box, Typography, Stack, Container, Button } from "@mui/material";
import { useTheme } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import icircle from "../../images/info-circle.svg";
import searchLogo from "../../images/searchLogo.svg";
import dashdot from "../../images/practise/threedot.svg";
import res2 from "../../images/res2.svg";
import OTD1 from "../../images/OTD1.svg";
import MoreVertRoundedIcon from "@mui/icons-material/MoreVertRounded";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import { Modal } from "@mui/material";
import { AuthProvider } from "../../util/AuthContext";
import "./Cart.css";
import { useSelector } from "react-redux";
import NoResult from "../../components/NoResult";
import CartItem from "../../components/CartItem";

const Cart = () => {
  const cart = useSelector((state) => state.cart);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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

  const navigate = useNavigate();
  const currentTheme = useTheme();

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
            alignItems: "start",
            mx: "auto",
            width: { xs: "96%", sm: "70%", md: "100%" },
            padding: 0,
            marginBottom: "10rem",
          }}
        >
          <Box>
            <BackArrow destination="/home" />
          </Box>
          <Box sx={{ marginBottom: "1rem" }}>
            <Typography
              sx={{
                fontFamily: "raleWay",
                fontSize: "24px",
                fontWeight: 600,
              }}
            >
              My Cart
            </Typography>
            <Typography
              sx={{
                fontFamily: "raleWay",
                fontSize: "15px",
                fontWeight: 400,
              }}
            >
              Review items before checking out
            </Typography>
          </Box>

          {/*Card  */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "10px",
              width: "100%",
            }}
          >
            {cart.length === 0 ? (
              <NoResult
                notification="You have no item in your cart"
                smallText="proceed to scan to add items"
                buttonText="Proceed"
                linkText="/scan"
              />
            ) : (
              cart.map((item) => <CartItem item={item} key={item.id} />)
            )}
          </Box>
          {/* Card end */}
          <Container
            sx={{
              display: "flex",
              width: { xs: "19rem", sm: "25rem", md: "25rem" },
              justifyContent: "space-between",
              alignItems: "center",
              padding: "0",
              my: "1rem",
            }}
          >
            <Typography
              sx={{
                fontFamily: "raleWay",
                color: currentTheme.palette.type === "light" ? "#000" : "#fff",
                fomtWeight: "900",
                fontSize: "16px",
              }}
            >
              Subtotal
            </Typography>

            <Typography
              sx={{
                fontFamily: "raleWay",
                color: currentTheme.palette.type === "light" ? "#000" : "#fff",
                fomtWeight: "900",
                fontSize: "16px",
              }}
            >
              &#8358;{totalPrice}
            </Typography>
          </Container>

          <Box
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <Button
              sx={{
                background:
                  currentTheme.palette.type === "light" ? "#dc0019" : "#dc0019",
                width: "95%",
                padding: "10px",
                borderRadius: "8px",
                color: "#fff",
                "&:hover": {
                  backgroundColor:
                    currentTheme.palette === "light" ? "#dc0019" : "#dc0019",
                },
                fontFamily: "raleWay",
              }}
            >
              Proceed to payment
            </Button>

            <Button
              onClick={() => navigate("/scan")}
              sx={{
                width: "95%",
                padding: "10px",
                borderRadius: "8px",
                color: currentTheme.palette.type === "light" ? "#000" : "#fff",
                borderColor: "#dc0019",
                fontFamily: "raleWay",
                "&:hover": {
                  borderColor:
                    currentTheme.palette === "light" ? "#dc0019" : "#dc0019",
                },
              }}
              variant="outlined"
            >
              Scan more items
            </Button>
          </Box>
        </Container>

        {/* NAVBAR */}

        <Navbar />
      </Box>
    </AuthProvider>
  );
};

export default Cart;
