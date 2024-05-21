import { StepProps } from "@/components/step/Step";
import { TBKMallTransactionStatusResponse } from "@/types/transactions";
import * as statusSnippets from "@/app/webpay-mall-diferido/content/snippets/status";
import { Text } from "@/components/text/Text";

export const getStatusTRXSteps = (
  token_ws: string,
  trxData: TBKMallTransactionStatusResponse
): StepProps[] => {
  return [
    {
      stepTitle: "Paso 1: Petición",
      content: (
        <Text>
          Para realizar la consulta, necesitas el token de la transacción de la
          cual deseas obtener el estado. Utiliza este token para realizar una
          llamada al SDK.
        </Text>
      ),
      code: statusSnippets.getStepOne(token_ws),
    },
    {
      stepTitle: "Paso 2: Respuesta",
      content: (
        <Text>
          Una vez que hayas creado la transacción, aquí encontrarás los datos de
          respuesta generados por el proceso.
        </Text>
      ),
      code: statusSnippets.getStepTwo(trxData),
    },
  ];
};
