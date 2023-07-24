import React, { useEffect, useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import Scanner from "../../components/scanner/Scanner";
import { AuthProvider } from "../../util/AuthContext";
import BackArrow from "../../components/backArrow/BackArrow";
import { ToastContainer, toast } from "react-toastify";

import {
  Box,
  Container,
  Card,
  Typography,
  CircularProgress,
} from "@mui/material";
import { useTheme } from "@mui/material";
import "./Scan.css";
import useSuperMarket from "../../hooks/useSuperMarket";
import { useNavigate } from "react-router-dom";

const Scan = () => {
  const navigate = useNavigate();
  const [superMarketKey, setSuperMarketKey] = useState("");
  const superMarket = useSuperMarket(superMarketKey);

  const currentTheme = useTheme();
  useEffect(() => {
    const val = localStorage.getItem("myData");
    val ? setSuperMarketKey(val) : navigate("/home");
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
              height: "70px",
              width: "100%",
              borderRadius: "16px",
              padding: "0.5rem",
              marginY: "1rem",
              backgroundColor:
                currentTheme.palette.type === "light" ? "#fff" : "#333333",
            }}
          >
            <Box
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  flexDirection: "column",
                  alignItems: "start",
                  flex: "4",
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
                    <CircularProgress size="0.3rem" />
                  )}
                </Typography>

                <Box sx={{ display: "flex", alignItems: "center", gap: "4px" }}>
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
                    &#8358;0
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Card>

          <Box
            sx={{
              minWidth: "100%",
              minHeight: "100%",
              overflow: "hidden",
              display: "flex",
              padding: "0.5rem",
              justifyContent: "center",
              alignItems: "center",
              border: `2px hidden ${
                currentTheme.palette.type === "light" ? "#000" : "#fff"
              }`,
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
        </Container>

        <ToastContainer />
      </Box>

      {/* NAVBAR */}

      <Navbar />
    </AuthProvider>
  );
};

export default Scan;
