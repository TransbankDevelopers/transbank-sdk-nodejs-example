import { StepProps } from "@/components/step/Step";
import * as refundSnippets from "@/app/oneclick-mall/content/snippets/refund";
import { Text } from "@/components/text/Text";
import { TBKRefundMallTransactionResponse } from "@/types/transactions";

export const getRefundTRXSteps = (
  refundResult: TBKRefundMallTransactionResponse,
  amount: string,
  buyOrder: string
): StepProps[] => {
  return [
    {
      stepTitle: "Paso 1: Petición",
      content: (
        <div className="step-1">
          <Text>
            Para realizar el reembolso, necesitarás la siguiente información:
          </Text>
          <div>
            <Text>Algunas consideraciones a tener en cuenta:</Text>
            <ul className="list">
              <li>Orden de compra de la transacción.</li>
              <li>Monto que deseas reversar.</li>
              <li>Código de comercio de la tienda.</li>
              <li>Orden de compra del detalle de la transacción.</li>
            </ul>
            <div className="link-to-terms">
              <Text>
                Ten en cuenta que si anulas el monto total, puede ser una
                Reversa o Anulación, dependiendo de ciertas condiciones, o una
                Anulación parcial si el monto es menor al total. Las anulaciones
                parciales para tarjetas débito y prepago, no están soportadas
              </Text>
            </div>
          </div>
        </div>
      ),
      code: refundSnippets.getStepOne(buyOrder, amount),
    },
    {
      stepTitle: "Paso 2: Respuesta",
      content: (
        <Text>
          Transbank responderá con el resultado de la reversa o anulación.
          Analiza esta respuesta para confirmar que el reembolso se ha procesado
          correctamente.
        </Text>
      ),
      code: refundSnippets.getStepTwo(refundResult),
    },
    {
      stepTitle: "¡Listo!",
    },
  ];
};
