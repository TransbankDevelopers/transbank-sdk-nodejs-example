import { TBKMallTransactionStatusResponse } from "@/types/transactions";

export const getStepOne = (token: string) => {
  return `// Token: ${token}
const statusResponse = await (new TransaccionCompleta.MallTransaction()).status(token);`;
};

export const getStepTwo = (statusResponse: TBKMallTransactionStatusResponse) =>
  JSON.stringify(statusResponse, null, 2);
