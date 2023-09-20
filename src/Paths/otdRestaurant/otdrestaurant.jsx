import React from "react";
import { useParams } from "react-router-dom";
import { Container, Box, Button,Typography,Card, Avatar } from "@mui/material";
import { useSelector } from "react-redux";
import { getMenu } from "../../helpers/getMenu";
import useMenu from "../../hooks/useMenu";
import useRestaurant from "../../hooks/useRestaurant";
import Restaurant from "../../components/restaurant/index";
import clockIcon from "../../assets/clock.svg";
import card1 from "../../assets/Card/card1.svg";
import card2 from "../../assets/card2.svg";

const RestaurantPage = () => {
  const params = useParams();
  const { OTDRestaurants } = useSelector((state) => state.merchantReducer);
  const restaurant = OTDRestaurants?.find(
    (item) => item?.restaurant?.id == params.id
  );
  console.log(restaurant, params, OTDRestaurants);
  const menu = useMenu(params.id);
  console.log(menu.data, "menu gotten");
  return (
    <Container sx={{ padding: "0px",display:'flex',gap:'8em',flexDirection:'column' }}>
      
      <Box sx={{height:"20vh"}} >
      <Avatar
        sx={{
          width: "100%",
          height:'100%',
          borderRadius: "4px 4px 0 0",
          objectFit:'cover'
        }}
        variant="rounded"
        alt="Menu Item Image"
        src={restaurant?.image}
      />

      </Box>
              <Card    sx={{ padding: ".5em ",width:'90%',margin:' 0 auto', insetInline:'0', position:'absolute', top:'5em', display: "flex" }}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: ".5em",
                    padding: ".5em",
                  }}
                >
                  <Typography> {menu?.data?.companyName} </Typography>
                  <Box sx={{ display: "flex",gap:'.5em' }}>
                    <Avatar
                      sx={{ width: "20px", height: "20px" }}
                      src={clockIcon}
                    />
                    <Typography sx={{ fontSize: "13px" }}>
                    </Typography>
                  </Box>
                  <Box sx={{ display: "flex" ,gap:'.5em' }}>
                    <Avatar
                      sx={{ width: "20px", height: "20px" }}
                      src={card2}
                    />
                    <Typography sx={{ fontSize: "13px" }}></Typography>
                  </Box>
                  <Box sx={{ display: "flex",gap:'.5em' }}>
                    <Avatar
                      sx={{ width: "20px", height: "20px" }}
                      src={card1}
                    />
                    <Typography sx={{ fontSize: "13px" }}>
                      {" "}
                     Delivery Available
                    </Typography>
                  </Box>
                </Box>
              </Card>

      <Restaurant />
    </Container>
  );
};
export default RestaurantPage;
