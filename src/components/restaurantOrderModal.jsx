import React from "react";
import {
  Box,
  Button,
  Container,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogActions,
  Typography,
} from "@mui/material";

const RestaurantOrderModal = ({ onDelButtonClick, delText, closeModal }) => {
  return (
    <Dialog
      open="true"
      sx={{
        "& .MuiPaper-root": {
          position: "absolute",
          bottom: "0",
          width: "100%",
          marginBottom: "0",
        },
        zIndex:'9999999'
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "1em",
          width: "100%",
          padding: "1em",
        }}
      >
        <Typography fontWeight={600}>More Options</Typography>
        <Button
          onClick={onDelButtonClick}
          sx={{
            color: "var(--primary-red)",
            justifyContent: "flex-start",
            textTransform: "none",
            paddingLeft: "0",
          }}
        >
          {" "}
          {delText}{" "}
        </Button>

        <Button
          sx={{
            display: "flex",
            padding: ".5em .2em .5em .4em",
            textTransform: "none",
            alignItems: "center",
            border: "1px solid var(--primary-red)",
            color: "var(--primary-red)",
            width: "100%",
          }}
          onClick={closeModal}
        >
          {" "}
          Close{" "}
        </Button>
      </Box>
    </Dialog>
  );
};
export default RestaurantOrderModal;
