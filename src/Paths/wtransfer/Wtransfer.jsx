import React, { useEffect, useState } from "react";
import "./Wtransfer.css";
import BackArrow from "../../components/backArrow/BackArrow";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";
import { Box, Container } from "@mui/system";
import userLogo from "../../images/userLogo.svg";
import messIcon from "../../images/messIcon.svg";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import exLogo from "../../images/exLogo.svg";
import { Divider } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Acctbox from "../../components/acctbox/Acctbox";
import { useTheme } from "@mui/material";
import { AuthProvider } from "../../util/AuthContext";

const Wtransfer = () => {
  const [active, setActive] = useState(false);
  const [isShown, setIsShown] = useState(false);

  const [textOne, setTextOne] = useState(false);
  const [textTwo, setTextTwo] = useState(false);

  const [phoneNoError, setPhoneNoError] = useState(false);
  const [amountError, setAmountError] = useState(false);

  const [phoneNo, setPhoneNo] = useState("");
  const [amount, setAmount] = useState("");

  const [rname, setRname] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isTextVisible, setIsTextVisible] = useState(false);

  const navigate = useNavigate();
  const currentTheme = useTheme();

  const handlePhoneNoBlur = () => {
    if (!phoneNo) {
      setPhoneNoError("Please enter your phone number");
      setTextOne(true);
    }
  };
  const handleAmountBlur = () => {
    if (!amount) {
      setAmountError("Amount must be specified");
      setTextTwo(true);
    }
  };

  const handlePhoneNoChange = (event) => {
    const value = event.target.value;
    const numericValue = value.replace(/\D/g, "");
    setPhoneNo(numericValue);
    if (!value) {
      setPhoneNoError("Please enter Recipient wallet ID");
      setTextTwo(true);
    } else {
      setTextTwo(false);
      setPhoneNoError("");
    }
  };

  const handleAmountChange = (event) => {
    const value = event.target.value;
    const numericValue = value.replace(/\D/g, "");
    setAmount(numericValue);
    if (!value) {
      setAmountError("Please enter your phone number");
      setTextTwo(true);
    } else {
      setTextTwo(false);
      setPhoneNoError("");
    }

    if (value.length <= 1 && numericValue) {
      setTextTwo(true);
      setAmountError("You cannot transfer less than N10");
    } else {
      setTextTwo(false);
      setAmountError("");
    }
  };

  const showWallet = () => {
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
          rname,
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
      <div className="gpt3__wtransfer">
        <div onClick={() => navigate(-1)}>
          <BackArrow />
        </div>

        <h6>Transfer Funds</h6>

        <Acctbox />

        <div className="gpt3__wtransfer-btn">
          <button
            className={
              active
                ? currentTheme.palette.type === "light"
                  ? undefined
                  : "night"
                : "active"
            }
            onClick={showWallet}
          >
            Wallet ID
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
            Scan Qr Code
          </button>
        </div>

        {!isShown && (
          <form onSubmit={handleSubmit}>
            <div className="gpt3__wtransfer-formbox">
              <div>
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
                    Recipient wallet ID
                  </Typography>
                  <TextField
                    sx={{
                      width: {
                        xs: "300px",
                        sm: "100%",
                        md: "327px",
                        lg: "327px",
                      },
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
                    onChange={handlePhoneNoChange}
                    onBlur={handlePhoneNoBlur}
                    value={phoneNo}
                    required
                    helperText={phoneNoError && <span>{phoneNoError}</span>}
                    placeholder="Enter Recipient wallet ID"
                    variant="outlined"
                    id="phone-number"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment>
                          <img src={userLogo} alt="e-logo" />
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
                      marginLeft: "5px",
                      display: "flex",
                      alignItems: "center",
                      marginY: "1ch",
                      gap: "2px",
                    }}
                  >
                    <img src={exLogo} alt="ex-logo" className="ex-logo" />
                    &nbsp;
                    <p className="ex-logo-text">
                      Walled ID is the phone number registered with Check.
                    </p>
                  </Box>
                </FormControl>
              </div>

              <div>
                <FormControl
                  sx={{
                    width: "327px",
                    marginBottom: "0.5rem",
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
                    Recipient Name
                  </Typography>
                  <TextField
                    sx={{
                      width: { xs: "300px", sm: "100%", md: "327px" },
                      mx: "auto",
                    }}
                    disabled
                    value={rname}
                    required
                    placeholder="Recipient Name"
                    variant="outlined"
                    id="rname"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment>
                          <img src={userLogo} alt="e-logo" />
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
                      marginLeft: "10px",
                      display: "flex",
                      alignItems: "center",
                      marginY: "1ch",
                      gap: "2px",
                    }}
                  >
                    <img src={exLogo} alt="ex-logo" className="ex-logo" />
                    &nbsp;
                    <p className="ex-logo-text">
                      Recipient name is auto-filled
                    </p>
                  </Box>
                </FormControl>
              </div>

              <div>
                <FormControl
                  sx={{
                    width: "327px",
                    maginX: "auto",
                    marginBottom: "0.5rem",
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
                    onChange={handleAmountChange}
                    onBlur={handleAmountBlur}
                    value={amount}
                    required
                    helperText={amountError && <span>{amountError}</span>}
                    placeholder="Enter amount to transfer"
                    variant="outlined"
                    id="amount"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment>
                          <img src={messIcon} alt="u-logo" />
                          &nbsp;&nbsp;
                        </InputAdornment>
                      ),
                    }}
                    aria-describedby="outlined-weight-helper-text"
                    inputProps={{
                      "aria-label": "weight",
                    }}
                  />
                  <Divider
                    sx={{ bgColor: "secondary.light", marginY: "1rem" }}
                  />
                </FormControl>
              </div>

              <div className="gpt3__wtransfer-charges">
                <div className="charges">
                  <p className="text">Chargers</p>
                  <p className="text">Total Amount</p>
                </div>

                <div className="charges">
                  <p className="textc">1.80</p>
                  <p className="textc">0.80</p>
                </div>
              </div>

              <div className="gpt3__wtransfer-sub">
                <button type="submit" disabled={isLoading}>
                  {isLoading ? (
                    <CircularProgress size="1.2rem" color="inherit" />
                  ) : (
                    "Transfer"
                  )}
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </AuthProvider>
  );
};

export default Wtransfer;
