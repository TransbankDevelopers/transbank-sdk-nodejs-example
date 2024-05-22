import { StepProps } from "@/components/step/Step";
import { TBKAuthorizeTransactionResponse } from "@/types/transactions";
import * as authorizeSnippets from "@/app/oneclick-mall/content/snippets/authorize";
import { Text } from "@/components/text/Text";

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
        <Text>
          Una vez que la transacción ha sido autorizada, recibirás los
          siguientes datos de respuesta:
        </Text>
      ),
      code: authorizeSnippets.getStepTwo(trxData),
    },
    {
      stepTitle: "¡Casi listo!",
      stepId: "consultas",
      content: (
        <Text>
          Ya puedes mostrar al usuario una página de éxito de la transacción.
          Debes tener en cuenta que la transacción aun no ha sido capturada solo
          ha sido retenido el saldo en la tarjeta del Tarjetahabiente
        </Text>
      ),
    },
  ];
};
