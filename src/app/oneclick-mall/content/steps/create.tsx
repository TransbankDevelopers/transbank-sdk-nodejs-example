import { StepProps } from "@/components/step/Step";
import { StartTransactionDataOneclickMall } from "@/types/transactions";
import * as createSnippets from "@/app/oneclick-mall/content/snippets/create";
import { Table } from "@/components/table/Table";
import {
  getColumnDefinition,
  getColumnOneclickMallValues,
} from "@/helpers/transactions/transactionHelper";
import { Text } from "@/components/text/Text";

export const getCreateTRXSteps = (
  token: string,
  startTransactionDataMall: StartTransactionDataOneclickMall,
  userName: string
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
          <Text>
            1. Comienza por importar la librería Oneclick en tu proyecto.
          </Text>
          <Text>2. Después podrás iniciar una inscripción.</Text>
        </div>
      ),
      code: createSnippets.getStepOne(),
    },
    {
      stepTitle: "Paso 2: Respuesta",
      stepId: "respuesta",
      content: (
        <Text>
          Una vez que hayas iniciado la inscripción, aquí encontrarás los datos
          de respuesta generados por el proceso:
        </Text>
      ),
      code: createSnippets.getStepTwo(token),
    },
    {
      stepTitle: "Paso 3: Creación del formulario",
      stepId: "form",
      content: (
        <Text>
          Utiliza estos datos de respuesta para generar y presentar un
          formulario de inscripción al Tarjetahabiente. Este formulario será la
          interfaz a través de la cual el usuario realizará su transacción.
        </Text>
      ),
      code: createSnippets.getStepThree(token),
    },
    {
      stepTitle: "Ejemplo",
      stepId: "ejemplo",
      content: (
        <div className="step-example">
          <Text>
            Para llevar a cabo una transacción de compra en nuestro sistema,
            primero debemos crear la transacción. Utilizaremos los siguientes
            datos para configurar la transacción:
          </Text>

          <Table
            columns={getColumnDefinition()}
            rows={getColumnOneclickMallValues(startTransactionDataMall)}
          />

          <Text>
            Por último, con la respuesta del servicio que confirma la creación
            de la transacción, procedemos a crear el formulario de pago. Para
            fines de este ejemplo, haremos visible el campo
            &quot;TBK_TOKEN&quot;, el cual es esencial para completar el proceso
            de pago de manera exitosa.
          </Text>

          <Text>
            Antes de continuar al formulario de Webpay, asegúrate de contar con
            los datos de las tarjetas de prueba que están en la{" "}
            <a
              className="tbk-link tbk-link-alt"
              href="https://transbankdevelopers.cl/documentacion/como_empezar#tarjetas-de-prueba"
              target="_blank"
              rel="noopener noreferrer"
            >
              documentación.
            </a>{" "}
          </Text>
        </div>
      ),
    },
  ];
};
