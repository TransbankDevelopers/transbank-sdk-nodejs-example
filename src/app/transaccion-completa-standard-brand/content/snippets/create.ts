export const getRequestSnippet = (payload: unknown) => {
  return `fetch("https://webpay3gint.transbank.cl/rswebpaytransaction/api/webpay/v1.4/transactions", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json",
    "Tbk-Api-Key-Id": "<API_KEY_ID>",
    "Tbk-Api-Key-Secret": "<API_KEY_SECRET>"
  },
  body: JSON.stringify(${JSON.stringify(payload, null, 2)})
});`;
};

export const getResponseSnippet = (response: unknown) => {
  return JSON.stringify(response, null, 2);
};
