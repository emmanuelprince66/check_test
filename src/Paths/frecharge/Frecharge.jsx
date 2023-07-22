import React from "react";
import "./Frecharge.css";
import { useNavigate } from "react-router-dom";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Form, Formik, Field, ErrorMessage } from "formik";
import BackArrow from "../../components/backArrow/BackArrow";
import { useState, useEffect } from "react";
import * as Yup from "yup";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import downIcon from "../../images/downIcon.svg";
import Data from "../../components/data/Data";
import Acctbox from "../../components/acctbox/Acctbox";
import { useTheme } from "@emotion/react";
import { AuthProvider } from "../../util/AuthContext";

const Frecharge = () => {
  const navigate = useNavigate();
  const currentTheme = useTheme();

  const [isShown, setIsShown] = useState(false);
  const [active, setActive] = useState(false);

  const [textOne, setTextOne] = useState(false);
  const [textTwo, setTextTwo] = useState(false);

  const [phoneNoError, setPhoneNoError] = useState(false);
  const [amountError, setAmountError] = useState(false);

  const [phoneNo, setPhoneNo] = useState("");
  const [amount, setAmount] = useState("");

  const [rname, setRname] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [rnet, setRnet] = useState("");

  const handlePhoneNoBlur = () => {
    if (!phoneNo) {
      setPhoneNoError("Please enter your phone number");
      setTextTwo(true);
    }
  };
  const handleAmountBlur = () => {
    if (!amount) {
      setAmountError("Amount must be specified");
      setTextOne(true);
    }
  };

  const handlePhoneNoChange = (event) => {
    const value = event.target.value;
    setPhoneNo(value);
    if (!value) {
      setPhoneNoError("Phone number cannot be empty");
      setTextTwo(true);
    } else if (!/^0([89][01]|70)\d{8}$/i.test(value)) {
      setTextTwo(true);
      setPhoneNoError("Invalid phone number");
    } else {
      setTextTwo(false);
      setPhoneNoError("");
    }
  };

  const handleAmountChange = (event) => {
    const value = event.target.value;
    const numericValue = value.replace(/\D/g, "");

    setAmount(value);

    if (!numericValue) {
      setTextOne(true);
      setAmountError("invalid characters");
    } else {
      setTextOne(false);
      setAmountError("");
    }
    if (!value) {
      setAmountError("Amount cannot be empty");
      setTextOne(true);
    } else {
      setTextOne(false);
      setPhoneNoError("");
    }
  };

  const showAirtime = () => {
    setIsShown(false);
    setActive(false);
  };

  const showScan = () => {
    setIsShown(true);
    setActive(true);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Perform form submission logic
    if (phoneNo && rname && amount) {
      setIsLoading(true);

      try {
        // Simulate an asynchronous request
        await new Promise((resolve) => setTimeout(resolve, 2000)); // Delay for 2 seconds

        // Perform form submission logic
        const formData = {
          rnet,
          phoneNo,
          amount,
        };
        console.log(formData); // You can access the form data here for further processing

        // Reset the form
        rname("");
        phoneNo("");
        amount("");
      } catch (error) {
        // Handle form submission error
        console.log("Form submission error:", error);
      } finally {
        // Stop the loading state
        setIsLoading(false);
      }
    } else {
      // Handle form submission error
      console.log("Form submission error: Please fill in all required fields.");
    }
  };

  useEffect(() => {
    setActive(false);
  }, []);

  return (
    <AuthProvider>
      <div className="gpt3__frecharge">
        <div onClick={() => navigate(-1)}>
          <BackArrow />
        </div>

        <h6>Airtime & Data</h6>

        <Acctbox />

        <div className="gpt3__frecharge-btn">
          <button
            className={
              active
                ? currentTheme.palette.type === "light"
                  ? undefined
                  : "night"
                : "active"
            }
            onClick={showAirtime}
          >
            Airtime
          </button>
          <button
            className={
              active
                ? "active"
                : currentTheme.palette.type === "light"
                ? undefined
                : "night"
            }
            onClick={showScan}
          >
            Data
          </button>
        </div>

        {!isShown && (
          <form
            className="gpt3__frecharge-formbox"
            action=""
            onSubmit={handleSubmit}
          >
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
                Network
              </Typography>
              <TextField
                sx={{
                  width: { xs: "300px", sm: "100%", md: "327px" },
                  mx: "auto",
                }}
                value={rnet}
                disabled
                placeholder="Select Network "
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
                Amount
              </Typography>
              <TextField
                sx={{
                  width: { xs: "300px", sm: "100%", md: "327px" },
                  mx: "auto",
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: `${textOne ? "#DC0019" : "#CACACA"}`, // Set the desired border color here
                    },
                    "&:hover fieldset": {
                      borderColor: `${textOne ? "#DC0019" : "#CACACA"}`, // Set the border color on hover here
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: `${textOne ? "#DC0019 " : "#C57600"}`, // Set the border color on focus here
                    },
                  },
                }}
                onChange={handleAmountChange}
                onBlur={handleAmountBlur}
                value={amount}
                required
                helperText={amountError && <span>{amountError}</span>}
                placeholder="E.G. N5000 "
                variant="outlined"
                id="rid"
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
                Mobile Number
              </Typography>
              <TextField
                sx={{
                  width: { xs: "300px", sm: "100%", md: "327px" },
                  mx: "auto",
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: `${textTwo ? "#DC0019" : "#CACACA"}`, // Set the desired border color here
                    },
                    "&:hover fieldset": {
                      borderColor: `${textTwo ? "#DC0019" : "#CACACA"}`, // Set the border color on hover here
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: `${textTwo ? "#DC0019 " : "#C57600"}`, // Set the border color on focus here
                    },
                  },
                }}
                onChange={handlePhoneNoChange}
                onBlur={handlePhoneNoBlur}
                value={phoneNo}
                helperText={phoneNoError && <span>{phoneNoError}</span>}
                required
                placeholder="E.G. 09027839393"
                variant="outlined"
                id="rid"
                aria-describedby="outlined-weight-helper-text"
                inputProps={{
                  "aria-label": "weight",
                }}
              />
            </FormControl>

            <div className="gpt3__frecharge-sub">
              <button type="submit" disabled={isLoading}>
                {isLoading ? (
                  <CircularProgress size="1.2rem" color="inherit" />
                ) : (
                  "Proceed"
                )}
              </button>
            </div>
          </form>
        )}
        {isShown && <Data setIsShown={setIsShown} setActive={setActive} />}
      </div>
    </AuthProvider>
  );
};

export default Frecharge;
