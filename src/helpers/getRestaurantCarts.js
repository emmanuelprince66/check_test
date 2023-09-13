import axios from "axios";

export const getRestaurantOrders = async (token) => {
  const url = `https://check-server-api-staging.herokuapp.com/api/v1/cart/user?limit=50`;
  const orders = axios({
    url,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => res.data);

  return orders;
};
