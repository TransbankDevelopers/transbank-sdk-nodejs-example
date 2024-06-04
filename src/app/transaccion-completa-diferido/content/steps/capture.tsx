import { StepProps } from "@/components/step/Step";
import { TBKfullTxCaptureResponse } from "@/types/transactions";
import * as captureSnippets from "@/app/transaccion-completa-diferido/content/snippets/capture";

export const getCaptureSteps = (
  captureResponse: TBKfullTxCaptureResponse
): StepProps[] => {
  return [
    {
      stepTitle: "Paso 1 - Petición:",
      stepId: "peticion",
      content: (
        <p>
          Para capturar una transacción, necesitaremos el Token, la Orden de
          compra, el Código de autorización y el monto a capturar.
        </p>
      ),
      code: captureSnippets.getStepOne(),
    },
    {
      stepTitle: "Paso 2: Respuesta",
      content: (
        <p>
          Una vez creada la transacción, recibirás los siguientes datos de
          respuesta:
        </p>
      ),
      code: captureSnippets.getStepTwo(captureResponse),
    },

    {
      stepTitle: "Otras utilidades",
      stepId: "other",
      content: (
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
              <span className="font-bold">Consultar Estado:</span> Hasta 7 días
              después de realizada la transacción, podrás consultar el estado de
              la transacción.
            </li>
          </ul>
        </div>
      ),
    },
  ];
};
