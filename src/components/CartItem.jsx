import React from "react";
import { useDispatch } from "react-redux";
import alwaysp from "../images/alwaysp.svg";
import { removeFromCart } from "../util/slice/CartSlice";
import { useSelector } from "react-redux";
import xFlow from "../images/xFlow.svg";

import {
  Card,
  Box,
  Typography,
  Stack,
  Container,
  Button,
  Modal,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useTheme } from "@mui/material";
import { incrementCounter, decrementCounter } from "../util/slice/CartSlice";
import DeleteForeverRoundedIcon from "@mui/icons-material/DeleteForeverRounded";
import FormattedPrice from "./FormattedPrice";
const CartItem = ({ item }) => {
  const currentTheme = useTheme();
  const dispatch = useDispatch();

  const handleRemoveFromCart = (item) => {
    dispatch(removeFromCart(item));
  };
  const handleClose6 = () => {
    setDeleteModal(false);
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
    <Box sx={{ minWidth: "100%" }}>
      <Card
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "start",
          width: "100%",
          padding: "4px",
          background:
            currentTheme.palette.type === "light" ? "#eaeaea" : "#262626",
        }}
      >
        <Box sx={{ display: "flex", gap: "6px" }}>
          <Box sx={{ marginBottom: "-0.3rem" }}>
            <img
              className="cart_img"
              src={item.productImage === null ? alwaysp : item.image}
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

            {/* Counter */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                minWidth: "100%",
                marginTop: "0.5rem",
                gap: "2rem",
              }}
            >
              {/* Price */}
              <Typography
                sx={{
                  color: "#F79E1B",
                  fontFamily: "raleWay",
                  fontSize: "16px",
                  fontWeight: 600,
                }}
              >
                <FormattedPrice amount={item.price} />
              </Typography>
              {/* Price end */}

              {/* Counter */}
              <Box
                sx={{
                  display: "flex",
                  width: "100%",
                  justifyContent: "center",
                }}
              >
                <Button
                  size="small"
                  onClick={() => handleDecrement(item.id)}
                  sx={{
                    background: "#fff",
                    color:
                      currentTheme.palette.type === "light" ? "#000" : "#000",
                    fontWeight: "900",
                    padding: "0",
                    width: "2px",
                    paddingLeft: "1ch",
                    "&:hover": {
                      backgroundColor:
                        currentTheme.palette === "light" ? "#fff" : "#fff",
                    },
                  }}
                  i
                >
                  -
                  <Typography
                    sx={{
                      fontFamily: "raleWay",
                      color:
                        currentTheme.palette.type === "light" ? "#000" : "#000",
                      fomtWeight: "900",
                      mx: "2ch",
                    }}
                  >
                    {itemCounter}
                  </Typography>
                </Button>

                <Box
                  onClick={() => handleIncrement(item.id)}
                  sx={{
                    background: "#fff",
                    color:
                      currentTheme.palette.type === "light" ? "#000" : "#000",
                    width: "25px",
                    height: "25px",
                    borderRadius: "5px",
                    fontFamily: "raleWay",
                    display: "flex",
                    justifyContent: "center",
                    fontWeight: "900",
                    fontSize: "20px",
                    alignItems: "center",
                    marginLeft: "-10px",
                    zIndex: "1",
                  }}
                >
                  +
                </Box>
              </Box>

              {/* Counter ends */}
            </Box>
          </Box>
        </Box>

        <Box onClick={() => handleRemoveFromCart(item.id)}>
          <DeleteForeverRoundedIcon sx={{ color: "#dc0019" }} />
        </Box>
      </Card>
    </Box>
  );
};

export default CartItem;
