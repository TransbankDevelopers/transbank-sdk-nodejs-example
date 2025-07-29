import { TBKRefundMallTransactionResponse } from "@/types/transactions";

export const getStepOne = (buyOrder: string, amount: string) => {
  return `// BuyOrder: ${buyOrder}
// Amount: ${amount}

const tx = new Oneclick.MallTransaction(new Options(
  IntegrationCommerceCodes.ONECLICK_MALL, // Código de comercio Mall
  IntegrationApiKeys.WEBPAY,
  Environment.Integration
));

const refundRequest = await tx.refund(
  buyOrder,
  commerceCodeStore, // Código de comercio Tienda
  buyOrderStore,
  amount
);`;
};

export const getStepTwo = (refundResult: TBKRefundMallTransactionResponse) => {
  return JSON.stringify(refundResult, null, 2);
};
