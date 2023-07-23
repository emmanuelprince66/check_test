import React from "react";
import QrReader from "react-qr-scanner";
import { Box } from "@mui/material";
import useSuperMarketP from "../../hooks/useSuperMarketP";
import { Modal, Button, Card, Typography } from "@mui/material";
import alwaysp from "../../images/alwaysp.svg";
import { useTheme } from "@mui/material";
import vcart from "../../images/practise/vcart.svg";
import { useCallback } from "react";
import { useState, useEffect } from "react";
import Quagga from "quagga";
import { CircularProgress } from "@mui/material";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../../util/slice/CartSlice";
import { useSelector } from "react-redux";

const Scanner = ({ superMarketId }) => {
  const cart = useSelector((state) => state.cart);

  const [result, setResult] = useState("");
  const dispatch = useDispatch();

  const [open, setOpen] = React.useState(false);
  const [count, setCount] = React.useState(0);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const superMarketP = useSuperMarketP(superMarketId, result ? result : "");

  const currentTheme = useTheme();
  const decrement = () => {
    if (count > 0) {
      setCount(count - 1);
    }
  };

  const handleAddToCart = (data) => {
    const isValueInArray = cart.some((item) => item.id === data.id);

    if (isValueInArray) {
      notify("Item is already in cart");
      setOpen(false);
    } else {
      dispatch(addToCart(data));
      notify("Item added to cart");
      setOpen(false);
    }
  };

  const notify = (message) => {
    toast.success(message, {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };

  useEffect(() => {
    Quagga.init(
      {
        inputStream: {
          name: "Live",
          type: "LiveStream",
          target: document.querySelector("#scanner-container"),
          constraints: {
            facingMode: "environment", // or user
          },
          numOfWorkers: 4,
        },
        frequency: 5, // Process every 5 frames
        locate: true,
        debug: false, // Set to true to see the debugging information
        decoder: {
          readers: ["ean_reader"], // Specify the barcode format(s) you want to scan
        },
      },
      (err) => {
        if (err) {
          console.error("Error initializing Quagga:", err);
          return;
        }
        Quagga.start();
      }
    );

    Quagga.onDetected((data) => {
      setResult(data.codeResult.code);
      setOpen(true);
    });

    return () => {
      Quagga.stop();
    };
  }, []);

  return (
    <>
      <Box>
        <Box
          id="scanner-container"
          sx={{
            display: "none",
          }}
        ></Box>
        <QrReader
          delay={300}
          onError={(err) => console.error("Error scanning QR code:", err)}
          style={{ maxWidth: "100%", maxHeight: "100%" }}
          constraints={{
            video: { facingMode: "environment" },
          }}
        />
      </Box>

      <Modal
        className="scale-in-center"
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Card
          sx={{
            position: "absolute",
            borderTopLeftRadius: "10px",
            borderTopRightRadius: "10px",
            bottom: 0,
            width: { xs: "100%", sm: "70%", lg: "31%" },
            left: { xs: "0", sm: "14%", lg: "34%" },
            padding: "1rem",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: "15px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              textAlign: "center",
              flexDirection: "column",
              gap: "0.5rem",
            }}
          >
            <Box>
              <Box sx={{ maxWidth: "30%", mx: "auto" }}>
                <img
                  src={
                    superMarketP.data ? (
                      superMarketP.data.productImage === null ? (
                        alwaysp
                      ) : (
                        superMarketP.data.productImage
                      )
                    ) : (
                      <CircularProgress size="10px" />
                    )
                  }
                  alt="always"
                />
              </Box>
            </Box>

            <Card
              sx={{
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                justifyContent: "center",
                padding: "1rem 2rem",
                my: "0.5rem",
                background:
                  currentTheme.palette.type === "light" ? "#fff" : "#262626",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "baseline",
                  gap: "3px",
                }}
              >
                <Typography
                  sx={{
                    fontFamily: "raleWay",
                    fontSize: "12x",
                    fontWeight: 400,
                  }}
                >
                  {superMarketP.data ? superMarketP.data.description : ""}
                </Typography>
                <Typography
                  sx={{
                    fontFamily: "raleWay",
                    fontSize: " 10px",
                    fontWeight: 400,
                  }}
                >
                  (size {superMarketP.data ? superMarketP.data.weight : ""})
                </Typography>
              </Box>

              <Typography
                sx={{
                  color: "#F79E1B",
                  fontFamily: "raleWay",
                  fontSize: "16px",
                  fontWeight: 600,
                }}
              >
                &#8358;{superMarketP.data ? superMarketP.data.price : ""}
              </Typography>

              {/* Counter */}
              <Box
                sx={{
                  display: "flex",
                  background:
                    currentTheme.palette.type === "light" ? "#535353" : "#000",
                  borderRadius: "39px",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Button
                  size="small"
                  onClick={decrement}
                  sx={{
                    color:
                      currentTheme.palette.type === "light" ? "#fff" : "#fff",
                    fontWeight: "900",
                    padding: "0",
                  }}
                >
                  -
                </Button>
                <Typography
                  sx={{
                    fontFamily: "raleWay",
                    color:
                      currentTheme.palette.type === "light" ? "#fff" : "#fff",
                    fomtWeight: "900",
                    mx: "1ch",
                  }}
                >
                  {count}
                </Typography>
                <Button
                  size="small"
                  onClick={() => setCount(count + 1)}
                  sx={{
                    borderRadius: "36px",
                    color:
                      currentTheme.palette.type === "light" ? "#fff" : "#fff",
                    padding: "0",
                  }}
                >
                  +
                </Button>
              </Box>
              {/* Counter ends */}
            </Card>

            <Button
              onClick={() =>
                handleAddToCart(superMarketP.data ? superMarketP.data : "")
              }
              sx={{
                height: "36px",
                background: "#F6473C",
                borderRadius: "8px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "0.5rem",
                flexGrow: "1",
                cursor: "pointer",
                "&:hover": {
                  backgroundColor: "#F6473C", // Custom background color on hover
                },
                "&:active": {
                  backgroundColor: "#F6473C", // Custom background color on click
                },
              }}
            >
              <img src={vcart} alt="vcart" />
              <Typography
                sx={{
                  color: "#fff",
                  fontSize: "14px",
                  fontFamily: "raleWay",
                  paddingTop: "7px",
                }}
              >
                Add to cart
              </Typography>
            </Button>
          </Box>
        </Card>
      </Modal>
    </>
  );
};

export default Scanner;
