import React from "react";
import messColor from "../../images/messColor.svg";
import copy from "../../images/copy.svg";
import { Typography, Container, Card, Box } from "@mui/material";
import BackArrow from "../../components/backArrow/BackArrow";
import { useTheme } from "@mui/material";
import phoneColor from "../../images/phoneColor.svg";

const Suport = () => {
  const currentTheme = useTheme();

  return (
    <AuthProvider>
      <div className="gpt3__bills">
        <BackArrow destination="/profile" />

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
          Support
        </Typography>

        <Typography
          variant="h6"
          sx={{
            fontFamily: "raleWay",
            color:
              currentTheme.palette.type === "light" ? "#727272" : "#EEEEEE",
            fontWeight: 400,
            fontSize: "14px",
            lineHeight: "16.44px",
            marginBottom: "1rem",
          }}
        >
          Have your complaints resolved in real-time.
        </Typography>

        <Container
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "start",
            alignItems: "center",
            gap: "1rem",
            width: "100%",
          }}
        >
          <Card
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "start",
              alignItems: "start",
              gap: "1rem",
              padding: "1rem",
              width: { xs: "18rem", sm: "100%", lg: "100%" },
            }}
          >
            <Typography
              sx={{
                fontFamily: "raleWay",
                color:
                  currentTheme.palette.type === "light" ? "#727272" : "#EEEEEE",
                fontWeight: 400,
                fontSize: "16px",
                lineHeight: "16.44px",
              }}
            >
              Call Us
            </Typography>

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: "10px",
                }}
              >
                <img src={phoneColor} alt="call-icon" />
                <Typography
                  sx={{
                    fontFamily: "raleWay",
                    color:
                      currentTheme.palette.type === "light"
                        ? "#727272"
                        : "#EEEEEE",
                    fontWeight: 600,
                    fontSize: "16px",
                    lineHeight: "16.44px",
                  }}
                >
                  {" "}
                  08149734622
                </Typography>
              </Box>

              <Box>
                <img src={copy} alt="copy-icon" />
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: "10px",
                }}
              >
                <img src={phoneColor} alt="call-icon" />
                <Typography
                  sx={{
                    fontFamily: "raleWay",
                    color:
                      currentTheme.palette.type === "light"
                        ? "#727272"
                        : "#EEEEEE",
                    fontWeight: 600,
                    fontSize: "16px",
                    lineHeight: "16.44px",
                  }}
                >
                  {" "}
                  09037716931
                </Typography>
              </Box>

              <Box>
                <img src={copy} alt="copy-icon" />
              </Box>
            </Box>
          </Card>

          <Card
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "start",
              alignItems: "start",
              gap: "1rem",
              padding: "1rem",
              width: { xs: "18rem", sm: "100%", lg: "100%" },
            }}
          >
            <Typography
              sx={{
                fontFamily: "raleWay",
                color:
                  currentTheme.palette.type === "light" ? "#727272" : "#EEEEEE",
                fontWeight: 400,
                fontSize: "16px",
                lineHeight: "16.44px",
              }}
            >
              Email us
            </Typography>

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: "10px",
                }}
              >
                <img src={messColor} alt="call-icon" />
                <Typography
                  sx={{
                    fontFamily: "raleWay",
                    color:
                      currentTheme.palette.type === "light"
                        ? "#727272"
                        : "#EEEEEE",
                    fontWeight: 600,
                    fontSize: "16px",
                    lineHeight: "16.44px",
                  }}
                >
                  {" "}
                  support@endpoint.ng
                </Typography>
              </Box>

              <Box>
                <img src={copy} alt="copy-icon" />
              </Box>
            </Box>
          </Card>
        </Container>
      </div>
    </AuthProvider>
  );
};

export default Suport;
