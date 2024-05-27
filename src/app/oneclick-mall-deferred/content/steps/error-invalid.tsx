import { StepProps } from "@/components/step/Step";
import { SearchParams } from "@/types/general";
import { getStepOne } from "../snippets/error-aborted";
import { TBKAbortedResponse } from "@/types/transactions";

export const getErrorInvalidSteps = (
  parametersReceivedByTBK: SearchParams
): StepProps[] => {
  return [
    {
      code: getStepOne(parametersReceivedByTBK as TBKAbortedResponse),
    },
    {
      stepTitle: "Respuesta o pasos a seguir:",
      content:
        "Para evitar posibles problemas, recomendamos reiniciar la transacción y completar el proceso de pago en una sesión activa y continua. ",
    },
  ];
};
