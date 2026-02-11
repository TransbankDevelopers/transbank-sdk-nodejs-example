import { StepProps } from "@/components/step/Step";
import * as createSnippets from "@/app/transaccion-completa-standard-brand/content/snippets/create";
import { OperationsCreateFullTxMessage } from "@/components/messages/OperationsCreateFullTxMessage";
import { StandardBrandCreatePayload } from "@/types/transactions";

export const getCreateStandardBrandSteps = (
  requestPayload: StandardBrandCreatePayload,
  responsePayload: unknown,
): StepProps[] => {
  return [
    {
      stepTitle: "Paso 1: Petición",
      stepId: "peticion",
      content: (
        <p className="step-1">
          En este paso se envía la solicitud de creación de la transacción a la
          API de Transbank.
        </p>
      ),
      code: createSnippets.getRequestSnippet(requestPayload),
    },
    {
      stepTitle: "Paso 2: Respuesta",
      stepId: "respuesta",
      content: (
        <p>
          Una vez creada la transacción, recibirás los datos de respuesta con el
          token y el resultado de la operación.
        </p>
      ),
      code: createSnippets.getResponseSnippet(responsePayload),
    },
    {
      stepTitle: "¡Transacción creada!",
      stepId: "next-steps",
      content: <OperationsCreateFullTxMessage />,
    },
  ];
};
