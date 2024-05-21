import { StepProps } from "@/components/step/Step";
import { TBKMallCommitTransactionResponse } from "@/types/transactions";
import * as commitSnippets from "@/app/webpay-mall/content/snippets/commit";
import { Text } from "@/components/text/Text";

export const getCommitSteps = (
  token: string,
  commitResponse: TBKMallCommitTransactionResponse
): StepProps[] => {
  return [
    {
      stepTitle: "Paso 1: Datos recibidos",
      stepId: "confirmar",
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
      stepTitle: "¡Casi Listo!",
      stepId: "consultas",
      content: (
        <div className="step-ready">
          <p>
            Es importante tener en cuenta que la transacción aún no ha sido
            capturada, por lo que hay que dejarle saber al tarjetahabiente que
            necesita un paso más; solo se ha retenido el saldo en su tarjeta.
            Después de confirmar la transacción, puedes:
          </p>
          <div className="instructions">
            <ul className="list">
              <li>Capturar la transacción.</li>
              <li>Revertir la transacción si es necesario.</li>
              <li>
                Consultar el estado de la transacción hasta 7 días después de
                realizada.
              </li>
            </ul>
            <p>
              Este proceso te guiará en la confirmación exitosa de
              transacciones.
            </p>
          </div>
        </div>
      ),
    },
  ];
};
