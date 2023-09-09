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

const RestaurantOrderModal = ({ onDelButtonClick,id, ordersIn, delText, closeModal }) => {
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
          gap: ".6em",
          width: "100%",
          padding: "1.5em ",
        }}
      >
     
     
        <Typography fontSize={'1.3em'} fontWeight={600}>More Options</Typography>
   
   
   
        {
          ordersIn ?
  <>
  <Button
          sx={{
            display: "flex",
            padding: "10px 0 10px 0",
            textTransform: "none",
            width: "100%",
            color:'black',
            justifyContent:'space-between',
            fontWeight:'bold',
            borderBottom:'1px solid #CDCDCD',
            fontSize:'1em'
          }}
          onClick={()=>navigate(`/order/${id}`)}
        >
          {" "}
         <span>View Order</span>{" "}
         <svg style={{transform:'rotate(180deg)'}} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M15 19.92L8.47997 13.4C7.70997 12.63 7.70997 11.37 8.47997 10.6L15 4.08002" stroke="#1E1E1E" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

        </Button>
        <Button
          sx={{
            display: "flex",
            padding: "10px 0 10px 0",
            textTransform: "none",
            width: "100%",
            color:'black',
            borderBottom:'1px solid #CDCDCD',
            justifyContent:'space-between',
            fontWeight:'bold',
            fontSize:'1em'
          }}
          onClick={()=>handleViewOrder(id)}
        >
          {" "}
         <span> Edit Items in this order</span>  
         <svg style={{transform:'rotate(180deg)'}} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M15 19.92L8.47997 13.4C7.70997 12.63 7.70997 11.37 8.47997 10.6L15 4.08002" stroke="#1E1E1E" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
</svg>{" "}
        </Button>
</>
:null
}

   
   
        <Button
          onClick={onDelButtonClick}
          sx={{
            color: "var(--primary-red)",
            justifyContent: "flex-start",
            textTransform: "none",
            paddingLeft: "0",
            fontSize:'1em',
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
