import { Container, Box, Button, Typography } from "@mui/material";
import React from "react";
import BackArrow from "../../components/backArrow/BackArrow";
import { CreateTable } from "../../components/createTable";
import { useSelector } from "react-redux";
import { date } from "../../hooks/useDateForm";
import { useState, useEffect } from "react";
// import QRCode from "react-qr-code";
// import checkLogo from "../images/checkLogo.svg";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const RestaurantReceipt = () => {
  // const value = JSON.stringify(orderLoad, null, 2);
  // const dispatch = useDispatch();
  const navigate = useNavigate();

  const [handleSharedModal, setHandleSharedModal] = useState(false);
  const [pdfBlob, setPdfBlob] = useState(null);

  const generatePDF = async () => {
    const receiptContent = document.querySelector("#receipt");
    const canvas = await html2canvas(receiptContent);
    const imgData = canvas.toDataURL("image/jpeg"); // Corrected "toDataUrl" to "toDataURL"

    const blob = dataURLtoBlob(imgData);
    setPdfBlob(blob);
  };
  useEffect(() => {
    const val = localStorage.getItem("myData");
    if (val) {
      generatePDF();
    } else {
      navigate("/home");
    }
  }, []);

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

  // const shareModal = () => {
  //   setHandleSharedModal(true);
  // };
  const handleDownload = () => {
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

  const { receiptInView, userDetails } = useSelector(
    (state) => state.merchantReducer
  );
  return (
    <Container id="receipt" sx={{ padding: "1em 1em" }}>
      <BackArrow />

      <Container
        sx={{
          padding: "0em",
          overflowY: "auto",
          marginBottom: "150px",
          display: "flex",
          flexDirection: "column",
          gap: ".5em",
        }}
      >
        <Box
          sx={{
            backgroundColor: "#EAEAEA",
            padding: "1em",
            borderRadius: "1em",
          }}
        >
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography fontWeight={700}> PURCHASE RECEIPT</Typography>
            <Typography> ID</Typography>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <span>DATE & TIME: </span>
            <span style={{ fontWeight: "600" }}>
              {" "}
              {date(receiptInView?.createdAt)}{" "}
            </span>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <span>MERCHANT: </span>
            <span style={{ fontWeight: "600" }}>
              {receiptInView?.restaurant?.companyName}{" "}
            </span>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <span>CUSTOMER:</span>
            <span style={{ fontWeight: "600" }}>
              {" "}
              {userDetails?.firstName} &nbsp;{userDetails?.lastName}{" "}
            </span>
          </Box>
        </Box>

        {receiptInView.orders.map((item, i) => {
          return (
            <Box key={i}>
              <Typography fontWeight={600} sx={{ textDecoration: "underline" }}>
                {" "}
                Order {i + 1} ({item.orderType}){" "}
              </Typography>

              <CreateTable order={item.menuItems} />
            </Box>
          );
        })}
        <Box
          sx={{
            display: "flex",
            borderTop: "1px solid grey",
            marginTop: "4em",
            padding: ".5em",
            justifyContent: "space-between",
          }}
        >
          <Typography> TOTAL </Typography>
          <Typography fontWeight={600} sx={{ color: "var(--currency-green)" }}>
            {" "}
            {receiptInView.totalAmount}{" "}
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            margin: "auto",
            width: { xs: "90%", sm: "80%", md: "70%" },
            gap: "1em",
            flexDirection: "column",
          }}
        >
          <Button
            sx={{
              backgroundColor: "var(--primary-red)",
              textTransform: "none",
              '&:hover,&:focus':{backgroundColor: "var(--primary-red)"},
              padding: "1em 0",
              color: "white",
            }}
            onClick={handleDownload}
          >
            {" "}
            Download{" "}
          </Button>
          <Button
            sx={{
              border: "1px solid var(--primary-red)",
              textTransform: "none",
              padding: "1em 0",
              color: "var(--primary-red)",
            }}
          >
            {" "}
            Share{" "}
          </Button>
        </Box>
      </Container>
    </Container>
  );
};
export default RestaurantReceipt;
