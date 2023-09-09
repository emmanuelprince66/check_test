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
import { setOrderInView } from "../util/slice/merchantSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const RemoveOrderModal = ({ id, onRemoveClick, delText, closeModal }) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  function handleViewOrder(id){
 dispatch(setOrderInView(id));
navigate("/restaurant/menu");

  }
  return (
    <Dialog
      open="true"
      sx={{
        "& .MuiPaper-root": {
         //  position: "absolute",
         //  bottom: "0",
          width: {xs:"100%",md:'70%',lg:'50%'},
          marginBottom: "0",
        },
        zIndex:'9999999'
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: ".6em",
          width: "100%",
          padding: "1.5em ",
        }}
      >
     
     
        <Typography fontSize={'1.1em'}  fontWeight={600}>Are you sure you want to remove this item from your order?</Typography>
   
   
   
        <Button
          onClick={onRemoveClick}
          sx={{
            backgroundColor: "var(--primary-red)",
            '& .:hover':{backgroundColor:'var(--primary-red)'},
            textTransform: "none",
            padding: ".5em 1em",
            fontSize:'1em',
            textAlign:'center',
            color:'white',
            fontWeight:'600'
          }}
        >
          {" "}
          Yes, Remove.{" "}
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
        No, Go back.{" "}
        </Button>
      </Box>
    </Dialog>
  );
};
export default RemoveOrderModal;
