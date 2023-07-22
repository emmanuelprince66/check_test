import axios from "axios";

export const getSuperMarket = async (superMarketId) => {
  const url = `https://check-server-api-staging.herokuapp.com/api/v1/supermarket/${superMarketId}`;
  const superMarket = axios({
    url,
  }).then((res) => res.data);

  return superMarket;
};
