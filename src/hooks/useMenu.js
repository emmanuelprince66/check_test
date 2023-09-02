import { useQuery } from "@tanstack/react-query";
import { getMenu } from "../helpers/getMenu";

export default function useMenu(MenuId) {
  const fetcher = () => getMenu(MenuId);
  const enabled = MenuId !== undefined && MenuId !== null;

  const Menu = useQuery(["Menu", MenuId], fetcher, {
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
    refetchInterval: 50000,
  });

  return Menu;
}
