import { TBKMallTransactionStatusResponse } from "@/types/transactions";

export const getStepOne = (buyOrder: string) => {
  return `const buyOrder = "${buyOrder}";
const tx = new Oneclick.MallTransaction(new Options(
  "597060000001", // Código de comercio
  "d8f06df8-39c7-4f01-8e74-b383c19ae836", // API Key
  Environment.Integration
));
const statusResponse = await tx.status(buyOrder);`;
};

export const getStepTwo = (statusResponse: TBKMallTransactionStatusResponse) =>
  JSON.stringify(statusResponse, null, 2);
