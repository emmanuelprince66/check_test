import React from "react";
import BackArrow from "../../components/backArrow/BackArrow";
import { useNavigate } from "react-router-dom";
import { Card, Box, Typography } from "@mui/material";
import { useTheme } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import icircle from "../../images/info-circle.svg";
import searchLogo from "../../images/searchLogo.svg";
import OTD from "../../images/OTD.svg";
import OTD1 from "../../images/OTD1.svg";
import dashdot from "../../images/dashdot.svg";
import res1 from "../../images/res1.svg";
import res2 from "../../images/res2.svg";
import "./Rl.css";
import { AuthProvider } from "../../util/AuthContext";

const Rlocation = () => {
  const currentTheme = useTheme();
  const navigate = useNavigate();

  return (
    <AuthProvider>
      <div className="max_width">
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "start",
            alignItems: "start",
            marginX: "auto",
            // background:"red",
            width: { xs: "100%" },
          }}
        >
          <div onClick={() => navigate(-1)}>
            <BackArrow />
          </div>

          <Typography
            variant="h2"
            sx={{
              fontFamily: "raleWay",
              color:
                currentTheme.palette.type === "light" ? "#000000" : "#EEEEEE",
              fontWeight: 600,
              fontSize: "24px",
              lineHeight: "28.18px",
              marginBottom: "1rem",
            }}
          >
            Order to Doorstep
          </Typography>

          <TextField
            sx={{
              width: { xs: "100%", sm: "25rem", md: "327px" },
              mx: "auto",
              color:
                currentTheme.palette.type === "light" ? "#727272" : "#D4D4D4",
              borderRadius: "5px",
              background:
                currentTheme.palette.type === "light" ? "#F8F8F8" : "#242424",
              "& .MuiOutlinedInput-root": {
                "&.Mui-focused fieldset": {
                  borderColor: "#C57600", // Set the border color on focus here
                },
              },
            }}
            required
            placeholder="Enter your address"
            variant="outlined"
            id="address-input"
            InputProps={{
              startAdornment: (
                <InputAdornment>
                  <img src={searchLogo} alt="s-logo" />
                  &nbsp;&nbsp;
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment>
                  <img src={dashdot} alt="dash-logo" />
                  &nbsp;&nbsp;
                </InputAdornment>
              ),
            }}
            aria-describedby="outlined-weight-helper-text"
            inputProps={{
              "aria-label": "weight",
            }}
          />

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "start",
              alignItems: "start",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "top",
                gap: "5px",
                marginTop: "1rem",
                marginBottom: "0.5rem",
              }}
            >
              <Typography
                variant="h2"
                sx={{
                  fontFamily: "raleWay",
                  color:
                    currentTheme.palette.type === "light"
                      ? "#000000"
                      : "#EEEEEE",
                  fontWeight: 600,
                  fontSize: "20px",
                  lineHeight: "23.18px",
                  marginBottom: "1rem",
                }}
              >
                Restaurants Near You
              </Typography>

              <Box
                sx={{
                  paddingTop: "4px",
                }}
              >
                <img src={icircle} alt="i-logo" />
              </Box>
            </Box>
          </Box>
        </Box>
        <Card
          sx={{
            display: "flex",
            alignItems: "center",
            margin: "auto",
            justifyContent: { xs: "center", sm: "space-around" },
            gap: "10px",
            width: { xs: "100%", sm: "400px", md: "350px" },
          }}
        >
          <Box
            sx={{
              paddingTop: "8px",
              paddingLeft: "8px",
            }}
          >
            <img src={res2} className="jkk" alt="res" />
          </Box>

          <Box>
            <img src={OTD1} className="jkk" alt="otd" />
          </Box>
        </Card>

        <Card
          sx={{
            display: "flex",
            alignItems: "center",
            margin: "auto",
            justifyContent: { xs: "center", sm: "space-around" },
            gap: "10px",
            width: { xs: "100%", sm: "400px", md: "350px" },
            marginY: "1rem",
          }}
        >
          <Box
            sx={{
              paddingTop: "8px",
              paddingLeft: "8px",
            }}
          >
            <img src={res1} className="jkk" alt="res" />
          </Box>

          <Box>
            <img src={OTD} className="jkk" alt="otd" />
          </Box>
        </Card>

        <Card
          sx={{
            display: "flex",
            alignItems: "center",
            margin: "auto",
            justifyContent: { xs: "center", sm: "space-around" },
            gap: "10px",
            width: { xs: "100%", sm: "400px", md: "350px" },
          }}
        >
          <Box
            sx={{
              paddingTop: "8px",
              paddingLeft: "8px",
            }}
          >
            <img src={res2} className="jkk" alt="res" />
          </Box>

          <Box>
            <img src={OTD1} className="jkk" alt="otd" />
          </Box>
        </Card>
      </div>
    </AuthProvider>
  );
};

export default Rlocation;
