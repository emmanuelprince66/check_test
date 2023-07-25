import React from "react";
import { useDispatch } from "react-redux";
import alwaysp from "../images/alwaysp.svg";
import { removeFromCart } from "../util/slice/CartSlice";
import { useSelector } from "react-redux";
import xFlow from "../images/practise/xFlow.svg";

import { Card, Box, Typography, Stack, Container, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { useTheme } from "@mui/material";
import { incrementCounter, decrementCounter } from "../util/slice/CartSlice";
const CartItem = ({ item }) => {
  const currentTheme = useTheme();
  const dispatch = useDispatch();
  const handleRemoveFromCart = (item) => {
    dispatch(removeFromCart(item));
  };
  // Access the counter (quantity) of the item with the cardId from the Redux store
  const itemCounter = useSelector((state) => {
    const foundItem = state.cart.find((cartItem) => cartItem.id === item.id);
    return foundItem ? foundItem.counter : 0;
  });
  const handleIncrement = (cardId) => {
    dispatch(incrementCounter(cardId));
  };

  const handleDecrement = (cardId) => {
    dispatch(decrementCounter(cardId));
  };

  return (
    <>
      <Card
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "start",
          width: "100%",
          padding: "4px",
          background:
            currentTheme.palette.type === "light" ? "#fff" : "#262626",
        }}
      >
        <Box sx={{ display: "flex", gap: "6px" }}>
          <Box>
            <img
              className="img"
              src={item.productImage === null ? alwaysp : item.productImage}
              alt="ap"
            />
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "start",
              alignItems: "start",
              gap: "3px",
            }}
          >
            <Box
              sx={{
                display: "flex",
                gap: "3px",
                alignItems: "baseline",
              }}
            >
              <Typography
                sx={{
                  fontFamily: "raleWay",
                  fontSize: "12px",
                  fontWeight: 400,
                }}
              >
                {item.description}
              </Typography>
              <Typography
                sx={{
                  fontFamily: "raleWay",
                  fontSize: " 10px",
                  fontWeight: 400,
                }}
              >
                (size {item.weight}g)
              </Typography>
            </Box>

            {/* Price */}
            <Typography
              sx={{
                color: "#F79E1B",
                fontFamily: "raleWay",
                fontSize: "16px",
                fontWeight: 600,
              }}
            >
              &#8358;{item.price}
            </Typography>
            {/* Price end */}

            {/* Counter */}
            <Box
              sx={{
                display: "flex",
                background:
                  currentTheme.palette.type === "light" ? "#fAFAFA" : "#000",
                borderRadius: "39px",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Button
                size="small"
                onClick={() => handleDecrement(item.id)}
                sx={{
                  color:
                    currentTheme.palette.type === "light" ? "#000" : "#fff",
                  fontWeight: "900",
                  padding: "0",
                }}
              >
                -
              </Button>
              <Typography
                sx={{
                  fontFamily: "raleWay",
                  color:
                    currentTheme.palette.type === "light" ? "#000" : "#fff",
                  fomtWeight: "900",
                  mx: "1ch",
                }}
              >
                {itemCounter}
              </Typography>
              <Button
                onClick={() => handleIncrement(item.id)}
                size="small"
                sx={{
                  borderRadius: "36px",
                  color:
                    currentTheme.palette.type === "light" ? "#000" : "#fff",
                  padding: "0",
                }}
              >
                +
              </Button>
            </Box>
            {/* Counter ends */}
          </Box>
        </Box>

        <Box onClick={() => handleRemoveFromCart(item.id)}>
          <img src={xFlow} alt="xflow" />
        </Box>
      </Card>
    </>
  );
};

export default CartItem;
