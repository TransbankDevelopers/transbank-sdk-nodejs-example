import { StepProps } from "@/components/step/Step";
import { getStepOne } from "../snippets/error-aborted";
import { TBKFinishInscriptionResponse } from "@/types/transactions";

export const getErrorRejectedSteps = (
  trxData: TBKFinishInscriptionResponse
): StepProps[] => {
  return [
    {
      stepTitle: "Paso 1: Datos Recibidos",
      code: getStepOne(trxData),
    },
  ];
};
