import { StepProps } from "@/components/step/Step";
import { Text } from "@/components/text/Text"; 
import * as commitSnippets from "../snippets/commit";
import { TBKMallCommitTransactionResponse } from "@/types/transactions";
import { OkCommitMessage } from "@/components/messages/OkCommitMessage";
import { OtherOperationsCommitMessage } from "@/components/messages/OtherOperationsCommitMessage";

export const getCommitSteps = (
  trxData: TBKMallCommitTransactionResponse
): StepProps[] => {
  return [
    {
      stepTitle: "Paso 1: Petición",
      stepId: "peticion",
      content: (
        <Text>
          Para poder confirmar la transacción debes enviar el token, y en caso
          de pago en cuotas debes también enviar el ID de la consulta de
          couotas. En algunos casos tambien debes enviar el Indice del periodo
          diferido y un boolean indicando si se tomará el período de gracia.
        </Text>
      ),
      code: commitSnippets.getStepOne(),
    },
    {
      stepTitle: "Paso 2: Respuesta",
      stepId: "respuesta",
      content: (
        <OkCommitMessage />
      ),
      code: commitSnippets.getStepTwo(trxData),
    },
    {
      stepTitle: "Transaccion Confirmada!",
      stepId: "listo",
      content: (
        <OtherOperationsCommitMessage />
      ),
    },
  ];
};
