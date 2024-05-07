import { StepProps } from "@/components/step/Step";
import * as refundSnippets from "@/helpers/webpay-plus/snippets/refund";
import { Text } from "@/components/text/Text";

export const getRefundTRXSteps = (): StepProps[] => {
  return [
    {
      stepTitle: "Paso 1: Petición",
      content: (
        <div className="flex flex-col gap-4">
          <Text>
            Para llevar a cabo el reembolso, necesitas proporcionar el token de
            la transacción y el monto que deseas reversar. Si anulas el monto
            total, podría ser una Reversa o Anulación, dependiendo de ciertas
            condiciones, o una Anulación Parcial si el monto es menor al total.
          </Text>
          <div>
            <Text>Algunas consideraciones a tener en cuenta:</Text>
            <ul className="list-disc px-4 text-base text-tbk-black-2">
              <li>
                No es posible realizar Anulaciones Parciales en pagos con
                cuotas.
              </li>
              <li>No se admiten reembolsos de compras en cuotas.</li>
            </ul>
            <div className="mt-4">
              <Text>
                En este link podrás ver mayor información sobre las condiciones
                y casos para anular o reversar transacciones.{" "}
              </Text>
            </div>
          </div>
        </div>
      ),
      code: refundSnippets.getStepOne(),
    },
    {
      stepTitle: "Paso 2: Respuesta",
      content: (
        <Text>
          Transbank responderá con el resultado del proceso de reembolso,
          indicando si se ha realizado una Reversa, Anulación o Anulación
          Parcial.
        </Text>
      ),
      code: refundSnippets.getStepTwo(),
    },
  ];
};
