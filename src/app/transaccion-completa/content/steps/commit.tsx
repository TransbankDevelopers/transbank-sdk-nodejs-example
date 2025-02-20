import { StepProps } from "@/components/step/Step";
import { TBKFullTxCommitResponse } from "@/types/transactions";
import * as commitSnippets from "@/app/transaccion-completa/content/snippets/commit";
import { OkCommitMessage } from "@/components/messages/OkCommitMessage";

export const getCommitSteps = (
  commitResponse: TBKFullTxCommitResponse
): StepProps[] => {
  return [
    {
      stepTitle: "Paso 1: Datos recibidos",
      stepId: "confirmar",
      content: (
        <p>
          Para confirmar la transacción, debes enviar el token correspondiente.
          En el caso de pagos a plazos, también debes incluir el ID de la
          consulta de cuotas. En algunos casos, será necesario proporcionar el
          índice del periodo diferido y un valor boolean indicando si se tomará
          el periodo de gracia.
        </p>
      ),
      code: commitSnippets.getStepOne(),
    },
    {
      stepTitle: "Paso 2: Petición",
      content: (
        <OkCommitMessage />
      ),
      code: commitSnippets.getStepTwo(commitResponse),
    },

    {
      stepTitle: "¡Transacción confirmada!",
      stepId: "confirm",
      content: (
        <div className="step-ready">
          <p>
            Con la transacción confirmada, puedes mostrar al usuario una página
            de éxito de la transacción, proporcionándole la confirmación de que
            el proceso se ha completado con éxito.
          </p>
          <div className="instructions">
            <p>
              <span className="font-bold">Otras Utilidades:</span> Después de
              confirmar la transacción, considera las siguientes utilidades
              adicionales:
            </p>
            <ul className="list">
              <li>
                <span className="font-bold">Reembolsar:</span> Puedes reversar o
                anular el pago según ciertas condiciones comerciales.
              </li>
              <li>
                <span className="font-bold">Consultar Estado:</span> Hasta 7
                días después de realizada la transacción, podrás consultar el
                estado de la transacción.
              </li>
            </ul>
          </div>
        </div>
      ),
    },
  ];
};
