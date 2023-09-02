import axios from "axios";

export const getRestaurantCategory = async (id) => {
  const url = `https://check-server-api-staging.herokuapp.com/api/v1/category/restaurant/${id}?sortBy=ASC&limit=100`;
  const category = axios({
    url,
  }).then((res) => res.data);

  return category;
};
