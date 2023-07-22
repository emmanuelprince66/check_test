import React from "react";
import bulbIcon from "../../images/bulbIcon.svg";
import ballIcon from "../../images/ballIcon.svg";
import leftArrow from "../../images/arrowLeft.svg";
import capIcon from "../../images/capIcon.svg";
import cakeIcon from "../../images/cakeIcon.svg";
import "./PayBills.css";
import BackArrow from "../../components/backArrow/BackArrow";
import { useNavigate } from "react-router-dom";
import { Card, Typography, Box } from "@mui/material";
import { useTheme } from "@mui/material";
import { Link } from "react-router-dom";

const payBillsItems = [
  {
    id: 1,
    icon: cakeIcon,
    title: "TV",
    direction: leftArrow,
    pathname: "/tvsub",
  },
  {
    id: 2,
    icon: bulbIcon,
    title: "Electricity",
    direction: leftArrow,
    pathname: "/elect",
  },
  {
    id: 3,
    icon: ballIcon,
    title: "Betting",
    direction: leftArrow,
    pathname: "/betting",
  },
  {
    id: 4,
    icon: capIcon,
    title: "Education",
    direction: leftArrow,
    pathname: "/education",
  },
];

const PayBills = () => {
  const navigate = useNavigate();
  const currentTheme = useTheme();

  return (
    <AuthProvider>
      <div className="gpt3__paybills">
        <div onClick={() => navigate(-1)}>
          <BackArrow />
        </div>

        <h6>Pay Bills</h6>

        {payBillsItems.map((item) => {
          return (
            <Link to={item.pathname}>
              <Card
                key={item.id}
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "16px",
                  gap: "16px",
                  boxShadow: "0px 4px 20px 10px rgba(0, 0, 0, 0.05)",
                  backgroundColor:
                    currentTheme.palette.type === "light" ? "#fff" : "#333333",
                  borderRadius: "8px",
                  height: "76px",
                  marginTop: "1rem",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                  }}
                >
                  <img src={item.icon} alt="paybills-icon" />
                  <Typography
                    sx={{
                      color:
                        currentTheme.palette.type === "light"
                          ? "#1E1E1E"
                          : "#fff",
                      fontFamily: "raleWay",
                      fontSize: "16px",
                      fontWeight: 600,
                    }}
                  >
                    {item.title}
                  </Typography>
                </Box>

                <Box>
                  <img src={item.direction} alt="paybills-arrow" />
                </Box>
              </Card>
            </Link>
          );
        })}

        {/* Navbar */}
      </div>
    </AuthProvider>
  );
};

export default PayBills;
