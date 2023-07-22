import React from "react";

import { useState, useEffect } from "react";
import "./SignUp.css";
import { Box } from "@mui/system";
import emailLogo from "../../images/emailIcon.svg";
import passwordLogo from "../../images/passwordLogo.svg";
import userLogo from "../../images/userLogo.svg";
import phoneLogo from "../../images/phoneLogo.svg";
import addressLogo from "../../images/addressLogo.svg";
import exLogo from "../../images/exLogo.svg";
import rightLogo from "../../images/rightLogo.svg";
import wrongLogo from "../../images/wrongLogo.svg";
import { axiosInstance } from "../../helpers/axiosInstance";

import { useMutation } from "@tanstack/react-query";
import { setCookie } from "../../util/cookieAuth";
import { useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Typography from "@mui/material/Typography";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const { AuthAxios } = axiosInstance();

const SignUp = ({ setIsShown, setActive }) => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = React.useState(false);
  const [passwordInput, setPasswordInput] = useState("");

  const [weakP, setWeakP] = useState(false);
  const [mediumP, setMediumP] = useState(false);
  const [strongP, setStrongP] = useState(false);

  const [weak, setWeak] = useState(false);
  const [medium, setMedium] = useState(false);
  const [strong, setStrong] = useState(false);

  const weakPassword = new RegExp("(?=.{8,})");
  const mediumPassword = new RegExp("(?=.*[A-Z])(?=.*[a-z])");
  const strongPassword = new RegExp(
    "(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})"
  );

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNo, setPhoneNo] = useState("");

  const [textOne, setTextOne] = useState(false);
  const [textTwo, setTextTwo] = useState(false);
  const [textThree, setTextThree] = useState(false);
  const [textFour, setTextFour] = useState(false);
  const [textFive, setTextFive] = useState(false);
  const [textSix, setTextSix] = useState(false);

  const [firstNameError, setFirstNameError] = useState(false);
  const [lastNameError, setLastNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [phoneNoError, setPhoneNoError] = useState(false);
  const [addressError, setAddressError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const notify = (message) => {
    toast.error(message, {
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

  const {
    isLoading,
    data,
    mutate: handleSubmit,
  } = useMutation({
    mutationFn: async (event) => {
      event.preventDefault();

      if (
        email &&
        passwordInput &&
        firstName &&
        lastName &&
        address &&
        phoneNo
      ) {
        const formData = {
          firstName,
          password: passwordInput,
          lastName,
          address,
          phoneNumber: phoneNo,
          email,
        };

        const response = await AuthAxios({
          url: "/account/register",
          method: "POST",
          data: formData,
        });

        return response.data;
      }
    },
    onSuccess: (data) => {
      //  console.log(data.access_token);
      const authToken = data.access_token;
      const expirationTime = 5000;
      setCookie("authToken", authToken, expirationTime);
      navigate("/home");
    },
    onError(err) {
      const message = err.response.data.message;
      setTimeout(() => {
        notify(message);
      }, 1);
    },
  });

  const regStyle = {
    color: "#DC0019",
    fontWeight: 600,
    cursor: "pointer",
  };
  const showLogin = () => {
    setIsShown(false);
    setActive(false);
  };
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleFirstNameBlur = () => {
    if (!firstName) {
      setFirstNameError("Please enter your first name");
      setTextOne(true);
    }
  };

  const handleLastNameBlur = () => {
    if (!lastName) {
      setLastNameError("Please enter your last name");
      setTextTwo(true);
    }
  };
  const handleEmailBlur = () => {
    if (!email) {
      setEmailError("Please enter your email address");
      setTextThree(true);
    }
  };
  const handleAddressBlur = () => {
    if (!address) {
      setAddressError("Please  enter your Street Address");
      setTextFive(true);
    }
  };
  const handlePhoneNoBlur = () => {
    if (!phoneNo) {
      setPhoneNoError("Please enter your phone number");
      setTextFour(true);
    }
  };
  const handlePasswordBlur = () => {
    if (!passwordInput) {
      setPasswordError("Please enter your password");
      setTextSix(true);
    }
  };

  const handleFirstNameChange = (event) => {
    const value = event.target.value;
    setFirstName(value);

    if (!value) {
      setFirstNameError("Please enter your first name");
      setTextOne(true);
    } else if (!/^[A-Za-z ]*$/i.test(value)) {
      setTextOne(true);
      setFirstNameError("Please enter a valid first name");
    } else {
      setTextOne(false);
      setFirstNameError("");
    }
  };
  const handleLastNameChange = (event) => {
    const value = event.target.value;
    setLastName(value);

    if (!value) {
      setLastNameError("Please enter your first name");
      setTextTwo(true);
    } else if (!/^[A-Za-z ]*$/i.test(value)) {
      setTextTwo(true);
      setLastNameError("Please enter a valid first name");
    } else {
      setTextTwo(false);
      setLastNameError("");
    }
  };

  const handleEmailChange = (event) => {
    const value = event.target.value;
    setEmail(value);
    if (!value) {
      setEmailError("Please enter your email");
      setTextThree(true);
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
      setTextThree(true);
      setEmailError("Invalid email address");
    } else {
      setTextThree(false);
      setEmailError("");
    }
  };
  const handlePhoneNoChange = (event) => {
    const value = event.target.value;
    setPhoneNo(value);
    if (!value) {
      setPhoneNoError("Please enter your phone number");
      setTextFour(true);
    } else if (!/^0([89][01]|70)\d{8}$/i.test(value)) {
      setTextFour(true);
      setPhoneNoError("Invalid phone number");
    } else {
      setTextFour(false);
      setPhoneNoError("");
    }
  };

  const handleAddressChange = (event) => {
    const value = event.target.value;
    setAddress(value);
    if (!value) {
      setAddressError("Address is required");
      setTextFive(true);
    } else {
      setTextFive(false);
      setAddressError("");
    }
  };

  const handlePasswordChange = (event) => {
    const value = event.target.value;
    setPasswordInput(value);

    weakPassword.test(passwordInput) ? setWeakP(true) : setWeakP(false);

    if (weakPassword.test(passwordInput)) {
      setWeakP(true);
      setWeak(true);
    } else {
      setWeakP(false);
      setWeak(false);
    }

    if (mediumPassword.test(passwordInput)) {
      setMediumP(true);
      setWeakP(false);
      setMedium(true);
    } else {
      setMediumP(false);
      setMedium(false);
    }

    if (strongPassword.test(passwordInput)) {
      setStrongP(true);
      setMediumP(false);
      setStrong(true);
    } else {
      setStrongP(false);
      setStrong(false);
    }

    if (!value) {
      setPasswordError("Please enter your password");
      setTextSix(true);
    } else {
      setTextSix(false);
      setPasswordError("");
    }
  };

  return (
    <div className="gpt3__signup">
      <Typography
        sx={{
          marginLeft: { xs: "1rem" },
          mx: "auto",
          fontFamily: "raleWay",
          marginBottom: "1rem",
        }}
      >
        Getting to meet you will be a pleasure{" "}
      </Typography>

      <form onSubmit={handleSubmit}>
        <div className="gpt3__login-form-box">
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
                First Name
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
                onChange={handleFirstNameChange}
                onBlur={handleFirstNameBlur}
                value={firstName}
                required
                helperText={firstNameError && <span>{firstNameError}</span>}
                placeholder="Enter your first name"
                variant="outlined"
                id="first-name"
                InputProps={{
                  startAdornment: (
                    <InputAdornment>
                      <img src={userLogo} alt="u-logo" />
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
                Last Name
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
                onChange={handleLastNameChange}
                onBlur={handleLastNameBlur}
                value={lastName}
                required
                helperText={lastNameError && <span>{lastNameError}</span>}
                placeholder="Enter your last name"
                variant="outlined"
                id="last-name"
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
                  marginLeft: { xs: "10px" },
                  display: "flex",
                  alignItems: "center",
                  marginY: "1ch",
                }}
              >
                <img src={exLogo} alt="ex-logo" className="ex-logo" />
                &nbsp;
                <p className="ex-logo-text">Your last name is your surname</p>
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
                Email Address
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
                onChange={handleEmailChange}
                onBlur={handleEmailBlur}
                value={email}
                required
                helperText={emailError && <span>{emailError}</span>}
                name="email"
                placeholder="example@domain.com"
                variant="outlined"
                id="email-input"
                InputProps={{
                  startAdornment: (
                    <InputAdornment>
                      <img src={emailLogo} alt="e-logo" />
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
                Phone Number
              </Typography>
              <TextField
                sx={{
                  width: { xs: "300px", sm: "100%", md: "327px" },
                  mx: "auto",
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: `${textFour ? "#DC0019" : "#CACACA"}`, // Set the desired border color here
                    },
                    "&:hover fieldset": {
                      borderColor: `${textFour ? "#DC0019" : "#CACACA"}`, // Set the border color on hover here
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: `${textFour ? "#DC0019 " : "#C57600"}`, // Set the border color on focus here
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
                      <img src={phoneLogo} alt="e-logo" />
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
                  marginLeft: { xs: "10px" },
                  display: "flex",
                  alignItems: "center",
                  marginY: "1ch",
                }}
              >
                <img src={exLogo} alt="ex-logo" className="ex-logo" />
                &nbsp;
                <p className="ex-logo-text">
                  Please ensure your phone number is correct
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
                Address
              </Typography>
              <TextField
                sx={{
                  width: { xs: "300px", sm: "100%", md: "327px" },
                  mx: "auto",
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: `${textFive ? "#DC0019" : "#CACACA"}`, // Set the desired border color here
                    },
                    "&:hover fieldset": {
                      borderColor: `${textFive ? "#DC0019" : "#CACACA"}`, // Set the border color on hover here
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: `${textFive ? "#DC0019 " : "#C57600"}`, // Set the border color on focus here
                    },
                  },
                }}
                onChange={handleAddressChange}
                onBlur={handleAddressBlur}
                value={address}
                required
                helperText={addressError && <span>{addressError}</span>}
                placeholder="Enter your address"
                variant="outlined"
                id="address-input"
                InputProps={{
                  startAdornment: (
                    <InputAdornment>
                      <img src={addressLogo} alt="e-logo" />
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
            <FormControl sx={{ width: "327px", marginBottom: "0.5rem" }}>
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
                Password
              </Typography>
              <TextField
                sx={{
                  width: { xs: "300px", sm: "100%", md: "327px" },
                  mx: "auto",
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: `${textSix ? "#DC0019" : "#CACACA"}`, // Set the desired border color here
                    },
                    "&:hover fieldset": {
                      borderColor: `${textSix ? "#DC0019" : "#CACACA"}`, // Set the border color on hover here
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: `${textSix ? "#DC0019 " : "#C57600"}`, // Set the border color on focus here
                    },
                  },
                }}
                onChange={handlePasswordChange}
                onBlur={handlePasswordBlur}
                value={passwordInput}
                required
                helperText={passwordError && <span>{passwordError}</span>}
                placeholder="Enter your Password"
                id="password-input"
                type={showPassword ? "text" : "password"}
                InputProps={{
                  startAdornment: (
                    <InputAdornment>
                      <img src={passwordLogo} alt="password-logo" />{" "}
                      &nbsp;&nbsp;
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment>
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                aria-describedby="outlined-weight-helper-text"
                inputProps={{
                  "aria-label": "weight",
                }}
              />

              <div className="gpt3__password-strength">
                <p>Password Strength :</p>

                <div className="gpt3__password-flex">
                  <div className="gpt3__password-strength-div">
                    <span
                      id="weak"
                      className={weakP ? " weak " : undefined}
                    ></span>

                    <span className={mediumP ? " medium " : undefined}></span>

                    <span className={strongP ? " strong " : undefined}></span>
                  </div>

                  <div className="gpt3__password-text">
                    <p>Weak</p>
                    <p>Medium</p>
                    <p>Strong</p>
                  </div>
                </div>
              </div>

              <div className="gpt3__requirement">
                <h4>We Require</h4>

                <div className="gpt3__requirement-div">
                  <img src={weak ? rightLogo : wrongLogo} alt="" />
                  <p>To be at least 8 characters long</p>
                </div>

                <div className="gpt3__requirement-div">
                  <img src={medium ? rightLogo : wrongLogo} alt="" />
                  <p>To contain Uppercase and Lowercase.</p>
                </div>

                <div className="gpt3__requirement-div">
                  <img src={strong ? rightLogo : wrongLogo} alt="" />
                  <p>To have a number and symbol.</p>
                </div>
              </div>
            </FormControl>
          </div>

          <div className="gpt3__check-button">
            <button type="submit" disabled={isLoading}>
              {isLoading ? (
                <CircularProgress size="1.2rem" color="inherit" />
              ) : (
                "Sign Up"
              )}
            </button>
          </div>

          <div className="gpt3__check-register-link">
            <p>Already have an account </p>
            <span style={regStyle} onClick={showLogin}>
              Login
            </span>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
