import { StepProps } from "@/components/step/Step";
import { Text } from "@/components/text/Text";
import * as installmentsSnippets from "../snippets/installments";
import {
  TBKInstallmentsFullTransactionResponse,
  TBKMallCommitTransactionResponse,
} from "@/types/transactions";

export const getInstallmentsSteps = (
  trxData: TBKInstallmentsFullTransactionResponse
): StepProps[] => {
  return [
    {
      stepTitle: "Paso 1: Petición",
      stepId: "peticion",
      content: (
        <Text>
          Para llevar a cabo la consulta de cuotas, debemos enviar los
          siguientes datos relevantes.
        </Text>
      ),
      code: installmentsSnippets.getStepOne(),
    },
    {
      stepTitle: "Paso 2: Respuesta",
      stepId: "respuesta",
      content: (
        <Text>
          Una hecha la consulta de cuotas, estos serán los datos de respuesta
        </Text>
      ),
      code: installmentsSnippets.getStepTwo(trxData),
    },
    {
      stepTitle: "Confirmar Transacción",
      stepId: "listo",
      content: (
        <Text>
          Si decides utilizar cuotas y estás satisfecho con las condiciones
          obtenidas en la consulta, el siguiente paso sería confirmar la
          transacción.
        </Text>
      ),
    },
  ];
};
