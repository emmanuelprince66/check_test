import { useQuery } from "@tanstack/react-query";
import { getSuperMarketP } from "../helpers/getSuperMarketP";

export default function useSuperMarketP(
  eAN,
  companyName,
  companylocation,
  onSucess,
  onError
) {
  const fetcher = () => getSuperMarketP(eAN, companyName, companylocation);

  const enabled = eAN !== undefined && eAN !== null && eAN.trim() !== "";

  const superMarketP = useQuery(
    ["superMarketP", eAN, companyName, companylocation],
    fetcher,
    {
      enabled,
      retry: 3,
      refetchOnWindowFocus: false,
      onSuccess(data) {
        onSucess(data);
      },
      onError(err) {
        onError(err);
      },
    }
  );

  return superMarketP;
}
