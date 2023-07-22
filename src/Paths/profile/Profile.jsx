import React from "react";
import Navbar from "../../components/navbar/Navbar";
import colorqr from "../../images/colorqr.svg";
import colorpad from "../../images/colorpad.svg";
import colornoti from "../../images/colornoti.svg";
import colormoon from "../../images/colormoon.svg";
import colorsup from "../../images/colorsup.svg";
import colorearn from "../../images/colorearn.svg";
import colorlog from "../../images/colorlog.svg";
import arrowLeft from "../../images/arrowLeft.svg";
import { Link, Navigate } from "react-router-dom";
import SwitchIcon from "../../components/swi/SwitchIcon";
import { Button, createTheme, ThemeProvider } from "@mui/material";
import { Switch } from "@mui/material";
import { useTheme } from "@mui/material";
import { AuthProvider } from "../../util/AuthContext";
import QrCode from "../../components/QrCode";

import { Container, Typography, Box, Card } from "@mui/material";
import "./Profile.css";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { Modal } from "@mui/material";

const theme = createTheme({
  components: {
    MuiSwitch: {
      styleOverrides: {
        root: {
          width: 42,
          height: 26,
          padding: 0,
          display: "flex",
        },
      },
    },
  },
});

const Profile = ({ darkMode, onToggleDarkMode }) => {
  const [open, setOpen] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleOpen2 = () => setOpen2(true);
  const handleClose2 = () => setOpen2(false);
  const handleClose = () => setOpen(false);

  const navigate = useNavigate();

  const handleLogOut = () => {
    Cookies.remove("authToken");
    navigate("/");
  };

  const currentTheme = useTheme();

  return (
    <AuthProvider>
      <div className="gpt3__profile">
        <Container sx={{ width: "100%" }}>
          <Typography
            sx={{ fontFamily: "raleWay", fontSize: "24px", fontWeight: 600 }}
          >
            My Profile
          </Typography>

          <Box sx={{ marginY: "3ch" }}>
            <Typography
              sx={{
                fontFamily: "raleWay",
                fontSize: "12px",
                fontWeight: 600,
                marginBottom: "1.2ch",
              }}
            >
              Profile
            </Typography>

            <Link to="">
              <Card
                sx={{
                  background:
                    currentTheme.palette.type === "light" ? "#fff" : "#2C2C2E",
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "1rem",
                  alignItems: "center",
                  marginTop: "0.3rem",
                }}
              >
                <Box
                  sx={{ display: "flex", alignItems: "center", gap: "13px" }}
                >
                  <img src={colorqr} alt="color-qr" />
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      gap: "5px",
                    }}
                    onClick={handleOpen2}
                  >
                    <Typography
                      sx={{
                        fontFamily: "raleWay",
                        fontSize: "16px",
                        fontWeight: 600,
                      }}
                    >
                      My QR Code
                    </Typography>
                    <Typography
                      sx={{
                        fontFamily: "raleWay",
                        fontSize: "10px",
                        fontWeight: 400,
                      }}
                    >
                      Receive funds with your unique QR Code
                    </Typography>
                  </Box>
                </Box>

                <Box>
                  <img src={arrowLeft} alt="arw-left" />
                </Box>
              </Card>
            </Link>
          </Box>

          <Box sx={{ marginY: "3ch" }}>
            <Typography
              sx={{
                fontFamily: "raleWay",
                fontSize: "12px",
                fontWeight: 600,
                marginBottom: "1.2ch",
              }}
            >
              Security
            </Typography>

            <Link to="/cpass">
              <Card
                sx={{
                  background:
                    currentTheme.palette.type === "light" ? "#fff" : "#2C2C2E",
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "1rem",
                  alignItems: "center",
                  marginBottom: "1rem",
                }}
              >
                <Box
                  sx={{ display: "flex", alignItems: "center", gap: "13px" }}
                >
                  <img src={colorpad} alt="color-pad" />
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      gap: "5px",
                    }}
                  >
                    <Typography
                      sx={{
                        fontFamily: "raleWay",
                        fontSize: "16px",
                        fontWeight: 600,
                      }}
                    >
                      Change Password
                    </Typography>
                    <Typography
                      sx={{
                        fontFamily: "raleWay",
                        fontSize: "10px",
                        fontWeight: 400,
                      }}
                    >
                      Edit your sign in password
                    </Typography>
                  </Box>
                </Box>

                <Box>
                  <img src={arrowLeft} alt="arw-left" />
                </Box>
              </Card>
            </Link>

            <Link to="">
              <Card
                sx={{
                  background:
                    currentTheme.palette.type === "light" ? "#fff" : "#2C2C2E",
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "1rem",
                  alignItems: "center",
                  marginTop: "0.3rem",
                }}
              >
                <Box
                  sx={{ display: "flex", alignItems: "center", gap: "13px" }}
                >
                  <img src={colorpad} alt="color-pad" />
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      gap: "5px",
                    }}
                  >
                    <Typography
                      sx={{
                        fontFamily: "raleWay",
                        fontSize: "16px",
                        fontWeight: 600,
                      }}
                    >
                      Change Transaction PIN
                    </Typography>
                    <Typography
                      sx={{
                        fontFamily: "raleWay",
                        fontSize: "10px",
                        fontWeight: 400,
                      }}
                    >
                      Edit your transaction PIN
                    </Typography>
                  </Box>
                </Box>

                <Box>
                  <img src={arrowLeft} alt="arw-left" />
                </Box>
              </Card>
            </Link>
          </Box>
          <Box sx={{ marginY: "3ch" }}>
            <Typography
              sx={{
                fontFamily: "raleWay",
                fontSize: "12px",
                fontWeight: 600,
                marginBottom: "1ch",
              }}
            >
              Preferences
            </Typography>

            <Card
              sx={{
                background:
                  currentTheme.palette.type === "light" ? "#fff" : "#2C2C2E",
                display: "flex",
                justifyContent: "space-between",
                padding: "1rem",
                alignItems: "center",
                marginBottom: "1rem",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: "13px" }}>
                <img src={colornoti} alt="color-noti" />
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    gap: "5px",
                  }}
                >
                  <Typography
                    sx={{
                      fontFamily: "raleWay",
                      fontSize: "16px",
                      fontWeight: 600,
                    }}
                  >
                    Push Notification{" "}
                  </Typography>
                  <Typography
                    sx={{
                      fontFamily: "raleWay",
                      fontSize: "10px",
                      fontWeight: 400,
                    }}
                  >
                    Enable/disable push notifications
                  </Typography>
                </Box>
              </Box>

              <Box>
                <SwitchIcon />
              </Box>
            </Card>

            <Card
              sx={{
                background:
                  currentTheme.palette.type === "light" ? "#fff" : "#2C2C2E",
                display: "flex",
                justifyContent: "space-between",
                padding: "1rem",
                alignItems: "center",
                marginTop: "0.3rem",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: "13px" }}>
                <img src={colormoon} alt="color-moon" />
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    gap: "5px",
                  }}
                >
                  <Typography
                    sx={{
                      fontFamily: "raleWay",
                      fontSize: "16px",
                      fontWeight: 600,
                    }}
                  >
                    Dark Mode
                  </Typography>
                  <Typography
                    sx={{
                      fontFamily: "raleWay",
                      fontSize: "10px",
                      fontWeight: 400,
                    }}
                  >
                    Reduce eye strain by enabling dark theme
                  </Typography>
                </Box>
              </Box>

              <Box>
                <ThemeProvider theme={theme}>
                  <Switch
                    checked={darkMode}
                    onChange={onToggleDarkMode}
                    sx={{
                      "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track":
                        {
                          backgroundColor: "#DC0019",
                          opacity: 1, // Customize track background color when checked
                        },
                      "& .MuiSwitch-switchBase.Mui-focusVisible .MuiSwitch-thumb":
                        {
                          color: "#52d869", // Customize thumb color when focused
                          border: "6px solid #fff",
                        },
                      "& .MuiSwitch-switchBase": {
                        padding: "1px",
                        color: "#fff",
                        "&.Mui-checked": {
                          transform: "translateX(15px)",
                          color: "#fff",
                        },
                      },
                      "& .MuiSwitch-thumb": {
                        width: 24,
                        height: 24,
                        backgroundColor: "#f0f0f0", // Customize thumb background color
                      },
                      "& .MuiSwitch-track": {
                        borderRadius: 26 / 2,
                        border: "1px solid #ccc",
                        backgroundColor: "#f8f8f8", // Customize track background color
                        opacity: 1,
                        transition:
                          "background-color 0.4s ease-in-out, border 0.4s ease-in-out",
                      },
                    }}
                  />
                </ThemeProvider>
                {/* <SwitchIcon/> */}
              </Box>
            </Card>
          </Box>

          <Box sx={{ marginY: "3ch" }}>
            <Typography
              sx={{
                fontFamily: "raleWay",
                fontSize: "12px",
                fontWeight: 600,
                marginBottom: "1.2ch",
              }}
            >
              Others
            </Typography>

            <Link to="/support">
              <Card
                sx={{
                  background:
                    currentTheme.palette.type === "light" ? "#fff" : "#2C2C2E",
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "1rem",
                  alignItems: "center",
                  marginBottom: "1rem",
                }}
              >
                <Box
                  sx={{ display: "flex", alignItems: "center", gap: "13px" }}
                >
                  <img src={colorsup} alt="color-sup" />
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      gap: "5px",
                    }}
                  >
                    <Typography
                      sx={{
                        fontFamily: "raleWay",
                        fontSize: "16px",
                        fontWeight: 600,
                      }}
                    >
                      Support
                    </Typography>
                    <Typography
                      sx={{
                        fontFamily: "raleWay",
                        fontSize: "10px",
                        fontWeight: 400,
                      }}
                    >
                      Get help & resolve complaints in real-time
                    </Typography>
                  </Box>
                </Box>

                <Box>
                  <img src={arrowLeft} alt="arw-left" />
                </Box>
              </Card>
            </Link>

            <Link to="/referral">
              <Card
                sx={{
                  background:
                    currentTheme.palette.type === "light" ? "#fff" : "#2C2C2E",
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "1rem",
                  alignItems: "center",
                  marginTop: "0.3rem",
                }}
              >
                <Box
                  sx={{ display: "flex", alignItems: "center", gap: "13px" }}
                >
                  <img src={colorearn} alt="color-earn" />
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      gap: "5px",
                    }}
                  >
                    <Typography
                      sx={{
                        fontFamily: "raleWay",
                        fontSize: "16px",
                        fontWeight: 600,
                      }}
                    >
                      Refer & Earn
                    </Typography>
                    <Typography
                      sx={{
                        fontFamily: "raleWay",
                        fontSize: "10px",
                        fontWeight: 400,
                      }}
                    >
                      Get bonuses by referring others to Check
                    </Typography>
                  </Box>
                </Box>

                <Box>
                  <img src={arrowLeft} alt="arw-left" />
                </Box>
              </Card>
            </Link>
            <Card
              sx={{
                background:
                  currentTheme.palette.type === "light" ? "#fff" : "#2C2C2E",
                display: "flex",
                justifyContent: "space-between",
                padding: "1rem",
                alignItems: "center",
                marginTop: "0.3rem",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: "13px" }}>
                <img src={colorlog} alt="color-log" />
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    gap: "5px",
                  }}
                >
                  <Button
                    onClick={handleOpen}
                    sx={{
                      fontFamily: "raleWay",
                      fontSize: "16px",
                      fontWeight: 600,
                      color: "#DC0019",
                    }}
                  >
                    Logout
                  </Button>

                  {/* Modal 1 */}
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
                      <Typography
                        sx={{
                          fontFamily: "raleWay",
                          fontWeight: 400,
                          fontSize: "16px",
                          lineHeight: "18.78px",
                          marginY: "1rem",
                          color:
                            currentTheme.palette.type === "light"
                              ? "#000"
                              : "#fff",
                        }}
                        id="modal-modal-title"
                      >
                        Are you sure you want to logout?
                      </Typography>

                      <Button
                        onClick={handleLogOut}
                        sx={{
                          background:
                            currentTheme.palette.type === "light"
                              ? "#dc0019"
                              : "#dc0019",
                          width: "95%",
                          padding: "10px",
                          borderRadius: "8px",
                          color: "#fff",
                          "&:hover": {
                            backgroundColor:
                              currentTheme.palette === "light"
                                ? "#dc0019"
                                : "#dc0019",
                          },
                          fontFamily: "raleWay",
                        }}
                      >
                        Yes,Logout
                      </Button>
                      <Button
                        onClick={handleClose}
                        sx={{
                          width: "95%",
                          padding: "10px",
                          borderRadius: "8px",
                          color:
                            currentTheme.palette.type === "light"
                              ? "#000"
                              : "#fff",
                          borderColor: "#dc0019",
                          fontFamily: "raleWay",
                          "&:hover": {
                            borderColor:
                              currentTheme.palette === "light"
                                ? "#dc0019"
                                : "#dc0019",
                          },
                        }}
                        variant="outlined"
                      >
                        No,Go back
                      </Button>
                    </Card>
                  </Modal>
                  {/* Modal 1 ends*/}

                  {/* Modal 2 */}
                  <Modal
                    className="scale-in-center"
                    open={open2}
                    onClose={handleClose2}
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
                      }}
                    >
                      <QrCode />

                      <Button
                        onClick={handleClose2}
                        sx={{
                          width: "95%",
                          padding: "10px",
                          borderRadius: "8px",
                          my: "0.5rem",
                          fontWeight: "900",
                          color:
                            currentTheme.palette.type === "light"
                              ? "#000"
                              : "#fff",
                          fontFamily: "raleWay",
                          borderColor:
                            currentTheme.palette.type === "light"
                              ? "#dc0019"
                              : "#eeee",
                          "&:hover": {
                            borderColor:
                              currentTheme.palette === "light"
                                ? "#dc0019"
                                : "#eeee",
                          },
                        }}
                        variant="outlined"
                      >
                        Go back
                      </Button>
                    </Card>
                  </Modal>

                  {/* Modal 2  end s */}
                </Box>
              </Box>
            </Card>
          </Box>
        </Container>
        <Navbar />
      </div>
    </AuthProvider>
  );
};

export default Profile;
