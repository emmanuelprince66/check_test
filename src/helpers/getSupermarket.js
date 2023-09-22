import axios from "axios";
import { getCookie } from "../util/cookieAuth";
export const getSuperMarket = async (superMarketId) => {
  const token = getCookie("authToken");

  const url = `https://check-server-api-staging.herokuapp.com/api/v1/supermarket/${superMarketId}`;
  const superMarket = axios({
    url,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => res.data);

  return superMarket;
};
