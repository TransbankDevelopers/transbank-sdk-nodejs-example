import { TBKInstallmentsFullTransactionResponse } from "@/types/transactions";

export const getStepOne = () => {
  return `const payload = {
  buy_order: buyOrder,
  commerce_code: commerceCode,
  installments_number: installmentsNumber,
};

const response = await fetch(
  "https://web1qa.test.transbank.cl:5443/rswebpaytransaction/api/webpay/v1.4/transactions/{token}/installments",
  {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ payload }),
  }
);

const installmentsResponse = await response.json();`;
};

export const getStepTwo = (trxData: TBKInstallmentsFullTransactionResponse) => {
  return JSON.stringify(trxData, null, 2);
};
