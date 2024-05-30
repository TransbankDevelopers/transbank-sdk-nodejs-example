import { StepProps } from "@/components/step/Step";
import { Text } from "@/components/text/Text";
import * as refundSnippets from "../snippets/refund";
import { TBKRefundMallTransactionResponse } from "@/types/transactions";

export const getRefundSteps = (
  token: string,
  amount: string,
  trxData: TBKRefundMallTransactionResponse
): StepProps[] => {
  return [
    {
      stepTitle: "Paso 1: Petición",
      stepId: "peticion",
      content: (
        <Text>
          Necesitas el token de la transacción y el monto que quieres reversar,
          si anulas el monto total puede ser una Reversa o Anulación dependiendo
          de ciertas condiciones o una Anulación parcial si el monto es menor al
          total. No es posible hacer ni Anulaciones ni Anulaciones parciales en
          tarjetas que no sean de crédito. Tampoco es posible realizar
          reembolsos de compras en cuotas.
        </Text>
      ),
      code: refundSnippets.getStepOne(token, amount),
    },
    {
      stepTitle: "Paso 2: Respuesta",
      stepId: "respuesta",
      content: (
        <Text>
          Transbank contestará con el resultado de la reversa o anulación.
        </Text>
      ),
      code: refundSnippets.getStepTwo(trxData),
    },
    {
      content: (
        <Text>
          Este proceso te proporcionará una manera segura y eficiente de manejar
          las solicitudes de reembolso.
        </Text>
      ),
    },
  ];
};
