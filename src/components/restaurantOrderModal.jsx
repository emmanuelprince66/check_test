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
          padding: "1.5em 1em 1em 1em ",
        }}
      >
        <Typography fontSize={'1.3em'} fontWeight={600}>More Options</Typography>
        <Button
          onClick={onDelButtonClick}
          sx={{
            color: "var(--primary-red)",
            justifyContent: "flex-start",
            textTransform: "none",
            paddingLeft: "0",
            fontSize:'1.2em',
            fontWeight:'600'
          }}
        >
          {" "}
          {delText}{" "}
        </Button>

        <Button
          sx={{
            display: "flex",
            padding: "10px .2em 10px .4em",
            textTransform: "none",
            alignItems: "center",
            border: "1px solid var(--primary-red)",
            color: "var(--primary-red)",
            width: "100%",
            fontWeight:'bold',
            fontSize:'1em'
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
