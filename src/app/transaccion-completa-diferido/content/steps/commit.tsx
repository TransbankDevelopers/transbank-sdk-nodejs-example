import { StepProps } from "@/components/step/Step";
import { TBKFullTxCommitResponse } from "@/types/transactions";
import * as commitSnippets from "@/app/transaccion-completa-diferido/content/snippets/commit";
import { OkCommitMessage } from "@/components/messages/OkCommitMessage";
import { OperationsCommitDeferredMessage } from "@/components/messages/OperationsCommitDeferredMessage";

export const getCommitSteps = (
  commitResponse: TBKFullTxCommitResponse
): StepProps[] => {
  return [
    {
      stepTitle: "Paso 1: Datos recibidos",
      stepId: "confirmar",
      content: (
        <p>
          Para confirmar la transacción, debes enviar el token correspondiente.
          En el caso de pagos a plazos, también debes incluir el ID de la
          consulta de cuotas. En algunos casos, será necesario proporcionar el
          índice del periodo diferido y un valor boolean indicando si se tomará
          el periodo de gracia.
        </p>
      ),
      code: commitSnippets.getStepOne(),
    },
    {
      stepTitle: "Paso 2: Petición",
      content: (
        <OkCommitMessage />
      ),
      code: commitSnippets.getStepTwo(commitResponse),
    },

    {
      stepTitle: "¡Transacción confirmada!",
      stepId: "confirm",
      content: (
        <OperationsCommitDeferredMessage />
      ),
    },
  ];
};
