import { StepProps } from "@/components/step/Step";
import * as createSnippets from "@/app/transaccion-completa/content/snippets/create";

export const getCreateTRXSteps = (token: string): StepProps[] => {
  return [
    {
      stepTitle: "Paso 1: Petición",
      stepId: "peticion",
      content: (
        <p className="step-1">
          Comienza importando la librería TransaccionCompleta y, a continuación,
          crea la transacción necesaria.
        </p>
      ),
      code: createSnippets.getStepOne(),
    },
    {
      stepTitle: "Paso 2: Respuesta",
      stepId: "respuesta",
      content: (
        <p>
          Una vez creada la transacción, recibirás los siguientes datos de
          respuesta:
        </p>
      ),
      code: createSnippets.getStepTwo(token),
    },

    {
      stepTitle: "¡Transacción creada!",
      stepId: "next-steps",
      content: (
        <div className="step-example">
          <p>
            Ahora que hemos creado la transacción, se abren dos opciones para
            continuar:
          </p>
          <ul>
            <li>
              <span className="font-bold">Consulta de Cuotas (opcional):</span>
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
