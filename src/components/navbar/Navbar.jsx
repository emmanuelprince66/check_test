import React, { useEffect, useState } from "react";
import { Link, useMatch } from "react-router-dom";
import hutLogo from "../../images/hutNoColor.svg";
import sideArrow from "../../images/sideArrow.svg";
import scan from "../../images/scanIcon.svg";
import cart from "../../images/cartIcon.svg";
import user from "../../images/userIcon.svg";
import "./Navbar.css";
import { Card, Typography } from "@mui/material";
import { useTheme } from "@mui/material";
import BookmarkAddRoundedIcon from "@mui/icons-material/BookmarkAddRounded";
import styled from "@emotion/styled";
import { useSelector } from "react-redux";
import { Box } from "@mui/material";

const Navbar = () => {
  const currentTheme = useTheme();
  const cartItem = useSelector((state) => state.cart);
  const [numOfItem, setNumOfItem] = useState("");

  const MyTypography = styled(Typography)(({ theme }) => ({
    color: currentTheme.palette.type === "light" ? "#373737" : "#fff",
    fontSize: "10px",
    fontFamily: "raleWay",
    fontWeight: 600,
  }));

  const homeMatch = useMatch("/home");
  const transactionsMatch = useMatch("/transactions");
  const scanMatch = useMatch("/scan");
  const cartMatch = useMatch("/cart");
  const profileMatch = useMatch("/profile");
  const ordersMatch = useMatch("/orders");

  useEffect(() => {
    const val = cartItem.length;
    setNumOfItem(val);
  }, [cartItem]);

  return (
    <div className="gpt3__nav">
      <Card
        sx={{
          boxShadow: "0px 2px 40px rgba(0, 0, 0, 0.1)",

          width: { md: "33%", sm: "100%", xs: "100%" },
          padding: "10px",
          position: "fixed",
          left: { xs: 0, sm: 0, md: "33.5%" },
          bottom: 0,
          fontSize: "10px",
          paddingTop: "1rem",
          paddingBottom: "1rem",
        }}
      >
        <ul
          style={{
            display: "flex",
            justifyContent: "space-around",
            listStyleType: "none",
          }}
        >
          {/* <li>
            <Link
              to="/home"
              className={homeMatch ? "active-link" : ""}
              style={{ color: "black", textDecoration: "none" }}
            >
              <div className="gpt3__navbar" id="firstnav">
                <img src={hutLogo} alt="hut-logo" />
                <MyTypography>Dashbaord</MyTypography>
              </div>
            </Link>
          </li> */}
          <li>
            <Link
              to="/transactions"
              className={transactionsMatch ? "active-link" : ""}
              style={{ color: "black", textDecoration: "none" }}
            >
              <div className="gpt3__navbar">
                <img src={sideArrow} alt="side-logo" />
                <MyTypography>Transaction</MyTypography>
              </div>
            </Link>
          </li>
          <li>
            <Link
              to="/scan"
              className={scanMatch ? "active-link" : ""}
              style={{ color: "black", textDecoration: "none" }}
            >
              <div className="gpt3__navbar">
                <img src={scan} alt="scan-logo" />
                <MyTypography>Scan</MyTypography>
              </div>
            </Link>
          </li>
          <li>
            <Box
              sx={{
                position: "absolute",
                // bottom: "2.5rem",
                left: "54%",
                color: "#fff",
                top: "0.6rem",
                fontWeight: "900",
                borderRadius: "50%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding: "8px",
                fontSize: "9px",
                background: numOfItem === 0 ? "" : "#dc0019",
                width: "15px",
                height: "15px",
                zIndex: "1",
              }}
            >
              {numOfItem === 0 ? "" : numOfItem}
            </Box>
            <Link
              to="/cart"
              className={cartMatch ? "active-link" : ""}
              style={{ color: "black", textDecoration: "none" }}
            >
              <div className="gpt3__navbar">
                <img src={cart} alt="cart-logo" />
                <MyTypography>Cart</MyTypography>
              </div>
            </Link>
          </li>
          <li>
            <Link
              to="/orders"
              className={ordersMatch ? "active-link" : ""}
              style={{ color: "black", textDecoration: "none" }}
            >
              <div className="gpt3__navbar">
                {/* <img src={cart} alt="cart-logo" /> */}
                <BookmarkAddRoundedIcon
                  sx={{
                    color: "#7F7F7F",
                  }}
                />
                <MyTypography>Orders</MyTypography>
              </div>
            </Link>
          </li>
          <li>
            <Link
              to="/profile"
              className={profileMatch ? "active-link" : ""}
              style={{ color: "black", textDecoration: "none" }}
            >
              <div className="gpt3__navbar">
                <img src={user} alt="user-logo" />
                <MyTypography>Profile</MyTypography>
              </div>
            </Link>
          </li>
        </ul>
      </Card>
    </div>
  );
};

export default Navbar;
