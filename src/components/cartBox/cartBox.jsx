import { useState, useEffect } from "react";
import { Avatar, Box, Skeleton, Button, Grid, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  addItemsToCart,
  handleCountChange,
  editStatusUpdate,
  removeItemFromCart,
} from "../../util/slice/merchantSlice";
import RemoveOrderModal from "../removeOrderModal";
export const CartBox = ({ itemInfo,preview, id,index, category }) => {
  const { orderInView, orderCart, orders } = useSelector(
    (state) => state.merchantReducer
  );
  const [showRemoveModal, setShowRemoveModal] = useState(false);
  const dispatch = useDispatch();
  // const [newOrder, setNewOrder] = useState({...itemInfo, subTotal:(Number(itemInfo.unitPrice) * Number(itemInfo.count)),
  // })
  
  function changeCount(type) {
    const id  = itemInfo.id
    dispatch(handleCountChange({ id, type }));
  }
  function editStatus(){
   dispatch(editStatusUpdate(itemInfo.id)) }
  function addToCart() {
    let order = {
      menuId : itemInfo.id,
      quantity:itemInfo.count,
      name:itemInfo.name,
      price:itemInfo.price,
      subTotal: parseFloat(itemInfo.price) * itemInfo.count,
    };
    dispatch(addItemsToCart({ order, id }));
  }
  function handleRemoveItemFromCart(){
   
    let payload = {
      id:itemInfo.id,
      subTotal:itemInfo.subTotal,
    }

dispatch(removeItemFromCart(payload))
setTimeout(()=>setShowRemoveModal(false),300)
  }
  return (
    <Grid
      sx={{
        width: "48%",
        height: "200px",
        display: category === itemInfo.category.name ? "block" : preview ? 'block': "none",
      }}
      item
    >
      <Box position="relative" sx={{ height: "140px", width: "100%" }}>
        {!itemInfo.image ? (
          <Skeleton variant="circular">
            <Avatar />
          </Skeleton>
        ) : (
          <Avatar
            src={itemInfo.image}
            sx={{
              width: "100%",
              maxHeight: "100%",
              position: "absolute",
              borderRadius: "4px 4px 0 0",
              height: "100%",
            }}
            variant="rounded"
            alt="Menu Item Image"
          />
        )}
        <span
          style={{
            backgroundColor: " rgba(0, 0, 0, 0.5)",
            padding: "0 .3em",
            position: "absolute",
            bottom: "0",
            left: "0",
            height: "30px",
            right: "0",
            color: "white",
          }}
        >
          {itemInfo.name}
        </span>
      </Box>

      <Box
        padding=".5em"
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: ".3em",
          border: "1px solid #E2E2E2",
          backgroundColor: "#FAFAFA",
          borderRadius: "0 0 .3em .3em ",
        }}
      >
        <div style={{ fontSize: "12px",whiteSpace:'nowrap' }}>
          <span style={{ fontWeight: "700" }}>
            {" "}
            N { itemInfo.subTotal}{" "}
          </span>
          <span style={{ color: "#727272",fontSize:'10px' }}> /{itemInfo.count} PORTION</span>
        </div>
        <Box
          display="flex"
          justifyContent="space-between"
          gap=".2em"
          width={'100%'}
          alignItems="center"
        >

          {itemInfo?.added  && orders[id - 1]?.menu[index].id === itemInfo.id || preview ? (
            <Box display="flex" sx={{width:'100%'}} gap={'.3em'} justifyContent={'space-between'} >
              <Button sx={{backgroundColor:"#E8E5E5",width:'60%', minWidth:'30px', padding:'4px 8px', textTransform:'none',color:'black'}} onClick={()=>setShowRemoveModal(true)} >Remove</Button>
              <Button  sx={{backgroundColor:"grey", minWidth:'30px',  '&:hover': {
          backgroundColor: 'rgb(11 13 14 / 43%)',
        }, '&.:focus':{backgroundColor:"grey"}, width:'40%',  padding:'4px 8px', textTransform:'none',color:'white' }} onClick={editStatus} >Edit</Button>
            </Box>
          ) : !itemInfo.added  ?(
            <Box sx={{width:'100%' ,display:'flex'}} >
            <Box
            display="flex"
            justifyContent="space-between"
            width="60%"
            gap=".4em"
            backgroundColor="#E8E5E5"
            borderRadius=".5em"
            padding="0em .5em"
            height="30px"
            alignItems="center"
          >
            <span
              onClick={() => changeCount("remove")}
              style={{ fontSize: "2em", display:'flex', alignItems:'center', height:'100%', cursor: "pointer" }}
            >
              {" "}
              -{" "}
            </span>
            <Typography> {itemInfo.count} </Typography>
            <span
              onClick={() => changeCount("add")}
              style={{ fontSize: "2em",height:'100%',display:'flex', alignItems:'center', cursor: "pointer" }}
            >
              {" "}
              +{" "}
            </span>
          </Box>
          <Button
              onClick={addToCart}
              sx={{
                backgroundColor: "#EB001B",
                height: "30px",
                color: "white",
                textTransform: "none",
                "&:hover": { backgroundColor: "#EB001B" },
                width: "40%",
                minWidth: "auto",
              }}
            >
              {" "}
              Add{" "}
            </Button>

            </Box>
          )
          : null
          }
        </Box>
      </Box>
      {showRemoveModal ? <RemoveOrderModal onRemoveClick={handleRemoveItemFromCart} closeModal={()=>setShowRemoveModal(false)} /> : null }
    </Grid>
  );
};
export default CartBox;
