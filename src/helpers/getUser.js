import axios from "axios";

export const getUser = async (token) => {
  const url = `https://check-server-api-staging.herokuapp.com/api/v1/user`;
  const user = axios({
    url,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => res.data);

  return user;
};
