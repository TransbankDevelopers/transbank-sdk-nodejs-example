import { TBKRefundTransactionResponse } from "@/types/transactions";

export const getStepOne = (token: string, amount: number) => {
  return `// Token: ${token}
// Amount: ${amount}
const refundRequest = await (new TransaccionCompleta.Transaction()).refund(token, amount);
`;
};

export const getStepTwo = (refundResult: TBKRefundTransactionResponse) => {
  return JSON.stringify(refundResult, null, 2);
};
