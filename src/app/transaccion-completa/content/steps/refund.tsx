import { StepProps } from "@/components/step/Step";
import * as refundSnippets from "@/app/transaccion-completa/content/snippets/refund";
import { TBKRefundTransactionResponse } from "@/types/transactions";

export const getRefundTRXSteps = (
  token: string,
  amount: number,
  refundResult: TBKRefundTransactionResponse
): StepProps[] => {
  return [
    {
      stepTitle: "Paso 1: Petición",
      stepId: "peticion",
      content: (
        <div className="step-1">
          <p>
            Para efectuar la solicitud de reembolso, necesitarás el token de la
            transacción y el monto que deseas reversar. Si decides anular el
            monto total, puede resultar en una Reversa o Anulación, según
            ciertas condiciones. En caso de un monto menor al total, se
            realizará una Anulación parcial. Las anulaciones parciales para
            tarjetas débito y prepago no están soportadas.
          </p>

          <div className="link-to-terms">
            <p>
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
            </p>
          </div>
        </div>
      ),
      code: refundSnippets.getStepOne(token, amount),
    },
    {
      stepTitle: "Paso 2: Respuesta",
      stepId: "respuesta",

      content: (
        <p>
          Transbank responderá con el resultado de la reversa o anulación.
          Evalúa cuidadosamente esta respuesta para confirmar que el reembolso
          se haya procesado de manera efectiva.
        </p>
      ),
      code: refundSnippets.getStepTwo(refundResult),
    },
  ];
};
