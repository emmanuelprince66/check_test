import React from "react";
import { Typography, Box, Card, Container, Checkbox } from "@mui/material";
import { useTheme } from "@mui/material";
import BackArrow from "../../components/backArrow/BackArrow";
import { useNavigate } from "react-router-dom";
import SuperMrkt from "../../components/supermarket/SuperMrkt";
import comColor from "../../images/practise/comColor.svg";
import completed from "../../images/practise/completed.svg";
import delivered from "../../images/practise/delivered.svg";
import naira from "../../images/practise/naira.svg";
import out from "../../images/practise/out.svg";
import pen from "../../images/practise/pen.svg";
import penColor from "../../images/practise/penColor.svg";
import processing from "../../images/practise/processing.svg";
import serColor from "../../images/practise/serColor.svg";
import serving from "../../images/practise/serving.svg";
import threedot from "../../images/practise/threedot.svg";
import { useState, useEffect } from "react";
import "./Order.css";
import { Modal, Button } from "@mui/material";
import arrowLeft from "../../images/arrowLeft.svg";
import { AuthProvider } from "../../util/AuthContext";
import Navbar from "../../components/navbar/Navbar";
import useOrders from "../../hooks/useOrders";
import NoResult from "../../components/NoResult";
import { CircularProgress } from "@mui/material";
import CheckCircleOutlineRoundedIcon from "@mui/icons-material/CheckCircleOutlineRounded";
import MoreVertRoundedIcon from "@mui/icons-material/MoreVertRounded";
import { Dialog } from "@mui/material";
import { useDispatch } from "react-redux";
import { Slide } from "@mui/material";
import OrderReciept from "../../components/OrderReciept";
import FormattedPrice from "../../components/FormattedPrice";
import useRestaurantOrders from "../../hooks/useRestaurantOrders";
import { useSelector } from "react-redux";
import { showReceiptInView } from "../../util/slice/merchantSlice";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Orders = () => {
  const orders = useOrders();
  console.log(orders.data);
  const restaurantOrders =  useRestaurantOrders();
  console.log(restaurantOrders.data)
  const {data:merchantDetails} = useSelector(state=>state.merchantReducer)
console.log(restaurantOrders)
  const [ordersItem, setOrdersItem] = useState();
  const [open, setOpen] = React.useState(false);
  const [view, setView] = useState('restaurant');
  const [orderToView, setOrderToView] = useState(null);
  const [open2, setOpen2] = useState(false);
  const [openConfirmModal, setOpenConfirmModal] = useState(false);
  const [resOptionsOpen, setResOptionsOpen] = useState(false);
  const handleClose = () => {
    if( view === 'restaurant'){
      setResOptionsOpen(false)
     } 
     else{
      setOpen(false);
     }
  
  } 
  const handleClose2 = () => setOpen2(false);

  const handleOpen2 = (item) => {
    setOpen2(true);
  };

  const handleOpen = (item) => {
    // setOpen(true);

   if( view === 'restaurant'){
    setResOptionsOpen(true)
    console.log(item)
    setOrderToView(item)
    dispatch(showReceiptInView(item))
   } 
   else{
    setOpen(true);
   }
    // const ordersFromId = orders.data.find((data) => data.id === item);

    // setOrdersItem(ordersFromId.id);
  };

  const currentTheme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <AuthProvider>
      <Box
        sx={{
          maxWidth: "31%",
          mx: "auto",
          marginTop: "1rem",
          maxWidth: { xs: "90%", sm: "100%", md: "31%" },
        }}
      >
        <Container
          sx={{
            display: "flex",
            flexDirection: "column",
            width: { xs: "100%", sm: "70%", md: "90%" },
            padding: "0",
            mx: "auto",
          }}
        >
          <div onClick={() => navigate(-1)}>
            <BackArrow />
          </div>

          <Typography
            variant="h2"
            sx={{
              fontFamily: "raleWay",
              color:
                currentTheme.palette.type === "light" ? "#000000" : "#EEEEEE",
              fontWeight: 600,
              fontSize: "24px",
              lineHeight: "23.18px",
              marginBottom: "1rem",
            }}
          >
            My Status
          </Typography>

          <Box sx={{borderBottom:"1px solid grey", justifyContent:"center",display:'flex',gap:'2em',marginBottom:'1em'}} >
            <Button onClick={()=>setView('restaurant')} sx={{color: view === 'restaurant' ? "  var(--primary-red)" : 'grey', borderBottom: view === 'restaurant'? "2px solid var(--primary-red)" :'', fontSize:'1.2em',fontWeight:'600',textTransform:"none"
,'&:focus':{borderBottom:"2px solid var(--primary-red)"}}} >Restaurant</Button>
            <Button onClick={()=>setView('supermarket')} sx={{color:  view === 'supermarket' ?'var(--primary-red)' : 'grey',borderBottom: view === 'supermarket'? "2px solid var(--primary-red)" :'',
textTransform:"none", fontSize:'1.2em',fontWeight:'600', '&:focus':{borderBottom:"2px solid var(--primary-red)"}}}>Supermarket </Button>
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
              marginBottom: "5rem",
            }}
          >
            {  orders?.data ? (
              orders.data == 0 ? (
                <NoResult
                  notification="You currenty have no orders!"
                  smallText="Proceed to scan to add more orders"
                  buttonText="Scan to add new orders"
                  linkText="/home"
                />
              ) : (
                view === 'supermarket' && orders.data.map((item) => (
                  <Card
                    onClick={() => handleOpen(item.id)}
                    key={item.id}
                    sx={{
                      display: "flex",
                      cursor: "pointer",
                      justifyContent: "space-between",
                      alignItems: "start",
                      padding: "0.6rem",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        gap: "5px",
                        alignItems: "start",
                      }}
                    >
                      <Typography
                        sx={{
                          fontFamily: "raleWay",
                          fontWeight: "900",
                          fontSize: "16px",
                          color:
                            currentTheme.palette.type === "light"
                              ? "#000"
                              : "#ffff",
                        }}
                      >
                        {item.supermarket.companyName}
                      </Typography>

                      <Typography
                        sx={{
                          fontFamily: "raleWay",
                          fontWeight: "900",
                          fontSize: "15px",
                          color:
                            item.status === "COMPLETED"
                              ? "#008000"
                              : item.status === "PENDING"
                              ? "#C57600"
                              : item.status === "CANCELLED"
                              ? "red"
                              : "#727272",
                        }}
                      >
                        <FormattedPrice amount={item.totalAmount} />
                      </Typography>

                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "start",
                          alignItems: "center",
                          gap: "2px",
                        }}
                      >
                        <CheckCircleOutlineRoundedIcon
                          sx={{
                            fontSize: "15px",
                            paddingTop: "2px",
                            color:
                              item.status === "COMPLETED"
                                ? "#008000"
                                : item.status === "PENDING"
                                ? "#C57600"
                                : item.status === "CANCELLED"
                                ? "red"
                                : "#727272",
                          }}
                        />
                        <Typography
                          sx={{
                            fontFamily: "raleWay",
                            fontWeight: "900",
                            fontSize: "15px",
                            color:
                              item.status === "COMPLETED"
                                ? "#008000"
                                : item.status === "PENDING"
                                ? "#C57600"
                                : item.status === "CANCELLED"
                                ? "red"
                                : "#727272",
                          }}
                        >
                          {item.status.toLowerCase()}
                        </Typography>
                      </Box>
                    </Box>

                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "end",
                        gap: "2rem",
                      }}
                    >
                      <MoreVertRoundedIcon />

                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: "3px",
                        }}
                      >
                        <CheckCircleOutlineRoundedIcon
                          sx={{
                            color:
                              item.status === "COMPLETED"
                                ? "#008000"
                                : item.status === "PENDING"
                                ? "#727272"
                                : item.status === "CANCELLED"
                                ? "red"
                                : "#727272",
                            fontSize: "13px",
                          }}
                        />
                        <Typography
                          sx={{
                            fontFamily: "raleWay",
                            fontWeight: "900",
                            fontSize: "15px",
                            color:
                              item.status === "COMPLETED"
                                ? "#008000"
                                : item.status === "PENDING"
                                ? "#727272"
                                : item.status === "CANCELLED"
                                ? "red"
                                : "#727272",
                          }}
                        >
                          completed
                        </Typography>
                      </Box>
                    </Box>
                  </Card>
                ))
              )
            ) : (
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "10rem",
                }}
              >
                <CircularProgress size="4rem" color="error" />
              </Box>
            )}


            { restaurantOrders?.data ? 
            (
              restaurantOrders.data.length === 0 ? (
                <NoResult
                  notification="You currenty have no orders!"
                  smallText="Proceed to scan to add more orders"
                  buttonText="Scan to add new orders"
                  linkText="/home"
                />
              ) : (
                 view === 'restaurant' && restaurantOrders.data.map((item) => (
                  <Card
                    onClick={() => handleOpen(item)}
                    key={item.id}
                    sx={{
                      display: "flex",
                      cursor: "pointer",
                      justifyContent: "space-between",
                      alignItems: "start",
                      padding: "0.6rem",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        gap: "5px",
                        alignItems: "start",
                      }}
                    >
                      <Typography
                        sx={{
                          fontFamily: "raleWay",
                          fontWeight: "900",
                          fontSize: "16px",
                          color:
                            currentTheme.palette.type === "light"
                              ? "#000"
                              : "#ffff",
                        }}
                      >
                        {item?.restaurant?.companyName}
                      </Typography>

                      <Typography
                        sx={{
                          fontFamily: "raleWay",
                          fontWeight: "900",
                          fontSize: "15px",
                          color:
                            item.status === "COMPLETED"
                              ? "#008000"
                              : item.status === "PENDING" 
                              ? "#C57600"
                              : item.status === "CANCELLED"
                              ? "red"
                              : "#727272",
                        }}
                      >
                        <FormattedPrice amount={item.totalAmount} />
                      </Typography>

                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "start",
                          alignItems: "center",
                          gap: "2px",
                        }}
                      >
                        <CheckCircleOutlineRoundedIcon
                          sx={{
                            fontSize: "15px",
                            paddingTop: "2px",
                            color:
                              item.status === "COMPLETED"
                                ? "#008000"
                                : item.status === "PENDING"
                                ? "#C57600"
                                : item.status === "CANCELLED"
                                ? "red"
                                : "#727272",
                          }}
                        />
                        <Typography
                          sx={{
                            fontFamily: "raleWay",
                            fontWeight: "900",
                            fontSize: "15px",
                            color:
                              item.status === "COMPLETED"
                                ? "#008000"
                                : item.status === "PENDING"
                                ? "#C57600"
                                : item.status === "CANCELLED"
                                ? "red"
                                : "#727272",
                          }}
                        >
                          {item.status.toLowerCase()}
                        </Typography>
                      </Box>
                    </Box>

                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "end",
                        gap: "2rem",
                      }}
                    >
                      <MoreVertRoundedIcon />

                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: "3px",
                        }}
                      >
                        <CheckCircleOutlineRoundedIcon
                          sx={{
                            color:
                              item.status === "COMPLETED"
                                ? "#008000"
                                : item.status === "PENDING"
                                ? "#727272"
                                : item.status === "CANCELLED"
                                ? "red"
                                : "#727272",
                            fontSize: "13px",
                          }}
                        />
                        <Typography
                          sx={{
                            fontFamily: "raleWay",
                            fontWeight: "900",
                            fontSize: "15px",
                            color:
                              item.status === "COMPLETED"
                                ? "#008000"
                                : item.status === "PENDING"
                                ? "#727272"
                                : item.status === "CANCELLED"
                                ? "red"
                                : "#727272",
                          }}
                        >
                          completed
                        </Typography>
                      </Box>
                    </Box>
                  </Card>
                ))
              )
            ) : (
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "10rem",
                }}
              >
                <CircularProgress size="4rem" color="error" />
              </Box>
            )}



            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Card
                sx={{
                  position: "absolute",
                  borderTopLeftRadius: "10px",
                  borderTopRightRadius: "10px",
                  bottom: 0,
                  width: { xs: "100%", sm: "70%", lg: "25%" },
                  left: { xs: "0", sm: "14%", lg: "37%" },
                  padding: "1rem",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "start",
                  alignItems: "start",
                }}
              >
                <Typography
                  sx={{
                    fontFamily: "raleWay",
                    fontWeight: 600,
                    fontSize: "16px",
                    lineHeight: "18.78px",
                    marginY: "1rem",
                    color:
                      currentTheme.palette.type === "light"
                        ? "#1E1E1E"
                        : "#EEEEEE",
                  }}
                  id="modal-modal-title"
                >
                  More Options
                </Typography>

                <Box
                  onClick={() => handleOpen2(ordersItem ? ordersItem.id : "")}
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    width: "100%",
                    borderBottom: "1px solid #CDCDCD",
                  }}
                >
                  <Typography
                    sx={{
                      fontFamily: "raleWay",
                      fontWeight: 1000,
                      fontSize: "16px",
                      lineHeight: "18.78px",
                      marginY: "1rem",
                      color:
                        currentTheme.palette.type === "light"
                          ? "#1E1E1"
                          : "#EEEEEE",
                    }}
                    id="modal-modal-title"
                  >
                    View Order
                  </Typography>

                  <img src={arrowLeft} alt="arr-left" />
                </Box>
                <Button
                  onClick={handleClose}
                  sx={{
                    width: "95%",
                    padding: "10px",
                    borderColor: "#DC2A12",
                    fontWeight: "1000",
                    borderRadius: "8px",
                    my: "2rem",
                    color:
                      currentTheme.palette.type === "light" ? "#000" : "#fff",
                    fontFamily: "raleWay",
                    "&:hover": {
                      borderColor:
                        currentTheme.palette === "light" ? "#000" : "#eeee",
                    },
                  }}
                  variant="outlined"
                >
                  No, Go back
                </Button>
              </Card>
            </Modal>
            <Modal
              open={resOptionsOpen}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Card
                sx={{
                  position: "absolute",
                  borderTopLeftRadius: "10px",
                  borderTopRightRadius: "10px",
                  bottom: 0,
                  width: { xs: "100%", sm: "70%", lg: "25%" },
                  left: { xs: "0", sm: "14%", lg: "37%" },
                  padding: "1rem",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "start",
                  alignItems: "start",
                }}
              >
                <Typography
                  sx={{
                    fontFamily: "raleWay",
                    fontWeight: 600,
                    fontSize: "16px",
                    lineHeight: "18.78px",
                    marginY: "1rem",
                    color:
                      currentTheme.palette.type === "light"
                        ? "#1E1E1E"
                        : "#EEEEEE",
                  }}
                  id="modal-modal-title"
                >
                  More Options
                </Typography>

                <Button
                  onClick={() => navigate(`/restaurant-receipt/${orderToView?.id}`)}
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                                        textTransform:'none',
                    color:'black',
                    width: "100%",
                    borderBottom: "1px solid #CDCDCD",
                  }}
                >
                  <Typography
                    sx={{
                      fontFamily: "raleWay",
                      fontWeight: 1000,
                      fontSize: "16px",
                      lineHeight: "18.78px",
                      marginY: "1rem",
                      color:
                        currentTheme.palette.type === "light"
                          ? "#1E1E1"
                          : "#EEEEEE",
                    }}
                    id="modal-modal-title"
                  >
                    View Order
                  </Typography>

                  <img src={arrowLeft} alt="arr-left" />
                </Button>
                <Button
                  onClick={() => setOpenConfirmModal(true)}
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    textTransform:'none',
                    color:'black',
                    alignItems: "center",
                    width: "100%",
                    borderBottom: "1px solid #CDCDCD",
                  }}
                >
                  <Typography
                    sx={{
                      fontFamily: "raleWay",
                      fontWeight: 1000,
                      fontSize: "16px",
                      lineHeight: "18.78px",
                      marginY: "1rem",
                      color:
                        currentTheme.palette.type === "light"
                          ? "#1E1E1"
                          : "#EEEEEE",
                    }}
                    id="modal-modal-title"
                  >
                    Confirm Order
                  </Typography>

                  <img src={arrowLeft} alt="arr-left" />
                </Button>
                <Button
                  onClick={() => handleOpen2(ordersItem ? ordersItem.id : "")}
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    textTransform:'none',
                    color:'black',
                    width: "100%",
                    borderBottom: "1px solid #CDCDCD",
                  }}
                >
                  <Typography
                    sx={{
                      fontFamily: "raleWay",
                      fontWeight: 1000,
                      fontSize: "16px",
                      lineHeight: "18.78px",
                      marginY: "1rem",
                      color:
                        currentTheme.palette.type === "light"
                          ? "#1E1E1"
                          : "#EEEEEE",
                    }}
                    id="modal-modal-title"
                  >
                    Repeat Order
                  </Typography>

                  <img src={arrowLeft} alt="arr-left" />
                </Button>
                <Button
                  onClick={() => handleOpen2(ordersItem ? ordersItem.id : "")}
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    width: "100%",
                    textTransform:'none',
                    color:'black',
                    borderBottom: "1px solid #CDCDCD",
                  }}
                >
                  <Typography
                    sx={{
                      fontFamily: "raleWay",
                      fontWeight: 1000,
                      fontSize: "16px",
                      lineHeight: "18.78px",
                      marginY: "1rem",
                      color:
                        currentTheme.palette.type === "light"
                          ? "#1E1E1"
                          : "#EEEEEE",
                    }}
                    id="modal-modal-title"
                  >
                    Cancel Order
                  </Typography>

                  <img src={arrowLeft} alt="arr-left" />
                </Button>

                <Button
                  onClick={handleClose}
                  sx={{
                    width: "95%",
                    padding: "10px",
                    borderColor: "#DC2A12",
                    fontWeight: "1000",
                    borderRadius: "8px",
                    my: "2rem",
                    color:
                      currentTheme.palette.type === "light" ? "#000" : "#fff",
                    fontFamily: "raleWay",
                    "&:hover": {
                      borderColor:
                        currentTheme.palette === "light" ? "#000" : "#eeee",
                    },
                  }}
                  variant="outlined"
                >
                  No, Go back
                </Button>
              </Card>
            </Modal>

            {/* Dialouge full screen modal start */}
            <Dialog
              fullScreen
              open={open2}
              onClose={handleClose2}
              TransitionComponent={Transition}
            >
              <OrderReciept
                handleClose2={handleClose2}
                orderId={ordersItem ? ordersItem : ""}
                // orders={orders.data ? orders.data : ""}
              />
            </Dialog>
            <Dialog
              open={openConfirmModal}
              onClose={()=>setOpenConfirmModal(false)}
sx={{ '& .MuiPaper-root':{ display:'flex',position:'absolute',bottom:'0', margin:{xs:'0'} ,padding:'1em',flexDirection:'column',alignItems:'center',justifyContent:'center'}}}
              TransitionComponent={Transition}
            >
          
          <Box sx={{display:'flex',gap:'1em',flexDirection:'column'}} >
            <Typography fontSize={'1.3em'} textAlign={'center'} fontWeight={800}  >Confirm Order</Typography>
          <Typography fontSize={'1.1em'} textAlign={'center'} fontWeight={600}> Kindly Confirm that you have received your order. </Typography>
<Typography textAlign={'center'} > Ensure you have received your order before confirming.You cannot undo this.</Typography>
          </Box>
<Box>
  <Checkbox/> <span> I have received my order </span>
</Box>

<Box sx={{display:'flex', width:{xs:'90%' , sm:'80%',md:'70%'},gap:'1em',flexDirection:'column'}} >
  <Button sx={{backgroundColor:'var(--primary-red)', textTransform:'none',padding:'.5em 0',color:'white'}} > Confirm Order </Button>
  <Button sx={{border:'1px solid var(--primary-red)', textTransform:'none',padding:'.5em 0',color:'var(--primary-red)'}} onClick={()=>setOpenConfirmModal(false)} > Close </Button>
</Box>
            </Dialog>

            {/* Dialouge full screen modal start end */}
          </Box>
        </Container>
      </Box>

      <Navbar />
    </AuthProvider>
  );
};

export default Orders;
