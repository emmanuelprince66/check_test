import { useState,useEffect } from "react";
import { Avatar, Box, Button, Grid, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {addItemsToCart,handleCountChange} from '../../util/slice/merchantSlice'
export const CartBox = ({itemInfo,id,category }) => {
  const {orderInView,orders} = useSelector(state=>state.merchantReducer)
  let orderObject = orders[orderInView - 1]?.cart?.find((item)=>item.name === name)
  // const [count, setCount] = useState(0);
  const dispatch=useDispatch()
  // const [newOrder, setNewOrder] = useState({...itemInfo, subTotal:(Number(itemInfo.unitPrice) * Number(itemInfo.count)),
  // })
  function changeCount(type) {
    let newOrder ={
      ...itemInfo,
    }    
    dispatch(handleCountChange({newOrder,type}))
  }
  function addToCart(){
let order ={
  ...itemInfo,
  subTotal:(parseFloat(itemInfo.price) * itemInfo.count ),
  status:'added'
}
console.log(orders)

  console.log(orderInView,orders)
    dispatch(addItemsToCart({order,id}))
    console.log(orders)
  }
  useEffect(()=>{
    // console.log(orders)
  }),[orders]
  return (
    <Grid sx={{ width: "48%" ,height:'200px' ,display:category === itemInfo.category.name ?'block':'none' }}  item>
      <Box position='relative' sx={{height:'140px', width:'100%'}} >
        <Avatar
          src={itemInfo.image}
          sx={{ width:'100%',maxHeight:'100%',position:'absolute', borderRadius:'4px 4px 0 0',height:'100%' }}
          variant="rounded"
          alt="Menu Item Image"
        
        />

<span style={{backgroundColor:' rgba(0, 0, 0, 0.5)',padding:'0 .3em' ,position:'absolute', bottom:'0',left:'0', height:'30px',right:'0',color:'white'}} >{itemInfo.name}</span>

      </Box>

      <Box
        padding=".5em"
        sx={{
          display:'flex',
          flexDirection:'column',
          gap:'.3em',
          border: "1px solid #E2E2E2",
          backgroundColor: "#FAFAFA",
          borderRadius: "0 0 .3em .3em ",
        }}
      >
        <div  style={{ fontSize:'12px' }}>
          <span style={{ fontWeight: "700" }}> N {Number(itemInfo.price)} </span>
          <span style={{color:'#727272'}} >/PORTION</span>
        </div>
        <Box
          display="flex"
          justifyContent="space-between"
          gap=".2em"
          alignItems="center"
        >
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
              style={{ fontSize: "2em", cursor: "pointer" }}
            >
              {" "}
              -{" "}
            </span>
            <Typography> {itemInfo.count} </Typography>
            <span
              onClick={() => changeCount("add")}
              style={{ fontSize: "2em", cursor: "pointer" }}
            >
              {" "}
              +{" "}
            </span>
          </Box>




{
  orders[id]?.status === 'added'?
  <Box display='flex' >
  <Button>Remove</Button>
  <Button>Edit</Button>
</Box>
:
<Button
          onClick={addToCart}
            sx={{
              backgroundColor: "#EB001B",
              height: "30px",
              color: "white",
              textTransform:'none',
              "&:hover": { backgroundColor: "#EB001B" },
              width: "40%",
              minWidth: "auto",
            }}
          >
            {" "}
            Add{" "}
          </Button>

}



        </Box>
      </Box>
    </Grid>
  );
};
export default CartBox;
