import { useQuery } from "@tanstack/react-query";
import { getSuperMarket } from "../helpers/getSupermarket";

export default function useSuperMarket(superMarketId) {
  const fetcher = () => getSuperMarket(superMarketId);

  const enabled = superMarketId !== undefined && superMarketId !== null;

  const superMarket = useQuery(["superMarket", superMarketId], fetcher, {
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
    refetchInterval: 50000,
  });

  return superMarket;
}
