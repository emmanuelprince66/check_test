import React, { useEffect } from "react";
import {
  Container,
  Box,
  TextField,
  InputAdornment,
  Typography,
  Avatar,
  Card,
  Skeleton,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import clockIcon from "../../assets/clock.svg";
import card1 from "../../assets/Card/card1.svg";
import card2 from "../../assets/card2.svg";
import useGetRestaurantsOTD from "../../hooks/useGetRestaurantsOTD";
import { getLandmarks } from "../../hooks/useGetLandMarks";
import { setOTDRestaurants } from "../../util/slice/merchantSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const OTDMainPage = () => {
  const data = useGetRestaurantsOTD();
  const restaurants = data?.data;
  const { myLocation } = useSelector((state) => state.merchantReducer);
  const dispatch = useDispatch();

  const navigate = useNavigate();
  console.log(myLocation);
  useEffect(() => {
    if (restaurants && restaurants[0]) {
      const resCoords = {
        lat: restaurants[0].latitude,
        long: restaurants[0].longitude,
      };
      const userCoords = {
        lat: myLocation.latitude,
        long: myLocation.longitude,
      };
      getLandmarks({ resCoords, userCoords });
      dispatch(setOTDRestaurants(restaurants));
    }
  }, [restaurants, myLocation, dispatch]);
  function handleClick(id) {
    navigate(`/restaurant/${id}`);
  }
  return (
    <Container sx={{ display: "flex", marginBottom:"100px", paddingTop:'1em', flexDirection: "column", gap: "1em" }}>
      <Typography fontWeight={700} fontSize={"1.6em"}>
        Order to Doorstep{" "}
      </Typography>

      <TextField
        label="Search Restaurant"
        sx={{ "& .MuiInputBase-root": { height: "44px" } }}
        fullWidth
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />

      <Box>
        <Typography fontWeight={700} fontSize={"1.3em"}>
          Restaurants Near You{" "}
        </Typography>
      </Box>

      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "1em",
          padding: "0em",
        }}
      >
        {restaurants
          ? restaurants?.map((item, i) => {
              return (
                <Card
                  onClick={() => handleClick(item.restaurant.id)}
                  key={i}
                  sx={{ padding: ".5em ", display: "flex" }}
                >
                  <Avatar
                    sx={{
                      width: "40%",
                      borderRadius: "4px 4px 0 0",
                      height: "auto",
                    }}
                    variant="rounded"
                    alt="Menu Item Image"
                    src={item.image}
                  />

                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: ".5em",
                      padding: ".5em",
                    }}
                  >
                    <Typography> {item.restaurant.companyName} </Typography>
                    <Box sx={{ display: "flex", gap: ".5em" }}>
                      <Avatar
                        sx={{ width: "20px", height: "20px" }}
                        src={clockIcon}
                      />
                      <Typography sx={{ fontSize: "13px" }}>
                        {item.openingTime + "-" + item.closingTime}{" "}
                      </Typography>
                    </Box>
                    <Box sx={{ display: "flex", gap: ".5em" }}>
                      <Avatar
                        sx={{ width: "20px", height: "20px" }}
                        src={card2}
                      />
                      <Typography sx={{ fontSize: "13px" }}></Typography>
                    </Box>
                    <Box sx={{ display: "flex", gap: ".5em" }}>
                      <Avatar
                        sx={{ width: "20px", height: "20px" }}
                        src={card1}
                      />
                      <Typography sx={{ fontSize: "13px" }}>
                        {" "}
                        {item.available
                          ? "Delivery Available"
                          : "Not available"}{" "}
                      </Typography>
                    </Box>
                  </Box>
                </Card>
              );
            })
          : Array.from({ length: 5 }).map((item, i) => {
              return (
                <Skeleton
                  key={i}
                  variant="rectangular"
                  width={"100%"}
                  height={200}
                />
              );
            })}
      </Container>
    </Container>
  );
};
export default OTDMainPage;
