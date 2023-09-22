import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Container,
  Box,
  Button,
  Typography,
  Card,
  Skeleton,
  Avatar,
} from "@mui/material";
import { useSelector } from "react-redux";
import { getMenu } from "../../helpers/getMenu";
import useMenu from "../../hooks/useMenu";
import useRestaurant from "../../hooks/useRestaurant";
import Restaurant from "../../components/restaurant/index";
import clockIcon from "../../assets/clock.svg";
import { getLandmarks } from "../../hooks/useGetLandMarks";
import card1 from "../../assets/Card/card1.svg";
import card2 from "../../assets/card2.svg";
import { convertTo12HourFormat } from "../../helpers/getAmPmFormat";

const RestaurantPage = () => {
  const params = useParams();
  const { OTDRestaurants, myLocation } = useSelector(
    (state) => state.merchantReducer
  );
  const restaurant = OTDRestaurants?.find(
    (item) => item?.restaurant?.id == params.id
  );
  const menu = useMenu(params.id);
  const [data, setData] = useState({});

  useEffect(() => {
    const resCoords = {
      lat: restaurant.latitude,
      long: restaurant.longitude,
    };
    const userCoords = {
      lat: myLocation.latitude,
      long: myLocation.longitude,
    };
    getLandmarks({ resCoords, userCoords }).then((res) => {
      if (res && res.data) {
        setData(res.data);
      }
    });
  }, []);

  return (
    <div className="gpt3__restaurant">
      <Container
        sx={{
          padding: "0px",
          display: "flex",
          marginTop: "-1em",
          gap: "2em",
          flexDirection: "column",
        }}
      >
        <Box sx={{ height: "20vh" }}>
          <Avatar
            sx={{
              width: "100%",
              height: "100%",
              borderRadius: "4px 4px 0 0",
              objectFit: "cover",
            }}
            variant="rounded"
            alt="Menu Item Image"
            src={restaurant?.image}
          />
        </Box>
        <Card
          sx={{
            padding: ".5em ",
            width: { xs: "90%", md: "90%" },
            margin: " 0 auto",
            insetInline: "0",
            zIndex: "9",
            marginTop: "-4em",
            boxShadow:
              " 0px 2px 1px -1px hsla(0, 0%, 0%, 0.05), 0px 1px 1px 0px hsla(0, 0%, 0%, 0.05), 0px 1px 3px 0px hsla(0, 0%, 0%, 0.05)",
            display: "flex",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: ".5em",
              padding: ".5em",
            }}
          >
            <Typography fontSize={"22px"} fontWeight={600}>
              {" "}
              {menu?.data?.companyName}{" "}
            </Typography>
            <Box sx={{ display: "flex", gap: ".5em" }}>
              <Avatar sx={{ width: "20px", height: "20px" }} src={clockIcon} />
              <Typography sx={{ fontSize: "13px" }}>
                {convertTo12HourFormat(restaurant?.openingTime) + '-' + convertTo12HourFormat(restaurant?.closingTime)  }{" "}
                <span
                  style={{
                    background: "hsla(120, 100%, 25%, 0.1)",
                    color: "var(--currency-green",
                    padding: ".3em",
                    borderRadius: ".3em",
                    fontWeight: "600",
                  }}
                >
                  {" "}
                  open{" "}
                </span>
              </Typography>
            </Box>
            <Box sx={{ display: "flex", gap: ".5em" }}>
              <Avatar sx={{ width: "20px", height: "20px" }} src={card2} />
              <Typography sx={{ fontSize: "13px", width: "100%" }}>
                {" "}
                {data && data?.destination_addresses ? (
                  <>
                    <span> {data?.destination_addresses[0]}</span>
                    &nbsp;
                    <span>({data?.rows[0].elements[0].distance?.text} away)</span>
                  </>
                ) : (
                  <Skeleton variant="text" width={"100%"} height={30} />
                )}{" "}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", gap: ".5em" }}>
              <Avatar sx={{ width: "20px", height: "20px" }} src={card1} />
              <Typography sx={{ fontSize: "13px" }}>
                {" "}
                Delivery Available
              </Typography>
            </Box>
          </Box>
        </Card>

        <Restaurant />
      </Container>
    </div>
  );
};
export default RestaurantPage;
