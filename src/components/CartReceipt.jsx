import React from "react";
import {
  Card,
  Box,
  Container,
  Typography,
  CircularProgress,
  modalClasses,
} from "@mui/material";
import { useTheme } from "@mui/material";
import { useState, useEffect } from "react";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import useOrders from "../hooks/useOrders";
import { Divider, Button } from "@mui/material";
import QRCode from "react-qr-code";
import checkLogo from "../images/checkLogo.svg";
import BackArrow from "./backArrow/BackArrow";
import useSuperMarket from "../hooks/useSuperMarket";

import {
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  Paper,
  TableRow,
  Table,
} from "@mui/material";

const CartReceipt = ({ cart, totalPrice, orderData }) => {
  console.log(orderData);
  const value = JSON.stringify(cart, null, 2);
  const currentTheme = useTheme();
  const [superMarketKey, setSuperMarketKey] = useState("");
  const superMarket = useSuperMarket(superMarketKey);

  const formattedTime = (oldTime) => {
    const dateTimeString = oldTime;
    const dateTime = new Date(dateTimeString);

    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    };
    const formattedString = dateTime
      .toLocaleString("en-US", options)
      .replace(/, /g, " | ");

    return formattedString;
  };

  useEffect(() => {
    const val = localStorage.getItem("myData");
    if (val) {
      setSuperMarketKey(val);
    } else {
      navigate("/home");
    }
  }, []);

  return (
    <Box
      sx={{
        maxWidth: "31%",
        mx: "auto",
        minWidth: { xs: "100%", sm: "100%", md: "31%" },
      }}
    >
      <Container
        sx={{
          padding: "1rem",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "end",
            width: "100%",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "end",
              justifySelf: "end",
              flexDirection: "column",
            }}
          >
            <Box>
              <img
                src={checkLogo}
                className="checkLogo"
                alt="check-retail-logo"
              />
            </Box>

            <Typography
              variant="h2"
              sx={{
                marginTop: "-2.4rem",
                fontFamily: "raleWay",
                letterSpacing: "0.2em",
                color:
                  currentTheme.palette.type === "light" ? "#000000" : "#EEEEEE",
                fontSize: "10px",
              }}
            >
              RETAIL
            </Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "end",
            }}
          >
            <Typography
              sx={{
                color: currentTheme.palette.type === "light" ? "#000" : "#000",
                fontWeight: 900,
                fontFamily: "raleWay",
                fontSize: "16px",
              }}
            >
              Check Retail
            </Typography>
            <Typography
              sx={{
                color: currentTheme.palette.type === "light" ? "#000" : "#000",
                fontWeight: 900,
                fontFamily: "raleWay",
                fontSize: "13px",
              }}
            >
              www.checkretail.tech
            </Typography>
            <Typography
              sx={{
                color: currentTheme.palette.type === "light" ? "#000" : "#000",
                fontWeight: 900,
                fontFamily: "raleWay",
                fontSize: "13px",
              }}
            >
              +234 812 3456 789
            </Typography>
          </Box>
        </Box>

        <Divider
          sx={{
            color: "#000",
            width: "100%",
            marginY: "1.5rem",
          }}
        />
        {/* Display order data */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            my: "0.5rem",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: "1rem",
              width: "100%",
            }}
          >
            <Typography
              sx={{
                fontFamily: "raleWay",
                color: currentTheme.palette.type === "light" ? "#000" : "#fff",
                fomtWeight: "1000",
                fontSize: "16px",
              }}
            >
              Purchase Receipt
            </Typography>
            <Typography
              sx={{
                fontFamily: "raleWay",
                color:
                  currentTheme.palette.type === "light" ? "#d7d7d7" : "#d7d7d7",
                fomtWeight: "900",
                fontSize: "13px",
              }}
            >
              {orderData.orderInfo.transactionRef}
            </Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: "1rem",
              width: "100%",
              marginTop: "0.5rem",
            }}
          >
            <Typography
              sx={{
                fontFamily: "raleWay",
                color:
                  currentTheme.palette.type === "light" ? "#B66C00" : "#B66C00",
                fomtWeight: "1000",
                fontSize: "16px",
              }}
            >
              Date & Time:
            </Typography>
            <Typography
              sx={{
                fontFamily: "raleWay",
                color:
                  currentTheme.palette.type === "light" ? "#d7d7d7" : "#d7d7d7",
                fomtWeight: "900",
                fontSize: "13px",
              }}
            >
              {formattedTime(orderData.orderInfo.createdAt)}
            </Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: "1rem",
              width: "100%",
              marginTop: "0.5rem",
            }}
          >
            <Typography
              sx={{
                fontFamily: "raleWay",
                color:
                  currentTheme.palette.type === "light" ? "#B66C00" : "#B66C00",
                fomtWeight: "1000",
                fontSize: "16px",
              }}
            >
              Merchant
            </Typography>
            <Typography
              sx={{
                fontFamily: "raleWay",
                color:
                  currentTheme.palette.type === "light" ? "#d7d7d7" : "#d7d7d7",
                fomtWeight: "900",
                fontSize: "13px",
              }}
            >
              {orderData.orderInfo.supermarket.companyName}
            </Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: "1rem",
              width: "100%",
              marginTop: "0.5rem",
            }}
          >
            <Typography
              sx={{
                fontFamily: "raleWay",
                color:
                  currentTheme.palette.type === "light" ? "#B66C00" : "#B66C00",
                fomtWeight: "1000",
                fontSize: "16px",
              }}
            >
              Attendant
            </Typography>
            <Typography
              sx={{
                fontFamily: "raleWay",
                color:
                  currentTheme.palette.type === "light" ? "#d7d7d7" : "#d7d7d7",
                fomtWeight: "900",
                fontSize: "13px",
              }}
            >
              {orderData.orderInfo.user.firstName}
            </Typography>
          </Box>
        </Box>

        {/* Display product data */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <TableContainer component={Paper}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontFamily: "raleWay", fontWeight: "900" }}>
                    ITEM NAME
                  </TableCell>
                  <TableCell
                    sx={{ fontFamily: "raleWay", fontWeight: "900" }}
                    align="right"
                  >
                    SIZE
                  </TableCell>
                  <TableCell
                    sx={{ fontFamily: "raleWay", fontWeight: "900" }}
                    align="right"
                  >
                    QTY&nbsp;
                  </TableCell>
                  <TableCell
                    sx={{ fontFamily: "raleWay", fontWeight: "900" }}
                    align="right"
                  >
                    PRICE&nbsp;(&#8358;)
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {cart.map((item) => (
                  <TableRow
                    key={item.name}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell sx={{ fontFamily: "raleWay" }} align="left">
                      {item.description}
                    </TableCell>
                    <TableCell sx={{ fontFamily: "raleWay" }} align="right">
                      {item.weight}g
                    </TableCell>
                    <TableCell sx={{ fontFamily: "raleWay" }} align="right">
                      {item.quantity}
                    </TableCell>
                    <TableCell sx={{ fontFamily: "raleWay" }} align="right">
                      {item.price}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
        <Divider
          sx={{
            color: "#000",
            width: "100%",
            marginY: "1.5rem",
          }}
        />
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "10px",
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
            Grand Total
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
        </Box>

        {/* qr code box*/}

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            padding: "1rem",
            background:
              currentTheme.palette.type === "light" ? "#d2d2d2" : "#463E32",
            alignItems: "center",
            gap: "0.5rem",
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
            Receipt QR
          </Typography>

          <Box>
            <QRCode
              size={256}
              style={{ height: "15rem", width: "15rem" }}
              value={value}
              viewBox={`0 0 256 256`}
            />
          </Box>

          <Typography
            sx={{
              fontFamily: "raleWay",
              color: currentTheme.palette.type === "light" ? "#000" : "#fff",
              fomtWeight: "600",
              fontSize: "14px",
              textAlign: "center",
            }}
          >
            Kindly note that this receipt may be required for verification
            before you exit the store. Thank you for shopping with us!
          </Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            margin: "2rem 0",
          }}
        >
          <Button
            sx={{
              background:
                currentTheme.palette.type === "light" ? "#dc0019" : "#dc0019",
              width: "100%",
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
            Download receipt
          </Button>
          <Button
            sx={{
              width: "100%",
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
            Share receipt
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default CartReceipt;
