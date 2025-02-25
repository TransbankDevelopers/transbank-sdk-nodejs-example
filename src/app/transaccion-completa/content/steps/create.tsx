import { StepProps } from "@/components/step/Step";
import * as createSnippets from "@/app/transaccion-completa/content/snippets/create";
import { OperationsCreateFullTxMessage } from "@/components/messages/OperationsCreateFullTxMessage";

export const getCreateTRXSteps = (token: string): StepProps[] => {
  return [
    {
      stepTitle: "Paso 1: Petición",
      stepId: "peticion",
      content: (
        <p className="step-1">
          Comienza importando la librería TransaccionCompleta, y a continuación,
          crea la transacción necesaria.
        </p>
      ),
      code: createSnippets.getStepOne(),
    },
    {
      stepTitle: "Paso 2: Respuesta",
      stepId: "respuesta",
      content: (
        <p>
          Una vez creada la transacción, recibirás los siguientes datos de
          respuesta:
        </p>
      ),
      code: createSnippets.getStepTwo(token),
    },

    {
      stepTitle: "¡Transacción creada!",
      stepId: "next-steps",
      content: (
        <OperationsCreateFullTxMessage />
      ),
    },
  ];
};
