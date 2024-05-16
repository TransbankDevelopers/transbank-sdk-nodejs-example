import Head from "next/head";
import { Route } from "@/types/menu";
import { Layout } from "@/components/layout/Layout";

const actualBread: Route[] = [
  {
    name: "Inicio",
    path: "/",
  },
  {
    name: "Webpay Mall",
    path: "/webpay-mall",
  },
  {
    name: "Recuperar transacción",
    path: "/webpay-mall/commit",
  },
];

export type InvalidPaymentViewProps = {
  //   abortedResponse: TBKAbortedResponse;
};

export const InvalidPaymentView = async (props: InvalidPaymentViewProps) => {
  return (
    <>
      <Head>
        <title>Transbank SDK Node - Recuperar transacción</title>
      </Head>
      <Layout
        pageTitle="Webpay Mall - Recuperar transacción"
        pageDescription={
          <span>
            Se ha producido un error en el formulario de pago. Si ha hecho clic
            en el enlace &quot;volver al sitio&quot; desde la pantalla de error
            después de cerrar inesperadamente la pestaña del navegador y trata
            de recuperarla, es posible que haya recibido los siguientes tokens:
            token_ws, TBK_TOKEN, TBK_ID_SESION, TBK_ORDEN_COMPRA.
          </span>
        }
        actualBread={actualBread}
        activeRoute="/webpay-Mall/commit"
        steps={[]}
      />
    </>
  );
};
