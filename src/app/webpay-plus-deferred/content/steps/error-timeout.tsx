import { StepProps } from "@/components/step/Step";
import * as timeoutSnippets from "@/app/webpay-plus/content/snippets/error-timeout";
import { Text } from "@/components/text/Text";
import { TBKTimeoutResponse } from "@/types/transactions";

export const getErrorTimeoutSteps = (
  timeoutResponse: TBKTimeoutResponse
): StepProps[] => {
  return [
    {
      stepTitle: "Datos Recibidos:",
      content: (
        <Text>
          Después de 10 minutos en el que no se haya recibido ninguna acción o
          interacción del usuario, recibirás un POST con la siguiente
          información:
        </Text>
      ),
      code: timeoutSnippets.getStepOne(timeoutResponse),
    },
  ];
};
