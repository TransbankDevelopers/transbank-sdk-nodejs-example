import { TBKRefundMallTransactionResponse } from "@/types/transactions";

export const getStepOne = (token: string, amount: string) => {
  return `// Token: ${token}
// Amount: ${amount}
 
const refundRequest = await (new TransaccionCompleta.MallTransaction()).refund(
  token, buyOrder, commerceCode, amount
);`;
};

export const getStepTwo = (trxData: TBKRefundMallTransactionResponse) => {
  return JSON.stringify(trxData, null, 2);
};
