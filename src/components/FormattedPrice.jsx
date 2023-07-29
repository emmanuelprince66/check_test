import React from "react";

const formattedMoney = (amount) => {
  const formatter = new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 2,
  });

  const formatted = formatter.format(amount);

  return formatted;
};

const FormattedPrice = ({ amount }) => {
  return <div>{formattedMoney(amount)}</div>;
};

export default FormattedPrice;
