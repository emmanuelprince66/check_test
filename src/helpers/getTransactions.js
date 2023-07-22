import axios from "axios";

export const getTransactions = async (token) => {
  const url = `https://check-server-api-staging.herokuapp.com/api/v1/transaction/user`;
  const transaction = axios({
    url,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => res.data);

  return transaction;
};
