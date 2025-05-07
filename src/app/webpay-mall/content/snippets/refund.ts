import { TBKRefundTransactionResponse } from "@/types/transactions";

export const getStepOne = (amount: string) => {
  return `// Token: 01ab8fb16e5dee67fcc392b97d679a01d29b77b4cd8b9ee6ade278203feee1b4
// Amount: ${amount}
const tx = new WebpayPlus.MallTransaction(new Options(
  IntegrationCommerceCodes.WEBPAY_PLUS_MALL,
  IntegrationApiKeys.WEBPAY,
  Environment.Integration
));
const refundRequest = await tx.refund(
  token,
  buyOrder,
  commerceCode,
  amount
);`;
};

export const getStepTwo = (refundResult: TBKRefundTransactionResponse) => {
  return JSON.stringify(refundResult, null, 2);
};
