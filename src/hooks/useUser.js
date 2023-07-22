import { useQuery } from "@tanstack/react-query";
import { getUser } from "../helpers/getUser";
import { getCookie } from "../util/cookieAuth";

export default function useUser() {
  const token = getCookie("authToken");

  const fetcher = () => getUser(token);

  const enabled = token !== undefined && token !== null;

  const user = useQuery(["user", token], fetcher, {
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
    refetchInterval: 50000,
  });

  return user;
}
