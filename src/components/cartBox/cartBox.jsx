import { useState } from "react";
import { Avatar, Box, Button, Grid, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {addItemsToCart} from '../../util/slice/merchantSlice'
export const CartBox = ({id, img, unitPrice,name }) => {
  const [count, setCount] = useState(0);
  const {orderInView,orders} = useSelector(state=>state.merchantReducer)
  const dispatch=useDispatch()
  function changeCount(type) {
    if(type === 'add'){
      setCount(count + 1)
    }
    else{

  if(count > 0){
    setCount(count - 1)
  }
  else{
    setCount(0)
  }
    }
    }
  function addToCart(){
let order ={
  name:name,
  count:count,
  price:(Number(unitPrice) * Number(count) ),
  status:'added'
}
console.log(orders[id])

  console.log(orderInView,orders)
    dispatch(addItemsToCart({order,id}))
    console.log(orders)
  }
  return (
    <Grid sx={{ width: "48%" }} item>
      <Box position='relative' >
        <Avatar
          src={img}
          sx={{ width: "100%",borderRadius:'4px 4px 0 0', height: "90px" }}
          variant="rounded"
          alt="Menu Item Image"
        
        />

<span style={{backgroundColor:' rgba(0, 0, 0, 0.5)',padding:'0 .3em' ,position:'absolute', bottom:'0',left:'0',right:'0',color:'white'}} >{ name}</span>

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
          <span style={{ fontWeight: "700" }}> N{unitPrice} </span>
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
            <Typography> {count} </Typography>
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
