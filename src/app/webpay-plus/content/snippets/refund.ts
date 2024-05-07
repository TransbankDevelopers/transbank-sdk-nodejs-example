import { TBKRefundTransactionResponse } from "@/types/transactions";

export const getStepOne = () => {
  return `// Token: 01ab8fb16e5dee67fcc392b97d679a01d29b77b4cd8b9ee6ade278203feee1b4
// Amount: 1421
const refundRequest = await (new WebpayPlus.Transaction()).refund(token, amount);`;
};

export const getStepTwo = (refundResult: TBKRefundTransactionResponse) => {
  return JSON.stringify(refundResult, null, 2);
};
