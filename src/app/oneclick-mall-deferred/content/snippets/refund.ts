import { TBKRefundMallTransactionResponse } from "@/types/transactions";

export const getStepOne = (buyOrder: string, amount: string) => {
  return `// BuyOrder: ${buyOrder}
// Amount: ${amount}

const tx = new Oneclick.MallTransaction(new Options(
  IntegrationCommerceCodes.ONECLICK_MALL_DEFERRED,
  IntegrationApiKeys.WEBPAY,
  Environment.Integration
));

const refundRequest = await tx.refund(
  buyOrder,
  commerceCodeStore,
  buyOrderStore,
  amount
);`;
};

export const getStepTwo = (refundResult: TBKRefundMallTransactionResponse) => {
  return JSON.stringify(refundResult, null, 2);
};
