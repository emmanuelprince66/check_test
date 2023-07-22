import { useQuery } from "@tanstack/react-query";
import { getSuperMarketP } from "../helpers/getSuperMarketP";

export default function useSuperMarketP(id, eAN) {
  const fetcher = () => getSuperMarketP(id, eAN);

  const enabled = id !== undefined && eAN !== null;

  const superMarketP = useQuery(["superMarketP", id, eAN], fetcher, {
    // refetchOnReconnect: false,
    // refetchOnWindowFocus: false,
    // refetchInterval: 50000,
  });

  return superMarketP;
}
