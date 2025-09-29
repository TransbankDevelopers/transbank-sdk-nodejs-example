import { TBKRefundTransactionResponse } from "@/types/transactions";

export const getStepOne = (token: string, amount: number) => {
  return `// Token: ${token}
// Amount: ${amount}
const tx = new TransaccionCompleta.Transaction(new Options(
  IntegrationCommerceCodes.TRANSACCION_COMPLETA_DEFERRED,
  IntegrationApiKeys.WEBPAY,
  Environment.Integration
));

const refundRequest = await tx.refund(token, amount);
`;
};

export const getStepTwo = (refundResult: TBKRefundTransactionResponse) => {
  return JSON.stringify(refundResult, null, 2);
};
