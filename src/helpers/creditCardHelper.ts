export type CardExpiry = {
  month: string;
  year: string;
};

export const getCardExpiry = (expiry: string): CardExpiry => {
  if (expiry.includes("/")) {
    const [month, year] = expiry.split("/");
    return {
      month: month.padStart(2, "0"),
      year: year.padStart(2, "0"),
    };
  }
  return {
    month: expiry.slice(0, 2),
    year: expiry.slice(2),
  };
};
