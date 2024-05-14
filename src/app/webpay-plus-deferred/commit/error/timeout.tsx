import Head from "next/head";
import { Route } from "@/types/menu";
import { Layout } from "@/components/layout/Layout";
import { getErrorTimeoutSteps } from "../../content/steps/error-timeout";
import { TBKTimeoutResponse } from "@/types/transactions";

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
    name: "Time out",
    path: "/webpay-plus-deferred/commit",
  },
];

export type TimeoutViewProps = {
  timeoutResponse: TBKTimeoutResponse;
  token_ws: string;
};

export const TimeoutView = async (props: TimeoutViewProps) => {
  return (
    <>
      <Head>
        <title>Transbank SDK Node - Time out</title>
      </Head>
      <Layout
        pageTitle="Webpay Plus - Time out"
        pageDescription={
          <span>
            Cuando una transacción expira debido a un timeout, es crucial
            gestionar este escenario de manera adecuada para garantizar la
            transparencia y la experiencia del usuario, para la prueba en
            integración son de 10 minutos.
          </span>
        }
        actualBread={actualBread}
        activeRoute="/webpay-plus-deferred/commit"
        steps={getErrorTimeoutSteps(props.timeoutResponse)}
      />
    </>
  );
};
