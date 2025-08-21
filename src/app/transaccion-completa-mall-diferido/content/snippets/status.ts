import { TBKMallTransactionStatusResponse } from "@/types/transactions";

export const getStepOne = (token: string) => {
  return `// Token: ${token}
const tx = new TransaccionCompleta.MallTransaction(new Options(
  IntegrationCommerceCodes.TRANSACCION_COMPLETA_MALL_DEFERRED, // Código de comercio Mall
  IntegrationApiKeys.WEBPAY,
  Environment.Integration
));

const statusResponse = await tx.status(token);`;
};

export const getStepTwo = (statusResponse: TBKMallTransactionStatusResponse) =>
  JSON.stringify(statusResponse, null, 2);
