import axios from "axios";

export const getOTDRestaurants = async () => {
  const url = `https://check-server-api-staging.herokuapp.com/api/v1/otd`;
  const response = axios({
    url,
  }).then((res) => res.data);

  return response;
};
