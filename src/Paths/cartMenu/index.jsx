import { useEffect } from "react";
import useMenu from "../../hooks/useMenu";
import BackArrow from "../../components/backArrow/BackArrow";
import { useState } from "react";
import {
  Box,
  TextField,
  List,
  Button,
  Grid,
  InputAdornment,
  Skeleton,
  Typography,
} from "@mui/material";
import "../../components/restaurant/restaurant.css";
import SearchIcon from "@mui/icons-material/Search";
import { useSelector } from "react-redux";
import useRestaurantCategory from "../../hooks/useRestaurantCategory";
import {
  setOrderCart,
  setCategoryNameInView,
} from "../../util/slice/merchantSlice";
import CartBox from "../../components/cartBox/cartBox";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
const RestaurantMenu = () => {
  const [id, setId] = useState(null);
  const [mode, setMode] = useState("eat-in");
  const [categoryInView, setCategoryInView] = useState(0);
  const dispatch = useDispatch();
  const {
    data: merchantDetails,
    categoryNameInView,
    orderInView,
    orderCart,
    totalAmount,
  } = useSelector((state) => state.merchantReducer);
  // console.log(merchantDetails.restaurant.id)
  const menu = useMenu(10);
  const category = useRestaurantCategory(10);
  const navigate = useNavigate();

  useEffect(() => {
    const filteredResult = menu?.data?.menu?.map((order) => {
      return { ...order, count: 0 };
    });
    if (!orderCart || orderCart.length === 0) {
      dispatch(setOrderCart(filteredResult));
    }
  }, [orderCart, dispatch, menu?.data?.menu]);

  useEffect(() => {
    const selectedCategoryName =
      category?.data?.categories[categoryInView]?.name;
    console.log(categoryNameInView);

    console.log(orderCart);
    dispatch(setCategoryNameInView(selectedCategoryName));
  }, [category, orderCart, dispatch, categoryInView, categoryNameInView]);

  function checkCategory(i, name) {
    dispatch(setCategoryNameInView(name));
    setCategoryInView(i);
  }
  function handleSaveToCart() {
    navigate("/cart");
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
        <span>Order {orderInView}</span>
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
            padding: ".6px 0",
            "&:-webkit-scrollbar": { display: "none" },
            overflowX: "scroll",
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
        {!orderCart ? (
          <Skeleton variant="rectangular" width={210} height={118} />
        ) : (
          orderCart?.map((item, i) => {
            return (
              <CartBox
                key={i}
                category={categoryNameInView}
                itemInfo={item}
                id={orderInView}
              />
            );
          })
        )}
      </Grid>

      <Box
        sx={{
          background: "var(--grey-cart-btn)",
          display: "flex",
          insetInline: "0",
          alignItems: "center",
          width: { md: "33%", sm: "100%", xs: "100%" },
          position: "fixed",
          left: { xs: 0, sm: 0, md: "33.5%" },
          bottom: 0,
          height: "70px",
          fontSize: "10px",
          padding: "1rem",
          justifyContent: "space-between",
        }}
        bottom="0"
      >
        <Typography sx={{ fontWeight: "700", fontSize: "2em" }}>
          {totalAmount}
        </Typography>
        <Button
          onClick={handleSaveToCart}
          sx={{
            backgroundColor: "#EB001B",
            height: "30px",
            color: "white",
            textTransform: "none",
            "&:hover": { backgroundColor: "#EB001B" },
            width: "100px",
            minWidth: "auto",
          }}
        >
          {" "}
          Save{" "}
        </Button>
      </Box>
    </div>
  );
};
export default RestaurantMenu;
