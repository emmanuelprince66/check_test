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
import useOrders from "../hooks/useOrders";
import { Divider, Button } from "@mui/material";
import QRCode from "react-qr-code";
import checkLogo from "../images/checkLogo.svg";
import BackArrow from "./backArrow/BackArrow";
import useSuperMarket from "../hooks/useSuperMarket";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
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
import { useDispatch } from "react-redux";
import { clearCart } from "../util/slice/CartSlice";
import { useNavigate } from "react-router-dom";
import SharedReceipt from "./SharedReceipt";

const CartReceipt = ({ cart, orderData, orderLoad }) => {
  const value = JSON.stringify(orderLoad, null, 2);
  // console.log(value);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const currentTheme = useTheme();
  const [superMarketKey, setSuperMarketKey] = useState("");
  const [handleSharedModal, setHandleSharedModal] = useState(false);
  const [pdfBlob, setPdfBlob] = useState(null);

  const generatePDF = async () => {
    const receiptContent = document.querySelector("#receipt");
    const canvas = await html2canvas(receiptContent);
    const imgData = canvas.toDataURL("image/jpeg"); // Corrected "toDataUrl" to "toDataURL"

    const blob = dataURLtoBlob(imgData);
    setPdfBlob(blob);
  };

  const dataURLtoBlob = (dataURL) => {
    const parts = dataURL.split(",");
    const byteString = atob(parts[1]); // Corrected "parst" to "parts"
    const mimeString = parts[0].split(":")[1]; // Corrected mimeString extraction

    const byteArray = new Uint8Array(byteString.length);
    for (let i = 0; i < byteString.length; i++) {
      byteArray[i] = byteString.charCodeAt(i);
    }

    return new Blob([byteArray], { type: mimeString });
  };

  const shareModal = () => {
    setHandleSharedModal(true);
  };
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
      console.log(val);
      generatePDF();
      setSuperMarketKey(val);
    } else {
      navigate("/home");
    }
  }, []);

  const handleClearCart = () => {
    dispatch(clearCart());
    localStorage.clear();
    navigate("/home");
  };

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
        <Box id="receipt">
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
                    currentTheme.palette.type === "light"
                      ? "#000000"
                      : "#EEEEEE",
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
                  color:
                    currentTheme.palette.type === "light" ? "#000" : "#000",
                  fontWeight: 900,
                  fontFamily: "raleWay",
                  fontSize: "16px",
                }}
              >
                Check Retail
              </Typography>
              <Typography
                sx={{
                  color:
                    currentTheme.palette.type === "light" ? "#000" : "#000",
                  fontWeight: 900,
                  fontFamily: "raleWay",
                  fontSize: "13px",
                }}
              >
                www.checkretail.tech
              </Typography>
              <Typography
                sx={{
                  color:
                    currentTheme.palette.type === "light" ? "#000" : "#000",
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
                  color:
                    currentTheme.palette.type === "light" ? "#000" : "#fff",
                  fontWeight: "1000",
                  fontSize: "16px",
                }}
              >
                Purchase Receipt
              </Typography>
              <Typography
                sx={{
                  fontFamily: "raleWay",
                  color:
                    currentTheme.palette.type === "light"
                      ? "rgba(83, 83, 83, 1)"
                      : "#d7d7d7",
                  fontWeight: "1000",
                  fontSize: { xs: "12px", sm: "13px", md: "13px", lg: "13px" },
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
                    currentTheme.palette.type === "light"
                      ? "#B66C00"
                      : "#B66C00",
                  fontWeight: "600",
                  fontSize: "12px",
                }}
              >
                Date & Time:
              </Typography>
              <Typography
                sx={{
                  fontFamily: "raleWay",
                  color:
                    currentTheme.palette.type === "light"
                      ? "#1F1F1F"
                      : "#d7d7d7",
                  fontWeight: "900",
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
                    currentTheme.palette.type === "light"
                      ? "#B66C00"
                      : "#B66C00",
                  fontWeight: "1000",
                  fontSize: "12px",
                }}
              >
                Merchant
              </Typography>
              <Typography
                sx={{
                  fontFamily: "raleWay",
                  color:
                    currentTheme.palette.type === "light"
                      ? "#1F1F1F"
                      : "#d7d7d7",
                  fontWeight: "900",
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
                    currentTheme.palette.type === "light"
                      ? "#B66C00"
                      : "#B66C00",
                  fontWeight: "1000",
                  fontSize: "12px",
                }}
              >
                Attendant
              </Typography>
              <Typography
                sx={{
                  fontFamily: "raleWay",
                  color:
                    currentTheme.palette.type === "light"
                      ? "#1F1F1F"
                      : "#d7d7d7",
                  fontWeight: "900",
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
                    <TableCell
                      sx={{ fontFamily: "raleWay", fontWeight: "1000" }}
                    >
                      ITEM NAME
                    </TableCell>
                    <TableCell
                      sx={{ fontFamily: "raleWay", fontWeight: "1000" }}
                      align="right"
                    >
                      SIZE
                    </TableCell>
                    <TableCell
                      sx={{ fontFamily: "raleWay", fontWeight: "1000" }}
                      align="right"
                    >
                      QTY&nbsp;
                    </TableCell>
                    <TableCell
                      sx={{ fontFamily: "raleWay", fontWeight: "1000" }}
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
                        {item.counter}
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
                fontWeight: "1000",
                fontSize: "16px",
              }}
            >
              Grand Total
            </Typography>
            <Typography
              sx={{
                fontFamily: "raleWay",
                color: currentTheme.palette.type === "light" ? "#000" : "#fff",
                fontWeight: "1000",
                fontSize: "16px",
              }}
            >
              <FormattedPrice
                amount={parseInt(orderData.orderInfo.totalAmount)}
              />
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
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            margin: "2rem 0",
            alignItems: "center",
          }}
        >
          <Button
            onClick={handleDownload2}
            sx={{
              background:
                currentTheme.palette.type === "light" ? "#dc0019" : "#dc0019",
              width: {
                xs: "300px",
                sm: "333px",
                md: "333px",
                lg: "333px",
              },
              height: "48px",
              padding: "10px, 16px, 10px, 16px",
              borderRadius: "8px",
              fontSize: "16px",
              fontWeight: "1000",
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
            onClick={shareModal}
            sx={{
              width: "100%",
              padding: "10px, 16px, 10px, 16px",
              width: {
                xs: "300px",
                sm: "333px",
                md: "333px",
                lg: "333px",
              },
              height: "48px",
              fontWeight: "1000",
              fontSize: "16px",
              background:
                currentTheme.palette.type === "light" ? "#dc0019" : "#dc0019",
              borderRadius: "8px",
              color: currentTheme.palette.type === "light" ? "#fff" : "#fff",
              borderColor: "#dc0019",
              fontFamily: "raleWay",
              "&:hover": {
                borderColor:
                  currentTheme.palette === "light" ? "#dc0019" : "#dc0019",
              },
            }}
          >
            Share receipt
          </Button>
          <Button
            onClick={handleClearCart}
            sx={{
              width: "100%",
              padding: "10px, 16px, 10px, 16px",
              width: {
                xs: "300px",
                sm: "333px",
                md: "333px",
                lg: "333px",
              },
              height: "48px",
              fontSize: "16px",
              fontWeight: "1000",
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
            Back to Scan
          </Button>
        </Box>

        {/* share modal starts */}

        <SharedReceipt
          handleSharedModal={handleSharedModal}
          setHandleSharedModal={setHandleSharedModal}
          pdfBlob={pdfBlob ? pdfBlob : ""}
        />
        {/* share modal ends */}
      </Container>
    </Box>
  );
};

export default CartReceipt;
