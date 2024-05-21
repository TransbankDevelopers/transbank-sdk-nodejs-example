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
          recibirás un POST con la siguiente información:
        </Text>
      ),
      code: abortedSnippets.getStepOne(abortedResponse),
    },
    {
      stepTitle: "Otras Utilidades",
      content: (
        <Text>
          Tras la anulación de la compra, solo podrás consultar el estado de la
          transacción en los próximos 7 días después de su realización.
          Asegúrate de realizar las consultas dentro de este período.
        </Text>
      ),
    },
  ];
};
