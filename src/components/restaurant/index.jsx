import React,{useState} from "react";
import { useSelector } from "react-redux";
import arrowleft from "../../assets/arrow-left.svg";
import { useNavigate } from "react-router-dom";
import "./restaurant.css";
import add from "../../assets/add-square.svg";
import { Box, Button,Container } from "@mui/material";
import useMenu from "../../hooks/useMenu";
import { useDispatch } from "react-redux";
import { addOrders,setOrderInView } from "../../util/slice/merchantSlice";
import options from '../../assets/MoreOptions.svg'
import BackArrow from "../backArrow/BackArrow";
const Restaurant = () => {
  const Orders = useSelector((state) => state.merchantReducer.orders);
  // console.log(merchantDetails)
  console.log(Orders)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  function handleNewOrders(){
    const maxId = Orders.length + 1
    console.log(maxId );
let newOrder = {
  id:(maxId),
amount:'',
}
dispatch(addOrders(newOrder))
  }
  
function handleClickMenu(id){
  dispatch(setOrderInView(id))
navigate('/restaurant/menu')
console.log(id)
}
  return (
  <Container sx={{
    display:'flex',
    flexDirection:'column',
    overflowY:'auto',
    gap:'1em',
    flex:'1',
    marginBottom:'10em',

  }} >
     
      <Box sx={{  justifyContent:'space-between',display:'flex',alignItems:'center'}} >

<BackArrow/>
<Button sx={{border:'1px solid #CDCDCD',padding:'.7em',minWidth:'44px'}} >
  <img src={options} />
</Button>
      </Box>

      <h1 className="h1-text">My Cart</h1>

<div style={{ overflowY:'auto', marginBottom:'100px',flex:'1', display:'flex',flexDirection:'column' }} >

<Box sx={{display:'flex',flexDirection:'column',gap:'1em'}} >
{    
  
  Orders.map((order,i)=>{
    return(
      <Box
      key={i}
        sx={{ backgroundColor: "var(--cart-bg-color)" }}
        padding={"1em"}
        borderRadius={".5em"}
      >

<Box display='flex' justifyContent='space-between' alignItems='center' >

        <h2 style={{fontSize:'16px'}} > Order {order.id}</h2>
        <Button sx={{padding:'0.7em',minWidth:'44px'}} >
  <img src={options} />
</Button>
  </Box>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "2px 4px",
          }}
        >
          <div style={{ color: "#008000", fontWeight: "600" }}>N 0.00</div>
          <div>
            <Button
              sx={{
                color: "var(--primary-red)",
                display: "flex",
                padding: ".2em .2em .2em .4em",
                textTransform: "none",
                alignItems: "center",
                border: "1px solid var(--primary-red)",
              }}
              onClick={()=>handleClickMenu(order.id)}
            >
              <span style={{fontWeight:'600'}} >Add Items</span>
              <svg
                className="arrowright"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M15 19.92L8.47997 13.4C7.70997 12.63 7.70997 11.37 8.47997 10.6L15 4.08002"
                  stroke="#dc0019"
                  stroke-width="1.5"
                  stroke-miterlimit="10"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </Button>
          </div>
        </div>

        <div></div>
      </Box>

    )
  })
}

</Box>
      <Button    onClick={()=>handleNewOrders(Orders.length)}       sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "8px 0px",
            marginTop:'4em',
            gap:'.7em',
            width:'100%',
            textTransform:'none',
            color:'var(--primary-red)',
            border:'1px solid var(--primary-red)'
          }}>
        <img src={add} alt="add icon" />
        <span style={{fontWeight:'600'}} > Add New Orders </span>
      </Button>

</div>


    </Container>

  );
};
export default Restaurant;
