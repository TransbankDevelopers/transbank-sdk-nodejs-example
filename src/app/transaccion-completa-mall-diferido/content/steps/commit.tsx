import { StepProps } from "@/components/step/Step";
import { Text, TextVariant } from "@/components/text/Text";
import * as commitSnippets from "../snippets/commit";
import { TBKMallCommitTransactionResponse } from "@/types/transactions";

export const getCommitSteps = (
  trxData: TBKMallCommitTransactionResponse
): StepProps[] => {
  return [
    {
      stepTitle: "Paso 1: Petición",
      stepId: "peticion",
      content: (
        <Text>
          Para poder confirmar la transacción debes enviar el token, y en caso
          de pago en cuotas debes también enviar el ID de la consulta de
          couotas. En algunos casos tambien debes enviar el Indice del periodo
          diferido y un boolean indicando si se tomará el período de gracia.
        </Text>
      ),
      code: commitSnippets.getStepOne(),
    },
    {
      stepTitle: "Paso 2: Respuesta",
      stepId: "respuesta",
      content: (
        <Text>
          Una vez confirmada la transacción recibirás la siguiente información.
        </Text>
      ),
      code: commitSnippets.getStepTwo(trxData),
    },
    {
      stepTitle: "Transaccion Confirmada!",
      stepId: "listo",
      content: (
        <div>
          <Text variant={TextVariant.PARAGRAPH} className="mt-2">
            Con la transacción confirmada, puedes mostrar al usuario una página
            de éxito de la transacción, proporcionándole la confirmación de que
            el proceso se ha completado con éxito.
          </Text>

          <Text variant={TextVariant.PARAGRAPH} className="mt-4">
            <b>Otras Utilidades:</b> Después de confirmar la transacción,
            considera las siguientes utilidades adicionales:
          </Text>
          <ul className="list mt-2">
            <li>
              <b>Reembolso:</b> Evalúa la posibilidad de reversar o anular el
              pago según ciertas condiciones comerciales.
            </li>
            <li className="mt-2">
              <b>Consulta de Estado:</b> Hasta 7 días después de la transacción,
              puedes consultar su estado para obtener más detalles.
            </li>
          </ul>
        </div>
      ),
    },
  ];
};
