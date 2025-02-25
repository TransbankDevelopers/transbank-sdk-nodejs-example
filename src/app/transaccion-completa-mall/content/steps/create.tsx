import { StepProps } from "@/components/step/Step";
import { Text, TextVariant } from "@/components/text/Text";
import * as createSnippets from "../snippets/create";
import { OperationsCreateFullTxMessage } from "@/components/messages/OperationsCreateFullTxMessage";

export const getCreateSteps = (token: string): StepProps[] => {
  return [
    {
      stepTitle: "Paso 1: Petición",
      stepId: "peticion",
      content: (
        <>
          <Text variant={TextVariant.PARAGRAPH}>
            1. Comienza por importar la librería TransaccionCompleta en tu
            proyecto.
          </Text>
          <Text variant={TextVariant.PARAGRAPH}>
            2. Después podrás iniciar una transacción con la siguiente petición:
          </Text>
        </>
      ),
      code: createSnippets.getStepOne(),
    },
    {
      stepTitle: "Paso 2: Respuesta",
      stepId: "respuesta",
      content: (
        <Text>
          Una vez que hayas creado la transacción, aquí encontrarás los datos de
          respuesta generados por el proceso par la próxima etapa.
        </Text>
      ),
      code: createSnippets.getStepTwo(token),
    },
    {
      stepTitle: "¡Transacción creada!",
      stepId: "listo",
      content: (
        <OperationsCreateFullTxMessage />
      ),
    },
  ];
};
