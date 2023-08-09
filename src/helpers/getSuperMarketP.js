import axios from "axios";
import { getCookie } from "../util/cookieAuth";

export const getSuperMarketP = async (eAN, companyName, companylocation) => {
  const token = getCookie("authToken");
  const url = `https://check-server-api-staging.herokuapp.com/api/v1/supermarket/${eAN}/${companyName}/${companylocation}`;
  const superMarketP = axios({
    url,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => res.data);

  return superMarketP;
};
