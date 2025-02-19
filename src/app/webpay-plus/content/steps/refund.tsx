import { StepProps } from "@/components/step/Step";
import * as refundSnippets from "@/app/webpay-plus/content/snippets/refund";
import { Text } from "@/components/text/Text";
import { TBKRefundTransactionResponse } from "@/types/transactions";
import Link from "next/link";

export const getRefundTRXSteps = (
  refundResult: TBKRefundTransactionResponse,
  amount: string
): StepProps[] => {
  return [
    {
      stepTitle: "Paso 1: Petición",
      content: (
        <div className="step-1">
          <Text>
            Para llevar a cabo el reembolso, necesitas proporcionar el token de
            la transacción y el monto que deseas reversar. Si anulas el monto
            total, podría ser una Reversa o Anulación, dependiendo de ciertas
            condiciones, o una Anulación Parcial si el monto es menor al total.
          </Text>
          <div>
            <Text>Algunas consideraciones a tener en cuenta:</Text>
            <ul className="list">
              <li>
                No es posible realizar Anulaciones Parciales en pagos con
                cuotas.
              </li>
            </ul>
            <div className="link-to-terms">
              <Text>
                En{" "}
                <Link
                  className="tbk-link tbk-link-alt"
                  href="https://transbankdevelopers.cl/producto/webpay#anulaciones-y-reversas"
                >
                  este link
                </Link>{" "}
                podrás ver mayor información sobre las condiciones y casos para
                anular o reversar transacciones.{" "}
              </Text>
            </div>
          </div>
        </div>
      ),
      code: refundSnippets.getStepOne(amount),
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
      code: refundSnippets.getStepTwo(refundResult),
    },
  ];
};
