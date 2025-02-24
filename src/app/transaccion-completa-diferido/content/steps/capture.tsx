import { StepProps } from "@/components/step/Step";
import { TBKfullTxCaptureResponse } from "@/types/transactions";
import * as captureSnippets from "@/app/transaccion-completa-diferido/content/snippets/capture";
import { OtherOperationsCaptureMessage } from "@/components/messages/OtherOperationsCaptureMessage";

export const getCaptureSteps = (
  captureResponse: TBKfullTxCaptureResponse
): StepProps[] => {
  return [
    {
      stepTitle: "Paso 1 - Petición:",
      stepId: "peticion",
      content: (
        <p>
          Para capturar una transacción, necesitaremos el Token, la Orden de
          compra, el Código de autorización y el monto a capturar.
        </p>
      ),
      code: captureSnippets.getStepOne(),
    },
    {
      stepTitle: "Paso 2: Respuesta",
      content: (
        <p>
          Una vez creada la transacción, recibirás los siguientes datos de
          respuesta:
        </p>
      ),
      code: captureSnippets.getStepTwo(captureResponse),
    },

    {
      stepTitle: "¡Listo!",
      stepId: "other",
      content: (
        <OtherOperationsCaptureMessage />
      ),
    },
  ];
};
