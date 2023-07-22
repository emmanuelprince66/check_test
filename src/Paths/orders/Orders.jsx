import React from "react";
import { Typography, Box, Card, Container } from "@mui/material";
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
import { Slide } from "@mui/material";
import OrderReciept from "../../components/OrderReciept";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Orders = () => {
  const orders = useOrders();
  // console.log(orders.data);

  const [ordersItem, setOrdersItem] = useState();
  const [open, setOpen] = React.useState(false);
  const [open2, setOpen2] = useState(false);
  const handleClose = () => setOpen(false);
  const handleClose2 = () => setOpen2(false);

  const handleOpen2 = (item) => {
    setOpen2(true);
  };

  const handleOpen = (item) => {
    setOpen(true);
    const ordersFromId = orders.data.find((data) => data.id === item);

    setOrdersItem(ordersFromId.id);
  };

  // const [active, setActive] = useState(false);
  // const [isShown, setIsShown] = useState(false);

  const currentTheme = useTheme();
  const navigate = useNavigate();

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
            My Orders
          </Typography>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
              marginBottom: "5rem",
            }}
          >
            {orders.data ? (
              orders.data == 0 ? (
                <NoResult
                  notification="You currenty have no orders!"
                  smallText="Proceed to scan to add more orders"
                  buttonText="Scan to add new orders"
                  linkText="/home"
                />
              ) : (
                orders.data.map((item) => (
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
                        &#8358;&nbsp;{item.totalAmount}
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
                                ? "#C57600"
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
                                ? "#C57600"
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
              <CircularProgress size="3rem" color="error" />
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
                      fontWeight: 400,
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
                    Veiw Order
                  </Typography>

                  <img src={arrowLeft} alt="arr-left" />
                </Box>
                <Button
                  onClick={handleClose}
                  sx={{
                    width: "95%",
                    padding: "10px",
                    borderRadius: "8px",
                    my: "2rem",
                    color:
                      currentTheme.palette.type === "light" ? "#000" : "#fff",
                    borderColor: "2px solid  #000",
                    fontFamily: "raleWay",
                    "&:hover": {
                      borderColor:
                        currentTheme.palette === "light" ? "#000" : "#eeee",
                    },
                  }}
                  variant="outlined"
                >
                  No,Go back
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
                orders={orders.data ? orders.data : ""}
              />
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
