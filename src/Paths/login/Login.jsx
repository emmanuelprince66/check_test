import React, { useState, useEffect } from "react";
import { Box } from "@mui/system";
import passwordLogo from "../../images/passwordLogo.svg";
import checkLogo from "../../images/checkLogo.svg";
import emailLogo from "../../images/emailIcon.svg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { axiosInstance } from "../../helpers/axiosInstance";

import CircularProgress from "@mui/material/CircularProgress";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import { Container } from "@mui/system";
import Basic from "../../components/signup/SignUp";

import { useMutation } from "@tanstack/react-query";

import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { setCookie } from "../../util/cookieAuth";
import { useTheme } from "@emotion/react";

const { AuthAxios } = axiosInstance();

const Login = () => {
  const currentTheme = useTheme();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = React.useState(false);

  const [textOne, setTextOne] = useState(false);
  const [textTwo, setTextTwo] = useState(false);
  const [isShown, setIsShown] = useState(false);
  const [active, setActive] = useState(false);

  const navigate = useNavigate();

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

      if (email && password) {
        const formData = {
          emailOrPhone: email,
          password,
        };

        const response = await AuthAxios({
          url: "/auth/login",
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

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const showLogin = () => {
    setIsShown(false);
    setActive(false);
  };

  const showSignUp = () => {
    setIsShown(true);
    setActive(true);
  };

  useEffect(() => {
    setActive(false);
  }, []);

  const regStyle = {
    color: "#DC0019",
    fontWeight: 600,
    cursor: "pointer",
  };

  const handleEmailBlur = () => {
    if (!email) {
      setEmailError("Please enter your email address");
      setTextOne(true);
    }
  };

  const handlePasswordBlur = () => {
    if (!password) {
      setPasswordError("Please enter password");
      setTextTwo(true);
    }
  };

  const handleEmailChange = (event) => {
    const value = event.target.value;
    setEmail(value);
    // setFirstNameError(value ? '' : 'Email is required');

    if (!value) {
      setEmailError("Please enter your email address");
      setTextOne(true);
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
      setTextOne(true);
      setEmailError("Invalid email address");
    } else {
      setTextOne(false);
      setEmailError("");
    }
  };

  const handlePasswordChange = (event) => {
    const value = event.target.value;
    setPassword(value);
    // setLastNameError(value ? '' : 'Last Name is required');

    if (!value) {
      setPasswordError("Password enter password");
      setTextTwo(true);
    } else {
      setTextTwo(false);
      setPasswordError("");
    }
  };

  return (
    <Container>
      <Box
        sx={{
          bgcolor: currentTheme.palette.type === "light" ? "#fff" : "#121212",
          height: "100vh",
          mx: "auto",
        }}
      >
        <div className="gpt3__check-login">
          <div className="gpt3__check-img">
            <div className="gpt3__check-image">
              <img src={checkLogo} alt="check-retail-logo" />
            </div>

            <div className="gpt3__check-img_text">
              <h5>RETAIL</h5>
            </div>
          </div>

          <div className="gpt3__check-auth-btn">
            <button
              className={
                active
                  ? currentTheme.palette.type === "light"
                    ? undefined
                    : "night"
                  : "active"
              }
              onClick={showLogin}
            >
              Login
            </button>
            <button
              className={
                active
                  ? "active"
                  : currentTheme.palette.type === "light"
                  ? undefined
                  : "night"
              }
              onClick={showSignUp}
            >
              Sign Up
            </button>
          </div>

          {!isShown && (
            <form onSubmit={handleSubmit}>
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
                    onChange={handleEmailChange}
                    onBlur={handleEmailBlur}
                    value={email}
                    required
                    helperText={emailError && <span>{emailError}</span>}
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
                    onChange={handlePasswordChange}
                    onBlur={handlePasswordBlur}
                    value={password}
                    required
                    helperText={passwordError && <span>{passwordError}</span>}
                    name="password"
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
                </FormControl>
              </div>

              <div className="gpt3__check-forget">
                <Link to="/forgetpassword">Forget Password?</Link>
              </div>

              <div className="gpt3__check-button">
                <button type="submit" disabled={isLoading}>
                  {isLoading ? (
                    <CircularProgress size="1.2rem" color="inherit" />
                  ) : (
                    "Login"
                  )}
                </button>
              </div>

              <div className="gpt3__check-register-link">
                <p>Dont't have an account yet?</p>
                <span style={regStyle} onClick={showSignUp}>
                  Register
                </span>
              </div>
            </form>
          )}
          {isShown && <Basic setIsShown={setIsShown} setActive={setActive} />}
        </div>
      </Box>
      <ToastContainer />
    </Container>
  );
};

export default Login;
