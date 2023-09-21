import { Typography, Container, Box } from "@mui/material";
import React, { useState } from "react";
import infoCircle from "../../assets/Cart/info-circle.svg";
import { useForm, Controller } from "react-hook-form";
import {
  TextField,
  Button,
  Grid,
  IconButton,
  InputAdornment,
  TextareaAutosize,
  InputLabel,
  FormControl,
} from "@mui/material";
import PhoneIcon from "@mui/icons-material/Phone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import stepCircle from "../../assets/Cart/Frame 271.svg";
import { useSelector } from "react-redux";
import { CreateTable } from "../../components/createTable";
import del from "../../assets/Cart/trash.svg";
import edit from "../../assets/Cart/edit-2.svg";
import { setDeliveryDetails } from "../../util/slice/merchantSlice";
import BackArrow from "../../components/backArrow/BackArrow";
import { getLandmarks } from "../../hooks/useGetLandMarks";
import { useDispatch } from "react-redux";
import { PlaceOrder } from "../../components/handlePlacingOrder/handlePlacingOrder";
const RestaurantCheckout = () => {
  const [showSummary, setShowSummary] = useState(false);
  const [collapse, setCollapse] = useState({ id: null, status: false });
  const {
    handleSubmit,
    control,
    field,
    register,
    formState: { errors },
  } = useForm();
  const {
    data: merchantDetails,
    myLocation,
    deliveryDetails,
    orders,
  } = useSelector((state) => state.merchantReducer);
  const dispatch = useDispatch();
  const ordersToSend = orders
    .filter((order) => order.items.length > 0)
    .map((item) => {
      const { menu, ...rest } = item;
      return rest;
    });

  const onSubmit = (data) => {
    dispatch(setDeliveryDetails(data));
    setShowSummary(true);
  };
  function handleCollapse(id) {
    if (collapse.id === id) {
      setCollapse({ ...collapse, status: !collapse.status });
    } else {
      setCollapse({ id: id, status: !collapse.status });
      console.log(collapse);
    }
  }

  return (
    <Container
      sx={{
        display: "flex",
        marginBottom: showSummary ? "400px" : "100px",
        paddingTop: "1em",
        flexDirection: "column",
        gap: "1em",
        position: "relative",
      }}
    >
      <BackArrow />
      <Box sx={{ display: "flex", flexDirection: "column", gap: "1em" }}>
        <Typography fontSize={"1.3em"} fontWeight={700}>
          Checkout{" "}
        </Typography>
        <Box
          sx={{
            padding: "0 1em",
            justifyContent: "space-between",
            display: "flex",
            alignItems: "center",
            width: "100%",
          }}
        >
          <img src={stepCircle} style={{ width: "20px" }} alt="step icon" />
          <span
            style={{
              height: "2px",
              width: "100%",
              margin: "0 .5em",
              backgroundColor: "var(--text-gold)",
            }}
          ></span>
          <img src={stepCircle} style={{ width: "20px" }} alt="step icon" />
          <span
            style={{
              height: "2px",
              margin: "0 .5em",
              width: "100%",
              backgroundColor: !showSummary
                ? " var(--box-gold)"
                : "var(--text-gold)",
            }}
          ></span>

          <img
            src={stepCircle}
            style={{ width: "20px", opacity: !showSummary ? 0.7 : 1 }}
            alt="step icon"
          />
        </Box>
        <Box
          sx={{
            padding: "0 1em",
            justifyContent: "space-between",
            display: "flex",
            fontWeight: "600",
            fontSize: ".8em",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: ".5em",
            }}
          >
            <span>Add Items</span>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: ".5em",
            }}
          >
            <span>Delivery</span>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: ".5em",
              opacity: !showSummary ? 0.7 : 1,
            }}
          >
            <span> Summary </span>
          </div>
        </Box>
      </Box>
      {!showSummary ? (
        <>
          <Box
            sx={{
              backgroundColor: "var(--box-gold)",
              fontSize: ".8em",
              padding: "1em",
              color: "var(--text-gold)",
              gap: ".5em",
              display: "flex",
            }}
          >
            <img src={infoCircle} alt="info icon" />
            <span>
              If you would like to pick-up your order in person at no extra
              cost, go back and select “Pick-Up”, then proceed to Checkout.
            </span>
          </Box>

          <Typography marginBottom={"1em"} fontWeight={700} fontSize={"1.2em"}>
            {" "}
            Delivery Details{" "}
          </Typography>

          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={4}>
              <Grid item xs={12} sm={6}>
                <FormControl
                  sx={{
                    width: "100%",
                    marginBottom: "0.5rem",
                    marginX: "auto",
                  }}
                  variant="outlined"
                >
                  <Typography
                    htmlFor="input"
                    sx={{
                      paddingX: "0px",
                      fontWeight: 600,
                      marginBottom: "1ch",
                      fontFamily: "raleWay",
                      fontSize: "16px",
                    }}
                  >
                    Phone Number
                  </Typography>
                  <Controller
                  name="phoneNumber"
                  control={control}
                  defaultValue=""
                  rules={{ required: "Phone Number is required" }}
                  render={({ field }) => (

                  <TextField
                  {...field}
                    sx={{
                      width: "100%",
                      color:'grey',
                      mx: "auto",
                      "& .MuiInputBase-root": {
                        backgroundColor: "hsla(0, 0%, 78%, .2)",
                      },
                    }}
                    name="phoneNumber"
                    fullWidth
                    placeholder="Enter your phone Number"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment>
                          <PhoneIcon />
                          &nbsp;&nbsp;
                        </InputAdornment>
                      ),
                    }}
                    aria-describedby="outlined-weight-helper-text"
                    inputProps={{
                      "aria-label": "weight",
                    }}
                  />
                 )}
                 
                    />
                                 </FormControl>
                                 {errors.phoneNumber && (
                  <p style={{ color: "red" }}>
                    {errors.phoneNumber.message}
                  </p>
                )}


                <Box
                  sx={{
                    color: "var(--text-gold)",
                    fontSize: ".8em",
                    padding: ".5em 0",
                    gap: ".5em",
                    display: "flex",
                  }}
                >
                  <img src={infoCircle} alt="info icon" />
                  <span>Ensure this line is available until delivery.</span>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6}>
              <FormControl
                  sx={{
                    width: "100%",
                    marginBottom: "0.5rem",
                    marginX: "auto",
                  }}
                  variant="outlined"
                >
                  <Typography
                    htmlFor="input"
                    sx={{
                      paddingX: "0px",
                      fontWeight: 600,
                      marginBottom: "1ch",
                      fontFamily: "raleWay",
                      fontSize: "16px",
                    }}
                  >
                   Alternative Phone Number
                  </Typography>


                <Controller
                  name="altPhoneNumber"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <TextField
                      {...field}
                      variant="outlined"
                      sx={{
                        width: "100%",
                      mx: "auto",
                        "& .MuiInputBase-root": {
                          backgroundColor: "hsla(0, 0%, 78%, .2)",
                        },
                      }}
                      placeholder="Enter an alternative phone number"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                              <PhoneIcon />
                          </InputAdornment>
                        ),
                      }}
                      aria-describedby="outlined-weight-helper-text"
                    inputProps={{
                      "aria-label": "weight",
                    }}

                    />
                  )}
                />
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <InputLabel
                  sx={{ fontSize: "1em", fontWeight: "600", color: "black" }}
                  htmlFor="deliveryAddress"
                >
                  Delivery Address*
                </InputLabel>
                <Controller
                  name="deliveryAddress"
                  control={control}
                  defaultValue=""
                  rules={{ required: "Delivery address is required" }}
                  render={({ field }) => (
                    <TextareaAutosize
                      {...field}
                      minRows={3}
                      fullWidth
                      startIcon={<LocationOnIcon />}
                      placeholder="Delivery Address*"
                      style={{
                        width: "100%",
                        borderRadius: ".5em",
                        backgroundColor: "hsla(0, 0%, 78%, .2)",
                        border: "1px solid #ccc",
                        padding: "8px",
                      }}
                    />
                  )}
                />
                <Box
                  sx={{
                    color: "var(--text-gold)",
                    fontSize: ".8em",
                    padding: ".5em 0",
                    gap: ".5em",
                    display: "flex",
                  }}
                >
                  <img src={infoCircle} alt="info icon" />
                  <span>
                    Please, provide a well detailed address for easy location.{" "}
                  </span>
                </Box>

                {errors.deliveryAddress && (
                  <p style={{ color: "red" }}>
                    {errors.deliveryAddress.message}
                  </p>
                )}
              </Grid>
            </Grid>
            <Button
              type="submit"
              variant="contained"
              sx={{
                backgroundColor: "var(--primary-red)",
                "&:focus ,&:hover ": { backgroundColor: "var(--primary-red)" },
                width: "100%",
                padding: "10px 8px",
                marginTop: ".5em",
              }}
            >
              Proceed
            </Button>
          </form>
        </>
      ) : (
        <Box sx={{ display: "flex", flexDirection: "column", gap: "1em" }}>
          <Typography fontWeight={700} fontSize={"1.2em"}>
            {" "}
            Order Summary{" "}
          </Typography>

          {ordersToSend.map((item, i) => {
            return (
              <Box
                sx={{
                  border: "1px solid hsla(0, 0%, 80%, 1)",
                  borderRadius: ".4em",
                  padding: ".5em",
                }}
                key={i}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Typography
                    fontWeight={700}
                    fontSize={"1em"}
                    sx={{ textDecoration: "underline" }}
                  >
                    {" "}
                    Order {i + 1} ({item.orderType}){" "}
                  </Typography>
                  <Box
                    sx={{ display: "flex", alignItems: "center", gap: ".5em" }}
                  >
                    <img
                      style={{
                        display:
                          collapse.id === item.id && collapse.status
                            ? "none"
                            : "block",
                      }}
                      src={del}
                      alt="del btn"
                    />
                    <img
                      style={{
                        display:
                          collapse.id === item.id && collapse.status
                            ? "none"
                            : "block",
                      }}
                      src={edit}
                      alt="edit btn"
                    />
                    <svg
                      onClick={() => {
                        handleCollapse(item.id);
                      }}
                      style={{
                        transform:
                          collapse.id === item.id && collapse.status === true
                            ? "rotate(270deg)"
                            : "rotate(90deg)",
                        cursor: "pointer",
                      }}
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M15 19.92L8.47997 13.4C7.70997 12.63 7.70997 11.37 8.47997 10.6L15 4.08002"
                        stroke="#1E1E1E"
                        stroke-width="1.5"
                        stroke-miterlimit="10"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </Box>
                </Box>
                <div
                  style={{
                    display:
                      collapse.id === item.id && collapse.status
                        ? "none"
                        : "block",
                  }}
                >
                  <CreateTable order={item.items} />
                </div>
              </Box>
            );
          })}

          <Box sx={{}}>
            <Typography
              marginBottom={"1em"}
              fontWeight={700}
              fontSize={"1.2em"}
            >
              {" "}
              Delivery Details{" "}
            </Typography>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "2em",
              }}
            >
              <span>PHONE NO:</span>
              <span style={{ fontWeight: "600" }}>
                {" "}
                {deliveryDetails.phoneNumber}{" "}
              </span>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "2em",
              }}
            >
              <span>ALT PHONE NO:</span>
              <span style={{ fontWeight: "600" }}>
                {" "}
                {deliveryDetails.altPhoneNumber}{" "}
              </span>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "2em",
              }}
            >
              <span>ADDRESS:</span>
              <span style={{ fontWeight: "600" }}>
                {" "}
                {deliveryDetails.deliveryAddress}
              </span>
            </Box>
          </Box>

          <PlaceOrder restaurant={merchantDetails.restaurant} />
        </Box>
      )}{" "}
    </Container>
  );
};
export default RestaurantCheckout;
