import { TBKMallCommitTransactionSBResponse } from "@/types/transactions";

export const getStepOne = () => {
  return `const payload = {
  details: [
    {
      commerce_code: commerceCode,
      buy_order: buyOrder,
      id_query_installments,
    }
  ]
};

const response = await fetch(
  "https://webpay3gint.transbank.cl/rswebpaytransaction/api/webpay/v1.4/transactions/{token}",
  {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ payload }),
  }
);

const commitResponse = await response.json();`;
};

export const getStepTwo = (trxData: TBKMallCommitTransactionSBResponse) => {
  return JSON.stringify(trxData, null, 2);
};
