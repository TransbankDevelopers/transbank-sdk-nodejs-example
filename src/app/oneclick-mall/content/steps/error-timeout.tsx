import { StepProps } from "@/components/step/Step";
import * as timeoutSnippets from "@/app/oneclick-mall/content/snippets/error-timeout";
import { Text } from "@/components/text/Text";
import { TBKMallTimeoutResponse } from "@/types/transactions";

export const getErrorTimeoutSteps = (
  timeoutResponse: TBKMallTimeoutResponse
): StepProps[] => {
  return [
    {
      stepTitle: "Datos Recibidos:",
      content: (
        <Text>
          Después de 10 minutos en el que no se haya recibido ninguna acción o
          interacción del usuario, recibirás un GET con la siguiente
          información:
        </Text>
      ),
      code: timeoutSnippets.getStepOne(timeoutResponse),
    },
  ];
};
