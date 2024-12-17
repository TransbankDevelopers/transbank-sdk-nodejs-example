import { StepProps } from "@/components/step/Step";
import { Text, TextVariant } from "@/components/text/Text";
import * as createSnippets from "../snippets/create";

export const getCreateSteps = (token: string): StepProps[] => {
  return [
    {
      stepTitle: "Paso 1: Petición",
      stepId: "peticion",
      content: (
        <>
          <Text variant={TextVariant.PARAGRAPH}>
            1. Comienza por importar la librería TransaccionCompleta en tu
            proyecto.
          </Text>
          <Text variant={TextVariant.PARAGRAPH}>
            2. Después podrás iniciar una transacción con la siguiente petición:
          </Text>
        </>
      ),
      code: createSnippets.getStepOne(),
    },
    {
      stepTitle: "Paso 2: Respuesta",
      stepId: "respuesta",
      content: (
        <Text>
          Una vez que hayas creado la transacción, aquí encontrarás los datos de
          respuesta generados por el proceso par la próxima etapa.
        </Text>
      ),
      code: createSnippets.getStepTwo(token),
    },
    {
      stepTitle: "¡Transacción creada!",
      stepId: "listo",
      content: (
        <div className="step-example">
          <p>
            Ahora que hemos creado la transacción, se abren dos opciones para
            continuar:
          </p>
          <ul>
            <li>
              <span className="font-bold">Consulta de Cuotas(opcional):</span>{" "}
              Alternativamente puedes realizar consultas de cuotas para ofrecer
              opciones de pago a plazos.
            </li>
            <li>
              <span className="font-bold">Confirmar Transacción:</span> debes
              confirmar directamente la transacción para finalizar con el
              proceso de pago.
            </li>
          </ul>
        </div>
      ),
    },
  ];
};
