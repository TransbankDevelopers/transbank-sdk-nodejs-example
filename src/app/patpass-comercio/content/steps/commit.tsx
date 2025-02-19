import { StepProps } from "@/components/step/Step";
import { TBKPatpassStatusTxResponse } from "@/types/transactions";
import * as commitSnippets from "@/app/patpass-comercio/content/snippets/commit";

export const getCommitSteps = (
  commitResponse: TBKPatpassStatusTxResponse,
  token: string
): StepProps[] => {
  const steps: StepProps[] = [
    {
      stepTitle: "Paso 1: Datos recibidos",
      content: (
        <p>
          Luego de que se termina el flujo en el formulario de inscripción
          recibirás un POST con la siguiente respuesta.
        </p>
      ),
      code: commitSnippets.getStepOne(token),
    },
    {
      stepTitle: "Paso 2: Petición",
      content: (
        <p>
          Usarás el token recibido para confirmar la inscripción usando
          el método status de PatpassComercio.
        </p>
      ),
      code: commitSnippets.getStepTwo(),
    },
    {
      stepTitle: "Paso 3: Respuesta",
      content: (
        <p>
          Transbank contestará con lo siguiente. Debes guardar esta información,
          lo único que debes validar es que el atributo authorized sea igual a
          true.
        </p>
      ),
      code: commitSnippets.getStepThree(commitResponse),
    },
    {
      stepTitle: "¡Listo!",
      content: (
        <div className="step-ready">
          <p>
            Una vez realizada la inscripcion y confirmada puedes visualizar el
            voucher.
          </p>
        </div>
      ),
      code: commitSnippets.getStepFour(token),
    },
  ];

  return steps;
};
