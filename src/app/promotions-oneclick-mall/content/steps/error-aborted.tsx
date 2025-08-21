import { StepProps } from "@/components/step/Step";
import * as abortedSnippets from "@/app/webpay-plus/content/snippets/error-aborted";
import { Text } from "@/components/text/Text";
import { TBKAbortedResponse } from "@/types/transactions";

export const getErrorAbortedSteps = (
  abortedResponse: TBKAbortedResponse
): StepProps[] => {
  return [
    {
      stepTitle: "Datos Recibidos:",
      content: (
        <Text>
          Después de que el usuario anule la compra en el formulario de pago,
          recibirás un GET con la siguiente información:
        </Text>
      ),
      code: abortedSnippets.getStepOne(abortedResponse),
    },
    {
      stepTitle: "¡Se abandonó la inscripción!",
      content: (
        <Text>
          Este mensaje indica que la inscripción ha sido cancelada por decisión
          del usuario. Si tienes alguna pregunta o necesitas asistencia, no
          dudes en contactarnos. Lamentamos cualquier inconveniente y
          agradecemos tu comprensión.
        </Text>
      ),
    },
  ];
};
