import { TBKMallTimeoutResponse } from "@/types/transactions";

export const getStepOne = (data: TBKMallTimeoutResponse) => {
  return JSON.stringify(data, null, 2);
};
