import { StepProps } from "@/components/step/Step";
import { TBKCommitTransactionResponse } from "@/types/transactions";
import * as commitSnippets from "@/app/webpay-plus/content/snippets/commit";
import { Text } from "@/components/text/Text";

export const getCommitSteps = (
  token: string,
  commitResponse: TBKCommitTransactionResponse
): StepProps[] => {
  return [
    {
      stepTitle: "Paso 1: Datos recibidos",
      content: (
        <Text>
          Después de completar el flujo en el formulario de pago, recibirás un
          POST con la siguiente información:
        </Text>
      ),
      code: commitSnippets.getStepOne(token),
    },
    {
      stepTitle: "Paso 2: Petición",
      content: (
        <Text>
          Utilizarás el token recibido para confirmar la transacción mediante el
          SDK.
        </Text>
      ),
      code: commitSnippets.getStepTwo(),
    },
    {
      stepTitle: "Paso 3: Respuesta",
      content: (
        <Text>
          Transbank responderá con la siguiente información. Es crucial guardar
          esta respuesta, y la única validación necesaria es que el campo
          &quot;response_code&quot; sea igual a cero.
        </Text>
      ),
      code: commitSnippets.getStepThree(commitResponse),
    },
    {
      stepTitle: "¡Listo!",
      content: (
        <div className="flex flex-col gap-4">
          <Text>
            Con la confirmación exitosa, ya puedes mostrar al usuario una página
            de éxito de la transacción, proporcionándole la tranquilidad de que
            el proceso ha sido completado con éxito.
          </Text>
          <div className="flex flex-col gap-2">
            <Text>
              Después de confirmar la transacción, podrás realizar otras
              operaciones útiles:
            </Text>
            <ul className="list-disc px-6 text-base text-tbk-black-2">
              <li>
                <b>Reembolsar:</b> Puedes reversar o anular el pago según
                ciertas condiciones comerciales.
              </li>
              <li>
                <b>Consultar Estado:</b> Hasta 7 días después de realizada la
                transacción, podrás consultar el estado de la transacción.
              </li>
            </ul>
          </div>
        </div>
      ),
    },
  ];
};
