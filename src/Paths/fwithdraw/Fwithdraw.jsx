import React, { useState } from "react";
import "./Fwithdraw.css";
import BackArrow from "../../components/backArrow/BackArrow";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";
import exLogo from "../../images/exLogo.svg";
import bankIcon from "../../images/bankIcon.svg";
import messIcon from "../../images/messIcon.svg";
import userIcon from "../../images/userLogo.svg";
import downArrow from "../../images/downIcon.svg";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import { Box, Container } from "@mui/system";
import SwitchIcon from "../../components/swi/SwitchIcon";
import { Card } from "@mui/material";
import Acctbox from "../../components/acctbox/Acctbox";
import { useTheme } from "@emotion/react";
import styled from "@emotion/styled";
import { Modal, Button } from "@mui/material";

const Fwithdraw = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const currentTheme = useTheme();

  const MyTypography = styled(Typography)(({ theme }) => ({
    color: currentTheme.palette.type === "light" ? "#373737" : "#fff",
    fontSize: "16px",
    fontFamily: "raleWay",
    fontWeight: 400,
  }));

  const [textOne, setTextOne] = useState(false);
  const [textTwo, setTextTwo] = useState(false);
  const [textThree, setTextThree] = useState(false);

  const [phoneNoError, setPhoneNoError] = useState(false);
  const [anameError, setanameError] = useState(false);
  const [amountError, setAmountError] = useState(false);

  const [phoneNo, setPhoneNo] = useState("");
  const [aname, setaname] = useState("");
  const [amount, setAmount] = useState("");
  const [bname, setbname] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isTextVisible, setIsTextVisible] = useState(false);

  const handlePhoneNoBlur = () => {
    if (!phoneNo) {
      setPhoneNoError("Account cannot be empty");
      setTextTwo(true);
    }
  };
  const handleAmountBlur = () => {
    if (!amount) {
      setAmountError("Amount cannot be empty");
      setTextOne(true);
    }
  };
  const handleanameBlur = () => {
    if (!aname) {
      setanameError("Account number cannot be empty");
      setTextThree(true);
    }
  };
  const handlePhoneNoChange = (event) => {
    const value = event.target.value;
    setPhoneNo(value);
    const numericValue = value.replace(/\D/g, "");

    if (numericValue) {
      setTextTwo(true);
      setAmountError("Invalid characters");
    } else {
      setTextTwo(false);
      setAmountError("");
    }
    if (!value) {
      setPhoneNoError("Account number cannot be empty");
      setTextTwo(true);
    } else if (!/^0([89][01]|70)\d{8}$/i.test(value)) {
      setTextTwo(true);
      setPhoneNoError("Invalid account number");
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
      setAmountError("Amount cannot be empty");
      setTextOne(true);
    } else {
      setTextOne(false);
      setAmountError("");
    }

    if (numericValue) {
      setTextOne(true);
      setAmountError("Invalid characters");
    } else {
      setTextOne(false);
      setAmountError("");
    }
  };
  const handleanameChange = (event) => {
    const value = event.target.value;
    setAmount(value);
    if (!value) {
      setAmountError("Account name cannot be empty");
      setTextThree(true);
    } else {
      setTextThree(false);
      setAmountError("");
    }

    if (numericValue) {
      setTextThree(true);
      setAmountError("Invalid characters");
    } else {
      setTextThree(false);
      setAmountError("");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Perform form submission logic
    if (phoneNo && bname && amount && aname) {
      setIsLoading(true);

      try {
        // Simulate an asynchronous request
        await new Promise((resolve) => setTimeout(resolve, 2000)); // Delay for 2 seconds

        // Perform form submission logic
        const formData = {
          amount,
          bname,
          phoneNo,
          aname,
        };
        console.log(formData); // You can access the form data here for further processing

        // Reset the form
        amount("");
        phoneNo("");
        amount("");
        bname("");
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
  return (
    <AuthProvider>
      <div className="gpt3__fwithdraw">
        <BackArrow destination="/wallet" />

        <h6>Withdraw Funds</h6>

        <Acctbox />

        <div className="gpt3__fwithdraw-details">
          <div className="img">
            <img src={exLogo} alt="act-logo" />
          </div>

          <p>
            Kindly note that withdrawals can only be received with bank accounts
            that carry the same name you registered with Check
          </p>
        </div>

        <form action="" onSubmit={handleSubmit}>
          <div className="gpt3__wtransfer-formbox">
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
                  placeholder="E.G N5000"
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
                  Bank Name
                </Typography>
                <TextField
                  sx={{
                    width: { xs: "300px", sm: "100%", md: "327px" },
                    mx: "auto",
                  }}
                  disabled
                  value={bname}
                  required
                  placeholder="Tap to select"
                  variant="outlined"
                  id="amount"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment>
                        <img src={bankIcon} alt="u-logo" />
                        &nbsp;&nbsp;
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment>
                        <img src={downArrow} alt="d-logo" />
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
            </div>

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
                  Account Number
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
                  required
                  helperText={phoneNoError && <span>{phoneNoError}</span>}
                  placeholder="Enter your phone number"
                  variant="outlined"
                  id="phone-number"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment>
                        <img src={userIcon} alt="e-logo" />
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
            </div>

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
                  Account Name
                </Typography>
                <TextField
                  sx={{
                    width: { xs: "300px", sm: "100%", md: "327px" },
                    mx: "auto",
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: `${textThree ? "#DC0019" : "#CACACA"}`, // Set the desired border color here
                      },
                      "&:hover fieldset": {
                        borderColor: `${textThree ? "#DC0019" : "#CACACA"}`, // Set the border color on hover here
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: `${textThree ? "#DC0019 " : "#C57600"}`, // Set the border color on focus here
                      },
                    },
                  }}
                  onChange={handleanameChange}
                  onBlur={handleanameBlur}
                  value={aname}
                  required
                  helperText={anameError && <span>{anameError}</span>}
                  placeholder="Enter account name"
                  variant="outlined"
                  id="phone-number"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment>
                        <img src={userIcon} alt="e-logo" />
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
            </div>

            <div className="gpt3__fwithdraw-details">
              <div className="img">
                <img src={exLogo} alt="act-logo" />
              </div>

              <p>
                Hi, first time withdrawing? Save your bank details to proceed.
              </p>
            </div>

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
                margin: "0.5rem 0",
              }}
            >
              <MyTypography>Save bank details</MyTypography>

              <Box>
                <SwitchIcon />
              </Box>
            </Box>
          </div>

          <div className="gpt3__fwithdraw-sub">
            <button type="submit" onClick={handleOpen} disabled={isLoading}>
              {isLoading ? (
                <CircularProgress size="1.2rem" color="inherit" />
              ) : (
                "Withdraw Funds"
              )}
            </button>
          </div>
        </form>

        <Modal
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
              width: { xs: "100%", sm: "70%", lg: "25%" },
              left: { xs: "0", sm: "14%", lg: "37%" },
              padding: "1rem",
              display: "flex",
              flexDirection: "column",
              justifyContent: "start",
              alignItems: "start",
            }}
          >
            <Container
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "start",
                alignItems: "start",
              }}
            >
              <Box onClick={handleClose}>
                <BackArrow />
              </Box>

              <Typography
                sx={{
                  color:
                    currentTheme.palette.type === "light"
                      ? "#1E1E1E"
                      : "#D4D4D4",
                  fontWeight: 600,
                  fontFamily: "raleWay",
                  fontSize: "16px",
                }}
              >
                Confirm your Details
              </Typography>

              <Typography
                sx={{
                  color:
                    currentTheme.palette.type === "light"
                      ? "#727272"
                      : "#D4D4D4",
                  fontWeight: 400,
                  fontFamily: "raleWay",
                  fontSize: "16px",
                }}
              >
                Tap “proceed” if details are correct or “edit details” if
                otherwise.
              </Typography>

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "100%",
                  borderBottom: "1px solid #CDCDCD",
                }}
              >
                <Typography
                  sx={{
                    fontFamily: "raleWay",
                    fontWeight: 400,
                    fontSize: "12px",
                    lineHeight: "18.78px",
                    marginY: "1rem",
                    color:
                      currentTheme.palette.type === "light"
                        ? "#727272"
                        : "#D4D4D4",
                  }}
                  id="modal-modal-title"
                >
                  AMOUNT TO WITHDRAW
                </Typography>

                <Typography
                  sx={{
                    fontFamily: "raleWay",
                    fontWeight: 600,
                    fontSize: "16px",
                    lineHeight: "18.78px",
                    marginY: "1rem",
                    color:
                      currentTheme.palette.type === "light"
                        ? "#1E1E1E"
                        : "#EEEEEE",
                  }}
                  id="modal-modal-title"
                >
                  ₦10,000
                </Typography>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "100%",
                  borderBottom: "1px solid #CDCDCD",
                }}
              >
                <Typography
                  sx={{
                    fontFamily: "raleWay",
                    fontWeight: 400,
                    fontSize: "12px",
                    lineHeight: "18.78px",
                    marginY: "1rem",
                    color:
                      currentTheme.palette.type === "light"
                        ? "#727272"
                        : "#D4D4D4",
                  }}
                  id="modal-modal-title"
                >
                  BANK NAME
                </Typography>

                <Typography
                  sx={{
                    fontFamily: "raleWay",
                    fontWeight: 600,
                    fontSize: "16px",
                    lineHeight: "18.78px",
                    marginY: "1rem",
                    color:
                      currentTheme.palette.type === "light"
                        ? "#1E1E1E"
                        : "#EEEEEE",
                  }}
                  id="modal-modal-title"
                >
                  Guarantee Trust Bank
                </Typography>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "100%",
                  borderBottom: "1px solid #CDCDCD",
                }}
              >
                <Typography
                  sx={{
                    fontFamily: "raleWay",
                    fontWeight: 400,
                    fontSize: "12px",
                    lineHeight: "18.78px",
                    marginY: "1rem",
                    color:
                      currentTheme.palette.type === "light"
                        ? "#727272"
                        : "#D4D4D4",
                  }}
                  id="modal-modal-title"
                >
                  ACCT NO :
                </Typography>

                <Typography
                  sx={{
                    fontFamily: "raleWay",
                    fontWeight: 600,
                    fontSize: "16px",
                    lineHeight: "18.78px",
                    marginY: "1rem",
                    color:
                      currentTheme.palette.type === "light"
                        ? "#1E1E1E"
                        : "#EEEEEE",
                  }}
                  id="modal-modal-title"
                >
                  0212345678
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "100%",
                  borderBottom: "1px solid #CDCDCD",
                  marginBottom: "2.5rem",
                }}
              >
                <Typography
                  sx={{
                    fontFamily: "raleWay",
                    fontWeight: 400,
                    fontSize: "12px",
                    lineHeight: "18.78px",
                    marginY: "1rem",
                    color:
                      currentTheme.palette.type === "light"
                        ? "#727272"
                        : "#D4D4D4",
                  }}
                  id="modal-modal-title"
                >
                  ACCT NAME :
                </Typography>

                <Typography
                  sx={{
                    fontFamily: "raleWay",
                    fontWeight: 600,
                    fontSize: "16px",
                    lineHeight: "18.78px",
                    marginY: "1rem",
                    color:
                      currentTheme.palette.type === "light"
                        ? "#1E1E1E"
                        : "#EEEEEE",
                  }}
                  id="modal-modal-title"
                >
                  Olosunde Oluwatobiloba S...
                </Typography>
              </Box>

              <Button
                sx={{
                  background:
                    currentTheme.palette.type === "light"
                      ? "#dc0019"
                      : "#dc0019",
                  width: "95%",
                  marginY: "1rem",
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
                Proceed
              </Button>
              <Button
                onClick={handleClose}
                sx={{
                  width: "95%",
                  padding: "10px",
                  borderRadius: "8px",
                  color:
                    currentTheme.palette.type === "light" ? "#000" : "#fff",
                  borderColor: "#dc0019",
                  fontFamily: "raleWay",
                  "&:hover": {
                    borderColor:
                      currentTheme.palette === "light" ? "#dc0019" : "#dc0019",
                  },
                }}
                variant="outlined"
              >
                Edit Details
              </Button>
            </Container>
          </Card>
        </Modal>
      </div>
    </AuthProvider>
  );
};

export default Fwithdraw;
