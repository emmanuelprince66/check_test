import { useEffect } from "react";
import useMenu from "../../hooks/useMenu";
import BackArrow from "../../components/backArrow/BackArrow";
import { useState } from "react";
import { Box, TextField,List,ListItem, Grid, InputAdornment } from "@mui/material";
import "../../components/restaurant/restaurant.css";
import SearchIcon from "@mui/icons-material/Search";
import { useSelector } from "react-redux";
import useRestaurantCategory from "../../hooks/useRestaurantCategory";
import CartBox from "../../components/cartBox/cartBox";
const RestaurantMenu = () => {
  const [id, setId] = useState(null);
  const [mode, setMode] = useState("eat-in");
  const [categoryInView, setCategoryInView] = useState(0);
  const [categoryNameInView, setCategoryNameInView] = useState();
  const [filteredMenu, setFilteredMenu] = useState([]);

  const merchantDetails = useSelector((state)=>state.merchantReducer.data)

  // console.log(merchantDetails.restaurant.id)
  useEffect(() => {
    // const id = JSON.parse(localStorage.getItem("myData")).id;
    // console.log(id);
    // setId(id);
  }, []);
  const menu = useMenu(merchantDetails?.restaurant?.id);
  const category = useRestaurantCategory(merchantDetails?.restaurant?.id);
  useEffect(() => {
    setCategoryNameInView(category?.data?.categories[categoryInView].name);
    let filteredResult = menu?.data?.menu.filter(
      (item) => item.category.name === categoryNameInView
    );
    setFilteredMenu(filteredResult);
  }, [menu, id, category, categoryNameInView, categoryInView]);
  function checkCategory(i, name) {
    setCategoryInView(i);
    setCategoryNameInView(name);
  }

  return (
    <div className="gpt3__restaurant">
      <Box display="flex" gap="1em">
        <BackArrow />
        <TextField
          label="Search Items"
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
      </Box>

      <Box display="flex" gap="1em" justifyContent="space-between">
        <span>Order 1</span>
        <div style={{}}>
          <span
            style={{
              width: "50%",
              color: mode === "eat-in" ? "white" : "black",
              backgroundColor:
                mode === "eat-in" ? "var(--cart-deep-red)" : "#EDEDED",
              padding: ".5em .8em",
              borderRadius: ".5em",
            }}
          >
            Eat-In
          </span>
          <span
            style={{
              color: mode === "eat-in" ? "black" : "white",
              backgroundColor:
                mode === "takeaway" ? "var(--cart-deep-red)" : "#EDEDED",
              padding: ".5em .8em",
              borderRadius: "0em .5em .5em 0",
            }}
          >
            {" "}
            Takeaway
          </span>
        </div>
      </Box>

      <Box>
        <List
          sx={{
            display: "flex",
            gap: "1em",
            padding:'.6px 0',
            '&:-webkit-scrollbar':{display:'none'},
            overflowX: "auto",
            borderBottom: "1px solid #EAEAEA",
          }}
        >
          {category?.data?.categories?.map((item, i) => {
            return (
              <li
                onClick={() => checkCategory(i, item.name)}
                style={{
                  whiteSpace: "noWrap",
                  cursor: "pointer",
                  listStyleType: " none",
                  color: categoryInView === i ? "var(--cart-deep-red)" : "",
                  borderBottom:
                    categoryInView === i
                      ? "1px solid var(--cart-deep-red)"
                      : "",
                  transition: "color 0.3s ease-in-out",
                }}
                key={i}
              >
                {item.name}
              </li>
            );
          })}
        </List>
      </Box>

      <Grid container justifyContent="space-between" rowGap="1em">
        {filteredMenu?.map((item, i) => {
          return <CartBox key={i} name={item.name} unitPrice={item.price} img={item.image} />;
        })}
      </Grid>
    </div>
  );
};
export default RestaurantMenu;
