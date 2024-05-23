import { StepProps } from "@/components/step/Step";
import * as commitSnippets from "../snippets/capture";
import { TBKCaptureTransactionResponse } from "@/types/transactions";

export const getCaptureSteps = (
  buyOrder: string,
  captureResponse: TBKCaptureTransactionResponse
): StepProps[] => {
  const steps: StepProps[] = [
    {
      stepTitle: "Paso 1: Petición",
      content: (
        <p>
          Para capturar una transacción necesitaremos el código de comercio y
          Orden de compra de la tienda hija, Código de autorización y monto a
          capturar. Se hace de la siguiente manera.
        </p>
      ),
      code: commitSnippets.getStepOne(buyOrder),
    },
    {
      stepTitle: "Paso 2: Respuesta",
      content: (
        <p>
          Una vez capturada la transacción, recibirás los siguientes datos de
          respuesta:
        </p>
      ),
      code: commitSnippets.getStepTwo(captureResponse),
    },
    {
      stepTitle: "¡Transacción Capturada!",
      content: (
        <>
          <p>
            Con la transacción capturada, puedes mostrar al usuario una página
            de éxito de la transacción, proporcionándole la confirmación de que
            el proceso se ha completado con éxito.
          </p>
          <p>
            <span className="font-bold">Otras Utilidades:</span> Después de
            confirmar la transacción, considera las siguientes utilidades
            adicionales:
          </p>
          <ul>
            <li>
              <span className="font-bold">Reembolso:</span> Evalúa la
              posibilidad de reversar o anular el pago según ciertas condiciones
              comerciales.
            </li>
            <li>
              <span className="font-bold">Consulta de Estado:</span> Hasta 7
              días después de la transacción, puedes consultar su estado para
              obtener más detalles.
            </li>
          </ul>
        </>
      ),
    },
  ];

  return steps;
};
