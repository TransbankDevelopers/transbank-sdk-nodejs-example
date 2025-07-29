import { StepProps } from "@/components/step/Step";
import {
  TBKAuthorizeTransactionResponse,
  TBKMallCommitTransactionResponse,
} from "@/types/transactions";
import * as authorizeSnippets from "@/app/oneclick-mall/content/snippets/authorize";
import { Text, TextType } from "@/components/text/Text";
import { OkAuthorizeMessage } from "@/components/messages/OkAuthorizeMessage";

export const getAuthorizeSteps = (
  trxData: TBKAuthorizeTransactionResponse
): StepProps[] => {
  return [
    {
      stepTitle: "Paso 1: Peticion",
      stepId: "peticion",
      content: (
        <Text>
          Ahora que contamos con el &quot;username&quot; y el
          &quot;tbk_user&quot; obtenidos durante la inscripción, estamos listos
          para autorizar transacciones en la tarjeta inscrita.
        </Text>
      ),
      code: authorizeSnippets.getStepOne(),
    },
    {
      stepTitle: "Paso 2: Respuesta",
      stepId: "respuesta",
      content: (
        <OkAuthorizeMessage />
      ),
      code: authorizeSnippets.getStepTwo(trxData),
    },
    {
      stepTitle: "¡Listo!",
      stepId: "consultas",
      content: (
        <div className="step-ready">
          <Text>
            Con la autorización exitosa, puedes mostrar al usuario una página de
            éxito de la transacción, proporcionándole la confirmación de que el
            proceso se ha completado con éxito.
          </Text>
          <div className="instructions">
            <Text type={TextType.SECTION_TITLE}>Otras utilidades</Text>
            <Text>
              Después de autorizar la transacción, considera las siguientes
              utilidades adicionales:
            </Text>
            <ul className="list">
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
