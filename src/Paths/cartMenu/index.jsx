import { useEffect } from "react";
import useMenu from "../../hooks/useMenu";
import BackArrow from "../../components/backArrow/BackArrow";
import { useState } from "react";
import { Box, TextField,List,Button, Grid, InputAdornment, Typography } from "@mui/material";
import "../../components/restaurant/restaurant.css";
import SearchIcon from "@mui/icons-material/Search";
import { useSelector } from "react-redux";
import useRestaurantCategory from "../../hooks/useRestaurantCategory";
import { setOrderCart } from "../../util/slice/merchantSlice";
import CartBox from "../../components/cartBox/cartBox";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
const RestaurantMenu = () => {
  const [id, setId] = useState(null);
  const [mode, setMode] = useState("eat-in");
  const [categoryInView, setCategoryInView] = useState(0);
  const [categoryNameInView, setCategoryNameInView] = useState('');
  const [filteredMenu, setFilteredMenu] = useState([]);
const dispatch =useDispatch()
  const {data:merchantDetails,orderInView,orderCart,totalAmount} = useSelector((state)=>state.merchantReducer)
  // console.log(merchantDetails.restaurant.id)
  useEffect(() => {
    // const id = JSON.parse(localStorage.getItem("myData")).id;
    // console.log(id);
    // setId(id);
  }, []);
  const menu = useMenu(merchantDetails?.restaurant?.id);
  const category = useRestaurantCategory(merchantDetails?.restaurant?.id);
  const navigate = useNavigate()

  useEffect(() => {
    const selectedCategoryName = category?.data?.categories[categoryInView]?.name;
  
    setCategoryNameInView(selectedCategoryName);
      // Filter menu items based on the selected category name
      const filteredResult = menu?.data?.menu.map(((order)=>{
        return { ...order, count:0 }
      }))
  if (categoryNameInView && orderCart.length === 0 ){
    setFilteredMenu(filteredResult)
    dispatch(setOrderCart(filteredResult));
  }
      // Dispatch the filtered results to the store
  }, [dispatch, categoryNameInView, categoryInView]);
    function checkCategory(i, name) {
    setCategoryInView((prevCategoryInView) => {
      if (prevCategoryInView !== i) {
        setCategoryNameInView(name);
      }
      return i;

    });
    
  }
  function handleSaveToCart(){
    navigate('/cart')
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
            padding:'.6px 0',
            '&:-webkit-scrollbar':{display:'none'},
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
        {orderCart?.map((item, i) => {
          return <CartBox key={i} category={categoryNameInView} itemInfo={item} id={orderInView} />;
        })}
      </Grid>

      <Box sx={{background:'var(--grey-cart-btn)', display:'flex',insetInline:'0', alignItems:'center',          width: { md: "33%", sm: "100%", xs: "100%" },
          position: "fixed",
          left: { xs: 0, sm: 0, md: "33.5%" },
          bottom: 0,
          height:'70px',
          fontSize: "10px",
          padding: "1rem",
 justifyContent:'space-between',}} bottom='0'  > 
      <Typography  sx={{fontWeight:'700',fontSize:'2em'}} >{totalAmount}</Typography>  
      <Button
      onClick={handleSaveToCart}
            sx={{
              backgroundColor: "#EB001B",
              height: "30px",
              color: "white",
              textTransform:'none',
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
