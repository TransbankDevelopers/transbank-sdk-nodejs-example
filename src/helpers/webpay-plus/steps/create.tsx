import { StepProps } from "@/components/step/Step";
import { StartTransactionData } from "@/types/transactions";
import * as createSnippets from "@/helpers/webpay-plus/snippets/create";
import { Table } from "@/components/table/Table";
import { getColumnDefinition, getColumnValues } from "../transactionHelper";
import { Text } from "@/components/text/Text";

export const getCreateTRXSteps = (
  token: string,
  startTransactionData: StartTransactionData
): StepProps[] => {
  return [
    {
      stepTitle: "Paso 1: Petición",
      content: (
        <div className="flex flex-col gap-y-3">
          <Text>
            1. Comienza por importar la librería WebpayPlus en tu proyecto.
          </Text>
          <Text>
            2. Luego, crea una transacción utilizando las funciones
            proporcionadas mediante el SDK.
          </Text>
        </div>
      ),
      code: createSnippets.getStepOne(),
    },
    {
      stepTitle: "Paso 2: Respuesta",
      content: (
        <Text>
          Una vez que hayas creado la transacción, aquí encontrarás los datos de
          respuesta generados por el proceso.
        </Text>
      ),
      code: createSnippets.getStepTwo(token),
    },
    {
      stepTitle: "Paso 3: Creación del formulario",
      content: (
        <Text>
          Utiliza estos datos de respuesta para redireccionar al usuario al
          formulario de pago al Tarjetahabiente. Este formulario será la
          interfaz a través de la cual el usuario realizará su transacción.
        </Text>
      ),
      code: createSnippets.getStepThree(token),
    },
    {
      stepTitle: "Ejemplo",
      content: (
        <div className="flex flex-col gap-8">
          <Text>
            Para llevar a cabo una transacción de compra en nuestro sistema,
            primero debemos crear la transacción. Utilizaremos los siguientes
            datos para configurar la transacción:
          </Text>

          <Table
            columns={getColumnDefinition()}
            rows={getColumnValues(startTransactionData)}
          />

          <Text>
            Por último, con la respuesta del servicio que confirma la creación
            de la transacción, procedemos a crear el formulario de pago. Para
            fines de este ejemplo, haremos visible el campo
            &quot;token_ws&quot;, el cual es esencial para completar el proceso
            de pago de manera exitosa.
          </Text>
        </div>
      ),
    },
  ];
};