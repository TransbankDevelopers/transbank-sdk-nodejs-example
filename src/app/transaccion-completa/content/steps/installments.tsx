import { StepProps } from "@/components/step/Step";
import { InstallmentsFullTXResponse } from "@/types/transactions";

import * as createSnippets from "@/app/transaccion-completa/content/snippets/installments";

export const getCreateTRXSteps = (
  installmentsResponse: InstallmentsFullTXResponse
): StepProps[] => {
  return [
    {
      stepTitle: "Paso 1: Petición",
      stepId: "peticion",
      content: (
        <p className="step-1">
          Para llevar a cabo la consulta de cuotas, debemos enviar los
          siguientes datos relevantes.
        </p>
      ),
      code: createSnippets.getStepOne(),
    },
    {
      stepTitle: "Paso 2: Respuesta",
      stepId: "respuesta",
      content: (
        <p>
          Una vez realizada la consulta de cuotas, recibirás los siguientes
          datos de respuesta:
        </p>
      ),
      code: createSnippets.getStepTwo(installmentsResponse),
    },

    {
      stepTitle: "Confirmar Transacción",
      stepId: "confirm",
      content: (
        <p>
          Si decides utilizar cuotas y estás satisfecho con las condiciones
          obtenidas en la consulta, el siguiente paso sería confirmar la
          transacción.
        </p>
      ),
    },
  ];
};
