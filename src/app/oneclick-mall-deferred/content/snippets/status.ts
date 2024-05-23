import { TBKMallTransactionStatusResponse } from "@/types/transactions";

export const getStepOne = (buyOrder: string) => {
  return `// BuyOrder: 
const buyOrder = "${buyOrder}";
const statusResponse = await (new Oneclick.MallTransaction()).status(buyOrder);`;
};

export const getStepTwo = (statusResponse: TBKMallTransactionStatusResponse) =>
  JSON.stringify(statusResponse, null, 2);
