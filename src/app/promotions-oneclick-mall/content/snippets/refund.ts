import { TBKRefundMallTransactionResponse } from "@/types/transactions";

export const getStepOne = (buyOrder: string, amount: string) => {
  return `// BuyOrder: ${buyOrder}
// Amount: ${amount}

const tx = new Oneclick.MallTransaction(new Options(
  "597060000001", // Código de comercio
  "d8f06df8-39c7-4f01-8e74-b383c19ae836", // API Key
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
