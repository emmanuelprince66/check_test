import { useQuery } from "@tanstack/react-query";
import { getCookie } from "../util/cookieAuth";
import { getOTDRestaurants } from '../helpers/getRestaurantsOTD'

export default function useGetRestaurantsOTD() {
  const token = getCookie("authToken");

  const fetcher = () => getOTDRestaurants(token);

  const enabled = token !== undefined && token !== null;

  const orders = useQuery(["restaurantOTD", token], fetcher, {
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
    refetchInterval: 50000,
  });

  return orders;
}

