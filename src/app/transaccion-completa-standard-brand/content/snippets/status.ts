export const getStepOne = (token: string) => {
  return `// Token: ${token}
const response = await fetch(
  "https://webpay3gint.transbank.cl/rswebpaytransaction/api/webpay/v1.4/transactions/${token}",
  {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
      "Tbk-Api-Key-Id": "<API_KEY_ID>",
      "Tbk-Api-Key-Secret": "<API_KEY_SECRET>"
    }
  }
);

const statusResponse = await response.json();`;
};

export const getStepTwo = (statusResponse: unknown) => {
  return JSON.stringify(statusResponse, null, 2);
};
