import { TBKRefundMallTransactionResponse } from "@/types/transactions";

export const getStepOne = (buyOrder: string, amount: string) => {
  return `// BuyOrder: ${buyOrder}
// Amount: ${amount}

const refundRequest = await (new Oneclick.MallTransaction()).refund(
  buyOrder,
  childCommerceCode,
  childBuyOrder,
  amount
);`;
};

export const getStepTwo = (refundResult: TBKRefundMallTransactionResponse) => {
  return JSON.stringify(refundResult, null, 2);
};
