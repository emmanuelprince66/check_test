import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import arrowleft from "../../assets/arrow-left.svg";
import { useNavigate } from "react-router-dom";
import "./restaurant.css";
import add from "../../assets/add-square.svg";
import { Box, Button, Container } from "@mui/material";
import useMenu from "../../hooks/useMenu";
import useRestaurantCategory from "../../hooks/useRestaurantCategory";
import { useDispatch } from "react-redux";
import {
  addOrders,
  removeOrder,
  clearRestaurantCart,
  setOrderInView,
} from "../../util/slice/merchantSlice";
import options from "../../assets/MoreOptions.svg";
import BackArrow from "../backArrow/BackArrow";
import RestaurantOrderModal from "../restaurantOrderModal";
const Restaurant = () => {
  const {
    orders,
    orderCart,
    data: merchantDetails,
  } = useSelector((state) => state.merchantReducer);
  // console.log(merchantDetails)
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [openOrderOptions, setOpenOrderOptions] = useState({
    id: null,
    status: false,
  });
  const [allCartOptions, setAllCartOptions] = useState(false);

  useEffect(() => {
    let firstOrder = { id: 1, amount: 0.0,orderType:'eat-in', items: [] };
    dispatch(addOrders(firstOrder));
  }, [orderCart, orders]);

  function handleNewOrders() {
    const maxId = orders.length + 1;
    let newOrder = {
      id: maxId,
      amount: 0.0,
      orderType:'eat-in',
      items: [],
    };
    dispatch(addOrders(newOrder));
  }
function clearCart(){
  dispatch(clearRestaurantCart())
  setAllCartOptions(false)
  
}
  function handleClickMenu(id) {
    dispatch(setOrderInView(id));
    navigate("/restaurant/menu");
  }
  function handleRemoveOrder(id) {
    dispatch(removeOrder(id));
    setOpenOrderOptions({ id: null, status: false });
  }
  function handleViewOptions(id) {
    setOpenOrderOptions({ id: id, status: true });
  }

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        overflowY: "auto",
        gap: "1em",
        flex: "1",
        marginBottom: "15em",
      }}
    >
      <Box
        sx={{
          justifyContent: "space-between",
          display: "flex",
          alignItems: "center",
        }}
      >
        <BackArrow />
        <Button
          sx={{
            border: "1px solid #CDCDCD",
            padding: ".7em",
            minWidth: "44px",
          }}
          onClick={()=>setAllCartOptions(true)}
        >
          <img src={options} />
        </Button>
      </Box>

      <h1 className="h1-text">My Cart</h1>

      <div
        style={{
          overflowY: "auto",
          marginBottom: "100px",
          flex: "1",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "column", gap: "1em" }}>
          {orders.map((order, i) => {
            return (
              <Box
                key={i}
                sx={{ backgroundColor: "var(--cart-bg-color)", display:'flex',flexDirection:'column',gap:'.5em' }}
                padding={"1em"}
                borderRadius={".5em"}
              >
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <h2 style={{ fontSize: "1.3em" }}> Order {order?.id}</h2>
                  <Button
                    onClick={() => handleViewOptions(order.id)}
                    sx={{ padding: "0.7em", minWidth: "44px" }}
                  >
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
                  <div style={{ color: "var(--currency-green)", fontWeight: "600" }}>
                    N {orders[order?.id - 1]?.amount}{" "}
                  </div>

{              
  orders[order?.id - 1]?.items.length === 0 ?
  
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
                      onClick={() => handleClickMenu(order?.id)}
                    >
                      <span style={{ fontWeight: "600" }}>Add Items</span>
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
:null
                  
}         
       </div>

                <div></div>
              </Box>
            );
          })}
        </Box>
        <Button
          onClick={() => handleNewOrders(orders?.length)}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "15px 0px",
            marginTop: "4em",
            gap: ".7em",
            width: "100%",
            textTransform: "none",
            color: "var(--primary-red)",
            border: "1px solid var(--primary-red)",
          }}
        >
          <img src={add} alt="add icon" />
          <span style={{ fontWeight: "600" }}> Add New Orders </span>
        </Button>
      </div>
      {openOrderOptions.status ? (
        <RestaurantOrderModal
          onDelButtonClick={() => handleRemoveOrder(openOrderOptions.id)}
          delText={"Delete Order"}
          id={openOrderOptions.id}
          ordersIn={ orders[openOrderOptions.id - 1 ].items.length > 0 }
          closeModal={() => setOpenOrderOptions(false)}
        />
      ) : null}
      {allCartOptions ? 
      <RestaurantOrderModal onDelButtonClick={clearCart} delText={'Clear Cart'} closeModal={()=>setAllCartOptions(false)} /> 
      : null }
    </Container>
  );
};
export default Restaurant;
