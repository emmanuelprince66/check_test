import { useQuery } from "@tanstack/react-query";
import { getCookie } from "../util/cookieAuth";
import { getRestaurantOrders } from "../helpers/getRestaurantCarts";

export default function useRestaurantOrders() {
  const token = getCookie("authToken");

  const fetcher = () => getRestaurantOrders(token);

  const enabled = token !== undefined && token !== null;

  const orders = useQuery(["restaurantOrders", token], fetcher, {
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
    refetchInterval: 50000,
  });

  return orders;
}
