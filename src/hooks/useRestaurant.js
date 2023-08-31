import { useQuery } from "@tanstack/react-query";
import { getRestaurant } from "../helpers/getRestaurant";

export default function useRestaurant(restaurantId) {
  const fetcher = () => getRestaurant(restaurantId);
  const enabled = restaurantId !== undefined && restaurantId !== null;

  const restaurant = useQuery(["restaurant", restaurantId], fetcher, {
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
    refetchInterval: 50000,
  });

  return restaurant;
}
