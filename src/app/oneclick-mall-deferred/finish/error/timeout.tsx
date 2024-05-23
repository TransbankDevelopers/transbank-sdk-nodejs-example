import Head from "next/head";
import { Route } from "@/types/menu";
import { Layout } from "@/components/layout/Layout";
import { getErrorTimeoutSteps } from "../../content/steps/error-timeout";
import { TBKMallTimeoutResponse } from "@/types/transactions";

const actualBread: Route[] = [
  {
    name: "Inicio",
    path: "/",
  },
  {
    name: "Webpay Oneclick",
    path: "/oneclick-plus",
  },
  {
    name: "Time out",
    path: "/oneclick-plus/finish",
  },
];

export type TimeoutViewProps = {
  timeoutResponse: TBKMallTimeoutResponse;
};

export const TimeoutView = async (props: TimeoutViewProps) => {
  return (
    <>
      <Head>
        <title>Transbank SDK Node - Time out</title>
      </Head>
      <Layout
        pageTitle="Webpay Oneclick Mall - Time out"
        pageDescription={
          <span>
            Cuando una transacción expira debido a un timeout, es crucial
            gestionar este escenario de manera adecuada para garantizar la
            transparencia y la experiencia del usuario, para la prueba en
            producción es de 10 minutos.
          </span>
        }
        actualBread={actualBread}
        activeRoute="/oneclick-plus/finish"
        steps={getErrorTimeoutSteps(props.timeoutResponse)}
      />
    </>
  );
};
