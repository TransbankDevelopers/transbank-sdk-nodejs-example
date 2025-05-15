import { TBKRefundMallTransactionResponse } from "@/types/transactions";

export const getStepOne = (token: string, amount: string) => {
  return `// Token: ${token}
// Amount: ${amount}

const tx = new TransaccionCompleta.MallTransaction(new Options(
  IntegrationCommerceCodes.TRANSACCION_COMPLETA_MALL, // Código de comercio Mall
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

export const getStepTwo = (trxData: TBKRefundMallTransactionResponse) => {
  return JSON.stringify(trxData, null, 2);
};
