import { StepProps } from "@/components/step/Step";
import * as commitSnippets from "../snippets/capture";
import { Text } from "@/components/text/Text";
import { TBKCaptureTransactionResponse } from "@/types/transactions";

export const getCaptureSteps = (
  token: string,
  commitResponse: TBKCaptureTransactionResponse
): StepProps[] => {
  const steps: StepProps[] = [
    {
      stepTitle: "Paso 1: Petición",
      content: (
        <Text>
          Para capturar una transacción necesitaremos el Token, Orden de compra,
          Código de autorización y monto a capturar. Se hace de la siguiente
          manera.
        </Text>
      ),
      code: commitSnippets.getStepOne(token),
    },
    {
      stepTitle: "Paso 2: Respuesta",
      content: (
        <Text>
          Transbank contestará con lo siguiente. Debes guardar esta información,
          lo único que debes validar es que response_code sea igual a cero.
        </Text>
      ),
      code: commitSnippets.getStepTwo(commitResponse),
    },
    {
      stepTitle: "Otras utilidades",
      content: (
        <Text>
          Luego de capturada la transacción puedes Reembolsar (reversar o
          anular) el pago dependiendo de ciertas condiciones comerciales.
          También puedes consultar el estado de la transacción hasta 7 días
          después de realizada.
        </Text>
      ),
    },
  ];

  return steps;
};
