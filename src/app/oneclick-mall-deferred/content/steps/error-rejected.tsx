import { StepProps } from "@/components/step/Step";
import { SearchParams } from "@/types/general";
import { getStepOne } from "../snippets/error-aborted";
import {
  TBKAbortedResponse,
  TBKFinishInscriptionResponse,
} from "@/types/transactions";

export const getErrorRejectedSteps = (
  trxData: TBKFinishInscriptionResponse
): StepProps[] => {
  return [
    {
      stepTitle: "Paso 1: Datos Recibidos",
      code: getStepOne(trxData),
    },
    {
      stepTitle: "¡Listo!",
      content: `Con la respuesta en mano, ya puedes informar al usuario sobre el resultado de la transacción. En este caso, la transacción ha sido rechazada. Muestra un mensaje claro y proporciona instrucciones adicionales si es necesario.

Después de informar al usuario, se podrá realizar la consulta del estado hasta 7 días después de la transacción.`,
    },
  ];
};
