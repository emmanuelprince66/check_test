import { useQuery } from "@tanstack/react-query";
import { getCookie } from "../util/cookieAuth";
import { getOrders } from "../helpers/getOrders";

export default function useOrders() {
  const token = getCookie("authToken");

  const fetcher = () => getOrders(token);

  const enabled = token !== undefined && token !== null;

  const orders = useQuery(["orders", token], fetcher, {
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
    refetchInterval: 50000,
  });

  return orders;
}
