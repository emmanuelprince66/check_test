import React from "react";
import { Typography, Box, Container } from "@mui/material";
import "./Elect.css";
import BackArrow from "../../components/backArrow/BackArrow";
import { useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { FormControl } from "@mui/material";
import { TextField } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import CircularProgress from "@mui/material/CircularProgress";
import downIcon from "../../images/downIcon.svg";
import { AuthProvider } from "../../util/AuthContext";

const Elect = () => {
  const currentTheme = useTheme();
  const navigate = useNavigate();

  return (
    <AuthProvider>
      <div className="gpt3__bills">
        <div onClick={() => navigate(-1)}>
          <BackArrow />
        </div>

        <Typography
          variant="h2"
          sx={{
            fontFamily: "raleWay",
            color:
              currentTheme.palette.type === "light" ? "#1E1E1E" : "#EEEEEE",
            fontWeight: 600,
            fontSize: "24px",
            lineHeight: "28.18px",
            marginBottom: "1rem",
          }}
        >
          Electricity
        </Typography>

        <Container
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "start",
            alignItems: "center",
            gap: "1rem",
          }}
        >
          <form className="gpt3__bills-formbox">
            <FormControl
              sx={{
                width: "327px",
                marginBottom: "1rem",
                maginX: "auto",
              }}
              variant="outlined"
            >
              <Typography
                htmlFor="input"
                sx={{
                  paddingX: { xs: "15px", sm: "0px", md: "0px" },
                  fontWeight: 600,
                  marginBottom: "1ch",
                  fontFamily: "raleWay",
                  fontSize: "16px",
                }}
              >
                Service Provider
              </Typography>
              <TextField
                sx={{
                  width: { xs: "300px", sm: "100%", md: "327px" },
                  mx: "auto",
                }}
                disabled
                placeholder="Select Service Provider "
                variant="outlined"
                id="rid"
                InputProps={{
                  endAdornment: (
                    <InputAdornment>
                      <img src={downIcon} alt="e-logo" />
                      &nbsp;&nbsp;
                    </InputAdornment>
                  ),
                }}
                aria-describedby="outlined-weight-helper-text"
                inputProps={{
                  "aria-label": "weight",
                }}
              />
            </FormControl>

            <FormControl
              sx={{
                width: "327px",
                marginBottom: "1rem",
                maginX: "auto",
              }}
              variant="outlined"
            >
              <Typography
                htmlFor="input"
                sx={{
                  paddingX: { xs: "15px", sm: "0px", md: "0px" },
                  fontWeight: 600,
                  marginBottom: "1ch",
                  fontFamily: "raleWay",
                  fontSize: "16px",
                }}
              >
                Package
              </Typography>
              <TextField
                sx={{
                  width: { xs: "300px", sm: "100%", md: "327px" },
                  mx: "auto",
                }}
                disabled
                placeholder="Select Package"
                variant="outlined"
                id="rid"
                InputProps={{
                  endAdornment: (
                    <InputAdornment>
                      <img src={downIcon} alt="e-logo" />
                      &nbsp;&nbsp;
                    </InputAdornment>
                  ),
                }}
                aria-describedby="outlined-weight-helper-text"
                inputProps={{
                  "aria-label": "weight",
                }}
              />
            </FormControl>

            <FormControl
              sx={{
                width: "327px",
                marginBottom: "1rem",
                maginX: "auto",
              }}
              variant="outlined"
            >
              <Typography
                htmlFor="input"
                sx={{
                  paddingX: { xs: "15px", sm: "0px", md: "0px" },
                  fontWeight: 600,
                  marginBottom: "1ch",
                  fontFamily: "raleWay",
                  fontSize: "16px",
                }}
              >
                Metre Number
              </Typography>
              <TextField
                sx={{
                  width: { xs: "300px", sm: "100%", md: "327px" },
                  mx: "auto",
                }}
                placeholder="Enter smart card number"
                variant="outlined"
                id="rid"
                InputProps={{}}
                aria-describedby="outlined-weight-helper-text"
                inputProps={{
                  "aria-label": "weight",
                }}
              />
              <Typography sx={{ fontFamily: "raleWay", textAlign: "right" }}>
                Balance: 12,00000
              </Typography>
            </FormControl>

            <FormControl
              sx={{
                width: "327px",
                marginBottom: "1rem",
                maginX: "auto",
              }}
              variant="outlined"
            >
              <Typography
                htmlFor="input"
                sx={{
                  paddingX: { xs: "15px", sm: "0px", md: "0px" },
                  fontWeight: 600,
                  marginBottom: "1ch",
                  fontFamily: "raleWay",
                  fontSize: "16px",
                }}
              >
                Amount
              </Typography>
              <TextField
                sx={{
                  width: { xs: "300px", sm: "100%", md: "327px" },
                  mx: "auto",
                }}
                placeholder="Amount"
                variant="outlined"
                id="rid"
                InputProps={{}}
                aria-describedby="outlined-weight-helper-text"
                inputProps={{
                  "aria-label": "weight",
                }}
              />
            </FormControl>

            <div className="gpt3__bills-box">
              <button type="submit">Proceed</button>
            </div>
          </form>
        </Container>
      </div>
    </AuthProvider>
  );
};

export default Elect;
