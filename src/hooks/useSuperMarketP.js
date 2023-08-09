import { useQuery } from "@tanstack/react-query";
import { getSuperMarketP } from "../helpers/getSuperMarketP";

export default function useSuperMarketP(eAN, companyName, companylocation) {
  const fetcher = () => getSuperMarketP(eAN, companyName, companylocation);

  const enabled = eAN !== undefined && eAN !== null;

  const superMarketP = useQuery(
    ["superMarketP", eAN, companyName, companylocation],
    fetcher,
    {
      // refetchOnReconnect: false,
      // refetchOnWindowFocus: false,
      // refetchInterval: 50000,
    }
  );

  return superMarketP;
}
