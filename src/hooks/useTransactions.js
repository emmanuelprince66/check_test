import { useQuery } from "@tanstack/react-query";
import { getCookie } from "../util/cookieAuth";
import { getTransactions } from "../helpers/getTransactions";

export default function useTransactions() {
  const token = getCookie("authToken");

  const fetcher = () => getTransactions(token);

  const enabled = token !== undefined && token !== null;

  const transaction = useQuery(["transactions", token], fetcher, {
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
    refetchInterval: 50000,
  });

  return transaction;
}
