import { TBKRefundMallTransactionResponse } from "@/types/transactions";

export const getStepOne = (token: string, amount: string) => {
  return `// Token: ${token}
// Amount: ${amount}
const tx = new TransaccionCompleta.MallTransaction(new Options(
  IntegrationCommerceCodes.TRANSACCION_COMPLETA_MALL_DEFERRED,
  IntegrationApiKeys.WEBPAY,
  Environment.Integration
));

const refundRequest = await tx.refund(
  token, buyOrder, commerceCode, amount
);`;
};

export const getStepTwo = (trxData: TBKRefundMallTransactionResponse) => {
  return JSON.stringify(trxData, null, 2);
};
