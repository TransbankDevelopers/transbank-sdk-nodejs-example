import { TBKRefundTransactionResponse } from "@/types/transactions";

export const getStepOne = (amount: string, token_ws: string) => {
  return `// Token: ${token_ws}
// Amount: ${amount}
const tx = new WebpayPlus.Transaction(new Options(
  IntegrationCommerceCodes.WEBPAY_PLUS,
  IntegrationApiKeys.WEBPAY,
  Environment.Integration
));
const refundRequest = await tx.refund(token, amount);`;
};

export const getStepTwo = (refundResult: TBKRefundTransactionResponse) => {
  return JSON.stringify(refundResult, null, 2);
};
