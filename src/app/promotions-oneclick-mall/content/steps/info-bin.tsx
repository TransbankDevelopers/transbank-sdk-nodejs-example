import { StepProps } from "@/components/step/Step";
import { infoBinResponse } from "@/types/transactions";
import * as infoBinSnippets from "@/app/promotions-oneclick-mall/content/snippets/info-bin";
import { Text } from "@/components/text/Text";

export const getInfoBinTRXSteps = (
  tbkUser: string,
  trxData: infoBinResponse
): StepProps[] => {
  return [
    {
      stepTitle: "Paso 1: Petición",
      stepId: "peticion",
      content: (
        <Text>
          Para realizar la consulta, necesitarás el &quot;tbk_user&quot; de la
          transacción de interés. Utiliza este identificador para efectuar una
          llamada a Oneclick.MallBinInfo.
        </Text>
      ),
      code: infoBinSnippets.getStepOne(tbkUser),
    },
    {
      stepTitle: "Paso 2: Respuesta",
      stepId: "respuesta",
      content: (
        <Text>
          Transbank responderá con la siguiente información. si no tiene
          habilitado el servicio de consulta de bines, la respuesta incluirá un
          mensaje de error.
        </Text>
      ),
      code: infoBinSnippets.getStepTwo(trxData),
    },
  ];
};
