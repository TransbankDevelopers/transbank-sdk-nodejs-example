import { StepProps } from "@/components/step/Step";
import { Text } from "@/components/text/Text";
import * as statusSnippets from "../snippets/status";

export const getStatusSteps = (
  token: string,
  statusResponse: unknown,
): StepProps[] => {
  return [
    {
      stepTitle: "Paso 1: Petición",
      stepId: "peticion",
      content: (
        <Text>
          Para consultar el estado necesitas el token de la transacción. Utiliza
          ese token para llamar al endpoint de estado de Transbank.
        </Text>
      ),
      code: statusSnippets.getStepOne(token),
    },
    {
      stepTitle: "Paso 2: Respuesta",
      stepId: "respuesta",
      content: (
        <Text>Transbank responderá con la información de la transacción.</Text>
      ),
      code: statusSnippets.getStepTwo(statusResponse),
    },
  ];
};
