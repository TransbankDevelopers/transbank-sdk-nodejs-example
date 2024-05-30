import { StepProps } from "@/components/step/Step";
import { TBKMallTransactionStatusResponse } from "@/types/transactions";
import * as statusSnippets from "../snippets/status";
import { Text } from "@/components/text/Text";

export const getStatusTRXSteps = (
  token: string,
  trxData: TBKMallTransactionStatusResponse
): StepProps[] => {
  return [
    {
      stepTitle: "Paso 1: Petición",
      stepId: "peticion",
      content: (
        <Text>
          Para llevar a cabo la solicitud de estado, necesitarás el token
          correspondiente a la transacción de la cual deseas obtener
          información. Utiliza este token para realizar una llamada a
          TransaccionCompleta.MallTransaction.
        </Text>
      ),
      code: statusSnippets.getStepOne(token),
    },
    {
      stepTitle: "Paso 2: Respuesta",
      stepId: "respuesta",
      content: (
        <Text>
          Transbank responderá con la siguiente información. Asegúrate de
          guardar estos detalles; lo único que necesitas validar es que el campo
          &quot;response_code&quot; sea igual a cero.
        </Text>
      ),
      code: statusSnippets.getStepTwo(trxData),
    },
    {
      stepTitle:
        "Este proceso te permitirá acceder al estado actualizado de la transacción.",
    },
  ];
};
