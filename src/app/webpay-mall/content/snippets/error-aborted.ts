import { TBKAbortedResponse } from "@/types/transactions";

export const getStepOne = (data: TBKAbortedResponse) => {
  return JSON.stringify(data, null, 2);
};
