import React from "react";
import InfoRoundedIcon from "@mui/icons-material/InfoRounded";
import { Divider, useTheme } from "@mui/material";
import { Box, Card, Button, Typography } from "@mui/material";
import useUser from "../hooks/useUser";
import FormattedPrice from "./FormattedPrice";
import { Modal } from "@mui/material";
import { useNavigate } from "react-router-dom";

const InsufficientFund = ({
  totalPrice,
  showInsufficientBalance,
  setShowInsufficientBalance,
}) => {
  const currentTheme = useTheme();
  const navigate = useNavigate();
  const user = useUser();
  const remInsufficientBalance = () => setShowInsufficientBalance(false);

  return (
    <Modal
      classetsName="scale-in-center"
      open={showInsufficientBalance}
      onClose={remInsufficientBalance}
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
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "2rem",
            marginY: "1rem",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: "5px" }}>
            <InfoRoundedIcon sx={{ color: "#dc0019" }} />

            <Typography
              sx={{
                fontFamily: "raleWay",
                fontWeight: 1000,
                fontSize: "16px",
                textAlign: "center",
                color:
                  currentTheme.palette.type === "light" ? "#dc0019" : "#dc0019",
              }}
            >
              Insufficent Balance
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "start",
                borderRight: "1px solid #E8E5E5",
                paddingRight: "1.5rem",
              }}
            >
              <Typography
                sx={{
                  fontFamily: "raleWay",
                  fontWeight: 600,
                  fontSize: "14px",
                  textAlign: "center",
                  color:
                    currentTheme.palette.type === "light"
                      ? "#727272"
                      : "#727272",
                }}
                id="modal-modal-title"
              >
                Wallet Balance
              </Typography>

              <Typography
                sx={{
                  fontFamily: "raleWay",
                  fontWeight: 1000,
                  fontSize: "18px",
                  textAlign: "center",
                  color:
                    currentTheme.palette.type === "light"
                      ? "#C57600"
                      : "#C57600",
                }}
                id="modal-modal-title"
              >
                {user.data ? <FormattedPrice amount={user.data.balance} /> : ""}
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "end",
                paddingLeft: "1rem",
              }}
            >
              <Typography
                sx={{
                  fontFamily: "raleWay",
                  fontWeight: 600,
                  fontSize: "14px",
                  textAlign: "center",
                  color:
                    currentTheme.palette.type === "light"
                      ? "#727272"
                      : "#727272",
                }}
                id="modal-modal-title"
              >
                Amount to Pay
              </Typography>

              <Typography
                sx={{
                  fontFamily: "raleWay",
                  fontWeight: 1000,
                  fontSize: "18px",
                  textAlign: "center",
                  color:
                    currentTheme.palette.type === "light"
                      ? "#C57600"
                      : "#C57600",
                }}
                id="modal-modal-title"
              >
                {user.data ? <FormattedPrice amount={totalPrice} /> : ""}
              </Typography>
            </Box>
          </Box>
        </Box>

        <Button
          onClick={() => navigate("/fwallet")}
          sx={{
            background:
              currentTheme.palette.type === "light" ? "#dc0019" : "#dc0019",
            width: "95%",
            padding: "10px",
            borderRadius: "8px",
            color: "#fff",
            "&:hover": {
              backgroundColor:
                currentTheme.palette === "light" ? "#dc0019" : "#dc0019",
            },
            fontFamily: "raleWay",
            fontWeight: "700",
          }}
        >
          Fund my Wallet
        </Button>
        <Button
          onClick={() => setShowInsufficientBalance()}
          sx={{
            width: "95%",
            padding: "10px",
            borderRadius: "8px",
            color: currentTheme.palette.type === "light" ? "#000" : "#fff",
            borderColor: "#dc0019",
            fontFamily: "raleWay",
            fontWeight: "700",

            "&:hover": {
              borderColor:
                currentTheme.palette === "light" ? "#dc0019" : "#dc0019",
            },
          }}
          variant="outlined"
        >
          Cancel
        </Button>
      </Card>
    </Modal>
  );
};

export default InsufficientFund;
