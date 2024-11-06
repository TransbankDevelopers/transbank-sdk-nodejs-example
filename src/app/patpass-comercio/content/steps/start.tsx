import { StepProps } from "@/components/step/Step";
import { StartTxPatPassType } from "@/types/transactions";
import * as startSnippets from "@/app/patpass-comercio/content/snippets/start";
import { Table } from "@/components/table/Table";
import {
  getColumnDefinition,
  getColumnPatpassValues,
} from "@/helpers/transactions/transactionHelper";
import { Text } from "@/components/text/Text";

export const getStartTRXSteps = (
  StartTxPatPass: StartTxPatPassType
): StepProps[] => {
  return [
    {
      content: (
        <Text>
          Todas las transacciones en este proyecto de ejemplo son realizadas en
          ambiente de integración.
        </Text>
      ),
    },
    {
      stepTitle: "Paso 1: Petición",
      stepId: "peticion",
      content: (
        <div className="step-1">
          <p>
            {`Para comenzar, importa la librería PatpassComercio y luego inicia
            una inscripción.Tener en cuenta: Actualmente, el ambiente de
            integración no admite direcciones locales (como localhost,
            127.0.0.1, 192.168..) en los atributos 'url' y 'finalUrl'.`}
          </p>
        </div>
      ),
      code: startSnippets.getStepOne(),
    },
    {
      stepTitle: "Paso 2: Respuesta",
      stepId: "respuesta",
      content: (
        <p>
          Una vez iniciada la inscripción, recibirás los siguientes datos de
          respuesta (recuerda que El token tienen una vigencia de 7 días desde
          su creación):
        </p>
      ),
      code: startSnippets.getStepTwo(StartTxPatPass.token, StartTxPatPass.url),
    },
    {
      stepTitle: "Paso 3: Creación del formulario",
      stepId: "form",
      content: (
        <>
          <p>
            Utiliza los datos obtenidos durante la inscripción para generar un
            formulario, proporcionando al Tarjetahabiente una experiencia de
            inscripción fluida y segura.
          </p>

          <p className="mt-4">
            Este proceso te guiará en la generación de una suscripción efectiva.
            Si surge alguna pregunta o necesitas asistencia adicional, estamos{" "}
            <a
              href="https://transbank.continuumhq.dev/slack_community"
              target="_blank"
              className="tbk-link "
            >
              aquí
            </a>{" "}
            para ayudarte. ¡Gracias por confiar en Transbank para tus
            operaciones seguras!
          </p>
        </>
      ),
      code: startSnippets.getStepThree(
        StartTxPatPass.token,
        StartTxPatPass.url
      ),
    },
    {
      stepTitle: "Ejemplo",
      stepId: "ejemplo",
      content: (
        <div className="step-example">
          <p>
            Para poder iniciar la inscripción, se necesitan los siguientes
            datos:
          </p>

          <Table
            columns={getColumnDefinition()}
            rows={getColumnPatpassValues(StartTxPatPass)}
          />
        </div>
      ),
    },
  ];
};
