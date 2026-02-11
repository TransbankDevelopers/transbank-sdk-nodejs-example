import { TBKRefundMallTransactionResponse } from "@/types/transactions";

export const getStepOne = (token: string, amount: string) => {
  return `// Token: ${token}
// Amount: ${amount}
const response = await fetch(
  "https://web1qa.test.transbank.cl:5443/rswebpaytransaction/api/webpay/v1.4/transactions/{token}/refunds",
  {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      token,
      buy_order: buyOrder,
      commerce_code: commerceCode,
      amount,
    }),
  }
);

const refundResponse = await response.json();`;
};

export const getStepTwo = (refundResult: TBKRefundMallTransactionResponse) => {
  return JSON.stringify(refundResult, null, 2);
};
