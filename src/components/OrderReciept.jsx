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
import BackArrow from "./backArrow/BackArrow";
import useOrders from "../hooks/useOrders";
import { Divider, Button } from "@mui/material";
import checkLogo from "../images/checkLogo.svg";
import QRCode from "react-qr-code";
import {
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  Paper,
  TableRow,
  Table,
} from "@mui/material";
import FormattedPrice from "./FormattedPrice";

const OrderReciept = ({ handleClose2, orderId, orders }) => {
  const orderItem = orders.find((data) => data.id === orderId);
  console.log(orderItem.orders);
  const value = JSON.stringify(orderItem.orders, null, 2);

  const handleDownload2 = () => {
    // Select the element with ID "receipt"
    const receipt = document.querySelector("#receipt");

    // Convert the element to a JPEG image using html2canvas and lower quality setting
    html2canvas(receipt, { useCORS: true, dpi: 150 }).then((canvas) => {
      // Get the image data URL from the canvas with JPEG format and lower quality (adjust quality as needed)
      const imgData = canvas.toDataURL("image/jpeg", 0.8); // Adjust the quality (0.0 to 1.0)

      // Create a new jsPDF instance with a customized page size (use "pt" for points)
      const pdf = new jsPDF({
        orientation: "portrait", // "portrait" or "landscape"
        unit: "pt", // Points as the unit of measurement
        format: [canvas.width * 0.75, canvas.height * 0.75], // Reduce page size to 75% of the canvas size
      });

      // Add the image to the PDF at the top-left corner
      pdf.addImage(imgData, "JPEG", 0, 0);

      // Save the PDF with the name "receipt.pdf"
      pdf.save("receipt.pdf");
    });
  };

  const calculateTotalPrice = () => {
    if (orderItem.orders.length === 0) {
      return 0;
    }

    let totalPrice = 0;

    orderItem.orders.forEach((orderItem) => {
      totalPrice += orderItem.price;
    });

    return totalPrice;
  };
  const totalPrice = calculateTotalPrice();

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

  const currentTheme = useTheme();
  return (
    <Box
      sx={{
        maxWidth: "31%",
        mx: "auto",
        minWidth: { xs: "100%", sm: "100%", md: "31%" },
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          background: "#000",
          padding: "0.6em",
          maxHeight: "3.4rem",
        }}
      >
        <Box
          sx={{
            paddingTop: "1.7rem",
          }}
          onClick={() => handleClose2(true)}
        >
          <BackArrow />
        </Box>

        <Typography
          variant="h2"
          sx={{
            fontFamily: "raleWay",
            color:
              currentTheme.palette.type === "light" ? "#EEEEEE" : "#EEEEEE",
            fontWeight: 600,
            fontSize: "12px",
          }}
        >
          check_order_receipt.pdf
        </Typography>
      </Box>

      <Container
        id="receipt"
        sx={{
          display: "flex",
          flexDirection: "column",
          width: { xs: "90%", sm: "70%", md: "90%" },
          padding: "0",
          mx: "auto",
          marginTop: "1em",
          marginBottom: "12rem",
        }}
      >
        <Card
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "0.7rem",
            background: "#F8F8F8",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
              marginBottom: "1rem",
              borderBottom: "1px solid '#eee",
            }}
          >
            <Typography
              sx={{
                color: currentTheme.palette.type === "light" ? "#000" : "#000",
                fontWeight: 600,
                fontFamily: "raleWay",
                fontSize: "16px",
              }}
            >
              PURCHASE RECEIPT
            </Typography>
            <Typography
              sx={{
                color: "#C57600",
                fontWeight: 900,
                fontFamily: "raleWay",
                fontSize: "10px",
              }}
            >
              {orderItem.transactionRef}
            </Typography>
          </Box>

          <Divider
            sx={{
              color: "#000",
              width: "100%",
              marginBottom: "1rem",
            }}
          />
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
              marginBottom: "2rem",
              borderBottom: "1px solid '#eee",
            }}
          >
            <Typography
              sx={{
                color: currentTheme.palette.type === "light" ? "#000" : "#000",
                fontWeight: 500,
                fontFamily: "raleWay",
                fontSize: "16px",
              }}
            >
              DATE & TIME :
            </Typography>
            <Typography
              sx={{
                color: "#000",
                fontWeight: 900,
                fontFamily: "raleWay",
                fontSize: "14px",
              }}
            >
              {formattedTime(orderItem.createdAt)}
            </Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
              marginBottom: "2rem",
              borderBottom: "1px solid '#eee",
            }}
          >
            <Typography
              sx={{
                color: currentTheme.palette.type === "light" ? "#000" : "#000",
                fontWeight: 500,
                fontFamily: "raleWay",
                fontSize: "16px",
              }}
            >
              MERCHANT :
            </Typography>
            <Typography
              sx={{
                color: "#000",
                fontWeight: 900,
                fontFamily: "raleWay",
                fontSize: "14px",
              }}
            >
              {orderItem.supermarket.companyName}
            </Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
              marginBottom: "2rem",
              borderBottom: "1px solid '#eee",
            }}
          >
            <Typography
              sx={{
                color: currentTheme.palette.type === "light" ? "#000" : "#000",
                fontWeight: 500,
                fontFamily: "raleWay",
                fontSize: "16px",
              }}
            >
              ATTENDANT :
            </Typography>
            <Typography
              sx={{
                color: "#000",
                fontWeight: 900,
                fontFamily: "raleWay",
                fontSize: "14px",
              }}
            >
              {orderItem.supermarket.companyName}
            </Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
              marginBottom: "2rem",
              borderBottom: "1px solid '#eee",
            }}
          >
            <Typography
              sx={{
                color: currentTheme.palette.type === "light" ? "#000" : "#000",
                fontWeight: 500,
                fontFamily: "raleWay",
                fontSize: "16px",
              }}
            >
              CUSTOMER :
            </Typography>
            <Typography
              sx={{
                color: "#000",
                fontWeight: 900,
                fontFamily: "raleWay",
                fontSize: "14px",
              }}
            >
              {orderItem.approvedBy != null
                ? orderItem.approvedBy.firstName
                : "NIL"}
            </Typography>
          </Box>
        </Card>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            my: "1rem",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "start",
              alignItems: "center",
              gap: "10px",
              width: "100%",
            }}
          >
            <TableContainer component={Paper}>
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell
                      sx={{ fontFamily: "raleWay", fontWeight: "900" }}
                    >
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
                  {orderItem.orders.map((item) => (
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
        </Box>

        <Divider
          sx={{
            color: "#000",
            width: "100%",
            marginBottom: "1rem",
          }}
        />

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
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
            GRAND TOTAL
          </Typography>

          <Typography
            sx={{
              color: currentTheme.palette.type === "light" ? "#000" : "#000",
              fontWeight: 900,
              fontFamily: "raleWay",
              fontSize: "16px",
            }}
          >
            <FormattedPrice amount={totalPrice} />
          </Typography>
        </Box>

        <Card
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "1rem",
            background: " rgba(197, 118, 0, 0.1)",
            my: "1rem",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: "100%",
            }}
          >
            <Typography
              variant="h2"
              sx={{
                fontFamily: "raleWay",
                fontStyle: "italic",
                color:
                  currentTheme.palette.type === "light" ? "#000000" : "#EEEEEE",
                fontWeight: 900,
                fontSize: "16px",
                lineHeight: "23.18px",
              }}
            >
              POWERED BY
            </Typography>

            <Box
              sx={{
                display: "flex",
                alignItems: "end",
                flexDirection: "column",
              }}
            >
              <Box
                sx={{
                  height: "-20rem",
                }}
              >
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
                    currentTheme.palette.type === "light"
                      ? "#000000"
                      : "#EEEEEE",
                  fontSize: "10px",
                }}
              >
                RETAIL
              </Typography>
            </Box>
          </Box>
        </Card>

        <Card
          sx={{
            display: "flex",
            padding: "1rem",
            justifyContent: "center",
            alignItems: "center",
            my: "1.5rem",
            background: " rgba(197, 118, 0, 0.1)",
          }}
        >
          <Typography
            variant="h2"
            sx={{
              fontFamily: "raleWay",
              color:
                currentTheme.palette.type === "light" ? "#000000" : "#EEEEEE",
              fontWeight: 900,
              fontSize: "16px",
            }}
          >
            www.checkretail.tech
          </Typography>
        </Card>

        {/* QR CODE */}

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
      </Container>

      {/* Conatainer ends */}

      <Card
        sx={{
          left: { xs: 0, sm: 0, md: "33.5%" },
          bottom: 0,
          fontSize: "10px",
          paddingTop: "1rem",
          paddingBottom: "1rem",
          position: "fixed",
          width: { md: "33%", sm: "100%", xs: "100%" },
          padding: "10px",
          background: "#000",
        }}
      >
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "1rem",
            py: "1rem",
          }}
        >
          <Button
            onClick={handleDownload2}
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
            Download receipt
          </Button>
          <Button
            sx={{
              width: "95%",
              padding: "10px",
              borderRadius: "8px",
              color: currentTheme.palette.type === "light" ? "#fff" : "#fff",
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
      </Card>
    </Box>
  );
};

export default OrderReciept;
