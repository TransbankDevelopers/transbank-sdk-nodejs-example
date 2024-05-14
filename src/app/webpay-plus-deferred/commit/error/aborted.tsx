import Head from "next/head";
import { Route } from "@/types/menu";
import { Layout } from "@/components/layout/Layout";
import { LayoutContent } from "@/components/layout/LayoutContent";
import { getStatusTRXSteps } from "../../content/steps/status";
import { getStatusTransaction } from "@/app/lib/webpay-plus/data";
import { getErrorAbortedSteps } from "../../content/steps/error-aborted";
import { TBKAbortedResponse } from "@/types/transactions";

const actualBread: Route[] = [
  {
    name: "Inicio",
    path: "/",
  },
  {
    name: "Webpay Plus Diferido",
    path: "/webpay-plus-deferred",
  },
  {
    name: "Estado cancelada",
    path: "/webpay-plus-deferred/commit",
  },
];

export type AbortedViewProps = {
  abortedResponse: TBKAbortedResponse;
};

export const AbortedView = async (props: AbortedViewProps) => {
  const statusResponse = await getStatusTransaction(
    props.abortedResponse.TBK_TOKEN
  );
  return (
    <>
      <Head>
        <title>Transbank SDK Node - Estado cancelada</title>
      </Head>
      <Layout
        pageTitle="Webpay Plus - Estado de compra cancelada"
        pageDescription={
          <span>
            El pago de la compra ha sido anulado por el usuario. En esta etapa,
            después de abandonar el formulario de pago, no es necesario realizar
            la confirmación. Aquí te proporcionamos información esencial sobre
            el estado de la transacción anulada:
          </span>
        }
        actualBread={actualBread}
        activeRoute="/webpay-plus-deferred/commit"
        steps={getErrorAbortedSteps(props.abortedResponse)}
        additionalContent={
          <div className="aborted-status">
            <LayoutContent
              pageTitle="Consulta de Estado de Transacción"
              pageDescription="Puedes solicitar el estado de una transacción hasta 7 días después de su realización. No hay límite de solicitudes de este tipo durante ese período. Sin embargo, después de pasar los 7 días, ya no podrás revisar el estado de la transacción."
              steps={getStatusTRXSteps(
                props.abortedResponse.TBK_TOKEN,
                statusResponse
              )}
            />
          </div>
        }
      />
    </>
  );
};
