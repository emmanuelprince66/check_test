import React from "react";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import plusLogo from "../../images/plusLogo.svg";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Card, Typography, Box } from "@mui/material";
import { useTheme } from "@mui/material";
import FormattedPrice from "../FormattedPrice";
import useUser from "../../hooks/useUser";
import { Link } from "react-router-dom";

const Acctbox = () => {
  const navigate = useNavigate();
  const currentTheme = useTheme();
  const user = useUser();

  const [isTextVisible, setIsTextVisible] = useState(false);

  const handleShowAmount = () => {
    !isTextVisible
      ? setIsTextVisible(!isTextVisible)
      : setIsTextVisible(!isTextVisible);
  };

  return (
    <>
      <Card
        sx={{
          height: "92px",
          minWidth: "100%",
          borderRadius: "16px",
          padding: "0.5rem",
          marginY: "1rem",
          backgroundColor:
            currentTheme.palette.type === "light" ? "#FFEDED" : "#2C2C2E",
        }}
      >
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "start",
          }}
        >
          <Box>
            {!isTextVisible ? (
              <Typography
                sx={{
                  fontFamily: "raleWay",
                  fontWeight: "600",
                  fontSize: "18px",
                }}
              >
                ******************
              </Typography>
            ) : (
              <Typography
                sx={{
                  fontFamily: "raleWay",
                  fontWeight: "600",
                  fontSize: "18px",
                }}
              >
                {user.data ? (
                  <FormattedPrice amount={user.data.balance} />
                ) : (
                  <CircularProgress />
                )}
              </Typography>
            )}
          </Box>

          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              alignItems: "end",
              width: "100%",
            }}
          >
            <Box
              onClick={() => handleShowAmount()}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                width: "103px",
                height: "28px",
                borderRadius: "8px",
                backgroundColor: "rgba(220, 0, 25, 0.1)",
                padding: "4px 8px 4px 8px",
              }}
            >
              {isTextVisible ? (
                <Visibility sx={{ color: "#C57600", fontSize: "15px" }} />
              ) : (
                <VisibilityOff sx={{ color: "#C57600", fontSize: "15px" }} />
              )}
              <Typography
                sx={{
                  fontWeight: "400",
                  fontSize: "10px",
                  color:
                    currentTheme.palette.type === "light" ? "#1e1e1e" : "#ffff",
                  letterSpacing: "-0.24px",
                  fontFamily: "raleWay",
                  paddingTop: "1px",
                }}
              >
                Show Balance
              </Typography>
            </Box>
            <Box
              sx={{
                height: "28px",
                background: "linear-gradient(180deg, #31DC61 0%, #19953C 100%)",
                borderRadius: "8px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "0.5rem",
                width: "103px",
                marginTop: "1rem",
              }}
            >
              <img src={plusLogo} alt="plus-logo" />
              <Link to="/fwallet">
                <Typography
                  sx={{
                    color: "#fff",
                    fontSize: "12px",
                    fontFamily: "raleWay",
                  }}
                >
                  Fund Wallet
                </Typography>
              </Link>
            </Box>
          </Box>
        </Box>
      </Card>
    </>
  );
};

export default Acctbox;
