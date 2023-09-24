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
import { setOTDRestaurants ,setOTDOrderOnClickId} from "../../util/slice/merchantSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import BackArrow from "../../components/backArrow/BackArrow";
import { useTheme } from "@mui/material";
import searchLogo from "../../images/searchLogo.svg";
import dashdot from "../../images/dashdot.svg";

import { convertTo12HourFormat } from "../../helpers/getAmPmFormat";
const OTDMainPage = () => {
  const data = useGetRestaurantsOTD();
  const restaurants = data?.data;
  const { OTDRestaurants, myLocation } = useSelector(
    (state) => state.merchantReducer
  );
  const dispatch = useDispatch();
  const currentTheme = useTheme();

  const navigate = useNavigate();
  useEffect(() => {
    // fetching the nearby OTD restaurants and adding the landmarks distance data to each
    const fetchResults = async () => {
      if (restaurants) {
        const userCoords = {
          lat: myLocation.latitude,
          long: myLocation.longitude,
        };

        try {
          const results = await Promise.all(
            restaurants?.map(async (item) => {
              const poon = await getLandmarks({
                resCoords: { lat: item.latitude, long: item.longitude },
                userCoords,
              });
              const data = poon.data;
              return { ...item, data };
            })
          );
          // return restaurants not more than 20km around.
          const filteredResults = results?.filter((item) => {
            const distance = parseInt(
              item?.data?.rows[0].elements[0]?.distance?.text
            );
            return distance <= 20;
          });

          // Dispatch the filtered results to the store
          if (filteredResults.length > 0) {
            dispatch(setOTDRestaurants(filteredResults));
          }
        } catch (error) {
          console.error("Error fetching results:", error);
        }
      }
    };

    fetchResults();
  }, [restaurants, myLocation, dispatch]);
  // navigate to the clicked restaurant.
  function handleClick(id) {
    navigate(`/restaurant/${id}`);
 dispatch(setOTDOrderOnClickId(id))

  }
  return (
    <div className="gpt3__restaurant">
      <Container
        sx={{
          display: "flex",
          marginBottom: "100px",
          flexDirection: "column",
          gap: "1em",
        }}
      >
        <BackArrow />

        <Typography fontWeight={700} fontSize={"1.6em"}>
          Order to Doorstep{" "}
        </Typography>
        {/* Search Field */}
        <TextField
            sx={{
              width: { xs: "100%", sm: "25rem", md: "327px" },
              mx: "auto",
              color:
                currentTheme.palette.type === "light" ? "#727272" : "#D4D4D4",
              borderRadius: "10px",
              background:
                currentTheme.palette.type === "light" ? "#F8F8F8" : "#242424",
              "& .MuiOutlinedInput-root": {
                "&.Mui-focused fieldset": {
                  borderColor: "#C57600", // Set the border color on focus here
                },
              },
            }}
            required
            placeholder="Search Restaurant"
            variant="outlined"
            id="address-input"
            InputProps={{
              startAdornment: (
                <InputAdornment>
                  <img src={searchLogo} alt="s-logo" />
                  &nbsp;&nbsp;
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment>
                  <img src={dashdot} alt="dash-logo" />
                  &nbsp;&nbsp;
                </InputAdornment>
              ),
            }}
            aria-describedby="outlined-weight-helper-text"
            inputProps={{
              "aria-label": "weight",
            }}
          />
        {/* Restaurants Near You text */}
        <Box>
          <Typography fontWeight={700} fontSize={"1.3em"}>
            Restaurants Near You{" "}
          </Typography>
        </Box>
        {/* Landmark Items Box */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "1em",
            paddingLeft: "0em",
          }}
        >
          {/* Array for the Skeleton */}
          {OTDRestaurants === null ? (
            Array.from({ length: 5 }).map((item, i) => {
              return (
                <Skeleton
                  key={i}
                  variant="rectangular"
                  width={"100%"}
                  height={200}
                />
              );
            })
          ) : OTDRestaurants?.length > 0 ? (
            OTDRestaurants?.map((item, i) => {
              return (
                <Card
                  onClick={() => handleClick(item.restaurant.id)}
                  key={i}
                  sx={{
                    padding: ".3em 0",
                    boxShadow:
                      " 0px 2px 1px -1px hsla(0, 0%, 0%, 0.05), 0px 1px 1px 0px hsla(0, 0%, 0%, 0.05), 0px 1px 3px 0px hsla(0, 0%, 0%, 0.05)",
                    height: "15vh",
                    display: "flex",
                  }}
                >
                  <Avatar
                    sx={{
                      width: "35%",
                      borderRadius: "4px 4px ",
                      height:'auto',
                    }}
                    variant="rounded"
                    alt="Menu Item Image"
                    src={item.image}
                  />

                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      height: "100%",
                      width: "100%",
                      position:'relative',
                      justifyContent:'center',
                      padding: " .5em",
                      gap:'.4em'
                    }}
                  >
                    <Typography
                      fontWeight={600}
                      fontSize={".9em"}
                      color={"hsla(0, 0%, 12%, 1)"}
                    >
                      {" "}
                      {item.restaurant.companyName}{" "}
                    </Typography>
                    <Box sx={{ display: "flex", alignItems:'center', gap: ".5em" }}>
                      <Avatar
                        sx={{ width: "15px", height: "13px" }}
                        src={clockIcon}
                      />
                      <Typography
                        sx={{
                          display: "flex",
                          gap: ".8em",
                          justifyContent: { xs: "space-between", md: "none" },
                          fontSize: "13px",
                        }}
                      >
                        {convertTo12HourFormat(item.openingTime) + "-" + convertTo12HourFormat(item.closingTime)}{" "}
                        <span
                          style={{
                            background: "hsla(120, 100%, 25%, 0.1)",
                            color: "var(--currency-green)",
                            padding: " 0 .4em",
                            position:'absolute',
                            right:'.5em',
                            height: "fit-content",
                            borderRadius: ".3em",
                            fontWeight: "600",
                          }}
                        >
                          {" "}
                          Open{" "}
                        </span>
                      </Typography>
                    </Box>
                    <Box sx={{ display: "flex", alignItems:'center',gap: ".5em" }}>
                      <Avatar
                        sx={{ width: "15px", height: "13px" }}
                        src={card2}
                      />
                      <Typography sx={{ fontSize: "13px" }}>
                        {" "}
                        ({
                          item?.data?.rows[0].elements[0]?.distance.text
                        } Away){" "}
                      </Typography>
                    </Box>
                    <Box sx={{ display: "flex",alignItems:'center', gap: ".5em" }}>
                      <Avatar
                        sx={{ width: "15px", height: "13px" }}
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
          ) : OTDRestaurants?.length === 0 ? (
            <Typography>
              {" "}
              No Restaurant within 20km available to you.{" "}
            </Typography>
          ) : null}
        </Box>
      </Container>
    </div>
  );
};
export default OTDMainPage;
