import { StepProps } from "@/components/step/Step";
import { TBKFinishInscriptionResponse } from "@/types/transactions";
import * as finishInscriptionSnippets from "@/app/oneclick-mall/content/snippets/finish";
import { Table } from "@/components/table/Table";
import {
  getColumnDefinition,
  getColumnFinishOneclickMallValues,
} from "@/helpers/transactions/transactionHelper";
import { Text } from "@/components/text/Text";

export const getFinishInscritionSteps = (
  token: string,
  finishTransactionResponse: TBKFinishInscriptionResponse,
  userName: string
): StepProps[] => {
  return [
    {
      stepTitle: "Paso 1: Datos recibidos",
      stepId: "peticion",
      content: (
        <Text>
          Después de finalizar el flujo en el formulario de inscripción,
          recibirás un GET con la siguiente información:
        </Text>
      ),
      code: finishInscriptionSnippets.getStepOne(token),
    },
    {
      stepTitle: "Paso 2: Petición de autorización",
      stepId: "respuesta",
      content: (
        <Text>
          Utiliza el token recibido para finalizar una inscripción mediante una
          nueva llamada a Oneclick.
        </Text>
      ),
      code: finishInscriptionSnippets.getStepTwo(),
    },
    {
      stepTitle: "Paso 3: Respuesta",
      stepId: "form",
      content: (
        <Text>
          Transbank responderá con información crucial. Guarda estos detalles,
          ya que serán necesarios para autorizar transacciones futuras.
        </Text>
      ),
      code: finishInscriptionSnippets.getStepThree(finishTransactionResponse),
    },
    {
      stepTitle: "¡La tarjeta ya está inscrita!",
      stepId: "inscribed",
      content: (
        <Text>
          Con la inscripción exitosa se pueden autorizar transacciones.
        </Text>
      ),
    },
    {
      stepTitle: "Autorizar una transacción",
      stepId: "authorize",
      content: (
        <div className="step-example">
          <Text>
            Asegúrate de guardar los datos de la respuesta obtenidos durante la
            inscripción. Estos serán esenciales para llevar a cabo transacciones
            de manera efectiva.
          </Text>
          <div>
            <Table
              columns={getColumnDefinition()}
              rows={getColumnFinishOneclickMallValues(
                userName,
                finishTransactionResponse.tbk_user
              )}
            />
          </div>
        </div>
      ),
    },
  ];
};
