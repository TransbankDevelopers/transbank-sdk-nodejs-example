import { TBKMallTransactionStatusResponse } from "@/types/transactions";

export const getStepOne = (buyOrder: string) => {
  return `const buyOrder = "${buyOrder}";

const tx = new Oneclick.MallTransaction(new Options(
  IntegrationCommerceCodes.ONECLICK_MALL_DEFERRED, // Código de comercio Mall
  IntegrationApiKeys.WEBPAY,
  Environment.Integration
));

const statusResponse = await tx.status(buyOrder);`;
};

export const getStepTwo = (statusResponse: TBKMallTransactionStatusResponse) =>
  JSON.stringify(statusResponse, null, 2);
