import { TBKTimeoutResponse } from "@/types/transactions";

export const getStepOne = (data: TBKTimeoutResponse) => {
  return JSON.stringify(data, null, 2);
};
