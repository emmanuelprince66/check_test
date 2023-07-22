import React from "react";
import { useTheme } from "@mui/material";
import { Typography, Box, Container } from "@mui/material";
import BackArrow from "../../components/backArrow/BackArrow";
import { TextField } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import passwordLogo from "../../images/passwordLogo.svg";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import FormControl from "@mui/material/FormControl";
import { useState } from "react";
import IconButton from "@mui/material/IconButton";
import { AuthProvider } from "../../util/AuthContext";

const Cpass = () => {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = React.useState(false);

  const currentTheme = useTheme();

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <AuthProvider>
      <div className="gpt3__bills">
        <BackArrow destination="/profile" />

        <Container
          sx={{
            marginTop: "5rem",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography
              sx={{
                fontFamily: "raleWay",
                color:
                  currentTheme.palette.type === "light" ? "#727272" : "#EEEEEE",
                fontWeight: 600,
                fontSize: "16px",
                lineHeight: "20.44px",
                textAlign: "center",
                marginBottom: "1.5rem",
              }}
            >
              Verify your current password and enter new password
            </Typography>
            <form action="">
              <div>
                <FormControl
                  sx={{ width: "327px", marginBottom: "0.5rem", mx: "auto" }}
                >
                  <TextField
                    sx={{
                      width: { xs: "300px", sm: "100%", md: "327px" },
                      mx: "auto",
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": {
                          borderColor: "#CACACA", // Set the desired border color here
                        },
                        "&:hover fieldset": {
                          borderColor: "#CACACA", // Set the border color on hover here
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: "#C57600", // Set the border color on focus here
                        },
                      },
                    }}
                    required
                    name="password"
                    placeholder="Current Password"
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
              <div>
                <FormControl
                  sx={{ width: "327px", marginBottom: "0.5rem", mx: "auto" }}
                >
                  <TextField
                    sx={{
                      width: { xs: "300px", sm: "100%", md: "327px" },
                      mx: "auto",
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": {
                          borderColor: "#CACACA", // Set the desired border color here
                        },
                        "&:hover fieldset": {
                          borderColor: "#CACACA", // Set the border color on hover here
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: "#C57600", // Set the border color on focus here
                        },
                      },
                    }}
                    required
                    name="password"
                    placeholder="New Password"
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
              <div>
                <FormControl
                  sx={{ width: "327px", marginBottom: "0.5rem", mx: "auto" }}
                >
                  <TextField
                    sx={{
                      width: { xs: "300px", sm: "100%", md: "327px" },
                      mx: "auto",
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": {
                          borderColor: "#CACACA", // Set the desired border color here
                        },
                        "&:hover fieldset": {
                          borderColor: "#CACACA", // Set the border color on hover here
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: "#C57600", // Set the border color on focus here
                        },
                      },
                    }}
                    required
                    name="password"
                    placeholder="Verify New Password"
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
            </form>
          </Box>
        </Container>
      </div>
    </AuthProvider>
  );
};

export default Cpass;
