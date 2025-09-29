import { TBKRefundTransactionResponse } from "@/types/transactions";

export const getStepOne = (amount: string, token_ws: string) => {
  return `// Token: ${token_ws}
// Amount: ${amount}
const tx = new WebpayPlus.MallTransaction(new Options(
  IntegrationCommerceCodes.WEBPAY_PLUS_MALL_DEFERRED, // Código de comercio Mall
  IntegrationApiKeys.WEBPAY,
  Environment.Integration
));

const refundRequest = await tx.refund(
  token,
  buyOrderStore,
  commerceCodeStore, // Código de comercio Tienda
  amount
);`;
};

export const getStepTwo = (refundResult: TBKRefundTransactionResponse) => {
  return JSON.stringify(refundResult, null, 2);
};
