import {
  TBKAbortedResponse,
  TBKFinishInscriptionResponse,
} from "@/types/transactions";

export const getStepOne = (
  data: TBKAbortedResponse | TBKFinishInscriptionResponse
) => {
  return JSON.stringify(data, null, 2);
};
