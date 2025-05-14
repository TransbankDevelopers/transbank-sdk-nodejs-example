import { StepProps } from "@/components/step/Step";
import {
  TBKCommitTransactionResponse,
  TBKTransactionStatus,
} from "@/types/transactions";
import * as commitSnippets from "@/app/webpay-plus-deferred/content/snippets/commit";
import { Text } from "@/components/text/Text";
import { OkCommitMessage } from "@/components/messages/OkCommitMessage";
import { OperationsCommitDeferredMessage } from "@/components/messages/OperationsCommitDeferredMessage";

export const getCommitSteps = (
  token: string,
  commitResponse: TBKCommitTransactionResponse
): StepProps[] => {
  const steps: StepProps[] = [
    {
      stepTitle: "Paso 1: Datos recibidos",
      content: (
        <Text>
          Después de completar el flujo en el formulario de pago, recibirás un
          GET con la siguiente información:
        </Text>
      ),
      code: commitSnippets.getStepOne(token),
    },
    {
      stepTitle: "Paso 2: Petición",
      content: (
        <Text>
          Utilizarás el token recibido para confirmar la transacción mediante el
          SDK.
        </Text>
      ),
      code: commitSnippets.getStepTwo(),
    },
    {
      stepTitle: "Paso 3: Respuesta",
      content: (
        <OkCommitMessage />
      ),
      code: commitSnippets.getStepThree(commitResponse),
    },
  ];

  if (commitResponse.status === TBKTransactionStatus.AUTHORIZED) {
    steps.push({
      stepTitle: "¡Transaccion Confirmada!",
      content: (
        <OperationsCommitDeferredMessage />
      ),
    });
  }

  return steps;
};
