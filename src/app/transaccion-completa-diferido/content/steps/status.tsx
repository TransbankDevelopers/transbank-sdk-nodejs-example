import { StepProps } from "@/components/step/Step";
import { TBKFullTxStatusResponse } from "@/types/transactions";
import * as statusSnippets from "@/app/transaccion-completa-diferido/content/snippets/status";

export const getStatusTRXSteps = (
  token_ws: string,
  statusResponse: TBKFullTxStatusResponse
): StepProps[] => {
  return [
    {
      stepTitle: "Paso 1: Petición",
      stepId: "peticion",
      content: (
        <p>
          Para llevar a cabo la solicitud de estado, necesitarás el token
          correspondiente a la transacción de la cual deseas obtener
          información. Utiliza este token para realizar una llamada a
          TransaccionCompleta.Transaction.
        </p>
      ),
      code: statusSnippets.getStepOne(token_ws),
    },
    {
      stepTitle: "Paso 2: Respuesta",
      stepId: "respuesta",
      content: (
        <p>
          Transbank responderá con la siguiente información. Asegúrate de
          guardar estos detalles; lo único que necesitas validar es que el campo
          &quot;response_code&quot; sea igual a cero.
        </p>
      ),
      code: statusSnippets.getStepTwo(statusResponse),
    },
  ];
};
