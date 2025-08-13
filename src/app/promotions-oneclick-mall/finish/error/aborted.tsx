import Head from "next/head";
import { Route } from "@/types/menu";
import { Layout } from "@/components/layout/Layout";
import { getErrorAbortedSteps } from "../../content/steps/error-aborted";
import { TBKAbortedResponse } from "@/types/transactions";

const actualBread: Route[] = [
  {
    name: "Inicio",
    path: "/",
  },
  {
    name: "Webpay Oneclick Mall",
    path: "/promotions-oneclick-mall",
  },
  {
    name: "Estado Anulada",
    path: "/promotions-oneclick-mall/finish",
  },
];

export type AbortedViewProps = {
  abortedResponse: TBKAbortedResponse;
};

export const AbortedView = async (props: AbortedViewProps) => {
  return (
    <>
      <Head>
        <title>Transbank SDK Node - Estado de compra anulada</title>
      </Head>
      <Layout
        pageTitle="Webpay Oneclick Mall - Estado de compra anulada"
        pageDescription={`La inscripción ha sido anulada por el usuario. En esta instancia, la inscripción fue abandonada al seleccionar la opción 'Abandonar y volver al comercio'.`}
        actualBread={actualBread}
        activeRoute="/promotions-oneclick-mall/finish"
        steps={getErrorAbortedSteps(props.abortedResponse)}
      />
    </>
  );
};
