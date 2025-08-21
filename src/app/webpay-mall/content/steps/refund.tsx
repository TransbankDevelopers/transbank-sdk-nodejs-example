import { StepProps } from "@/components/step/Step";
import * as refundSnippets from "@/app/webpay-mall/content/snippets/refund";
import { Text } from "@/components/text/Text";
import { TBKRefundTransactionResponse } from "@/types/transactions";

export const getRefundTRXSteps = (
  refundResult: TBKRefundTransactionResponse,
  amount: string,
  token_ws: string
): StepProps[] => {
  return [
    {
      stepTitle: "Paso 1: Petición",
      content: (
        <div className="step-1">
          <Text>
            Para llevar a cabo el reembolso, necesitas proporcionar el token de
            la transacción, el monto que quieres reversar, el código de comercio
            de la tienda y la orden de compra del detalle de la transacción. Si
            anulas el monto total, podría ser una Reversa o Anulación,
            dependiendo de ciertas condiciones (Reversa en las primeras 3 horas
            de la autorización, anulación posterior a eso), o una Anulación
            Parcial si el monto es menor al total.
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
                En este{" "}
                <a
                  className="tbk-link"
                  href="https://www.transbankdevelopers.cl/producto/webpay#anulaciones-y-reversas"
                  target="_blank"
                >
                  link
                </a>{" "}
                podrás ver mayor información sobre las condiciones y casos para
                anular o reversar transacciones.
              </Text>
            </div>
          </div>
        </div>
      ),
      code: refundSnippets.getStepOne(amount, token_ws),
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
