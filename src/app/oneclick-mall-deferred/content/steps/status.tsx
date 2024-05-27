import { StepProps } from "@/components/step/Step";
import { TBKMallTransactionStatusResponse } from "@/types/transactions";
import * as statusSnippets from "@/app/oneclick-mall/content/snippets/status";
import { Text } from "@/components/text/Text";

export const getStatusTRXSteps = (
  buyOrder: string,
  trxData: TBKMallTransactionStatusResponse
): StepProps[] => {
  return [
    {
      stepTitle: "Paso 1: Petición",
      stepId: "peticion",
      content: (
        <Text>
          Para realizar la consulta, necesitarás el &quot;buy_order&quot; de la
          transacción de interés. Utiliza este identificador para efectuar una
          llamada a Oneclick.MallTransaction.
        </Text>
      ),
      code: statusSnippets.getStepOne(buyOrder),
    },
    {
      stepTitle: "Paso 2: Respuesta",
      stepId: "respuesta",
      content: (
        <Text>
          Transbank responderá con la siguiente información. Asegúrate de
          guardar estos detalles; lo único que necesitas validar es que el campo
          &quot;response_code&quot; sea igual a cero.
        </Text>
      ),
      code: statusSnippets.getStepTwo(trxData),
    },
    {
      stepTitle: "¡Listo!",
    },
  ];
};
