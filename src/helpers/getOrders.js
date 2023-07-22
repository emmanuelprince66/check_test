import axios from "axios";

export const getOrders = async (token) => {
  const url = `https://check-server-api-staging.herokuapp.com/api/v1/cart-supermarket/user`;
  const orders = axios({
    url,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => res.data);

  return orders;
};
