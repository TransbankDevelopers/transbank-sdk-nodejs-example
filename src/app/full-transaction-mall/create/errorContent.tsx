import { Layout } from "@/components/layout/Layout";
import { Route } from "@/types/menu";
import Head from "next/head";

const actualBread: Route[] = [
  {
    name: "Inicio",
    path: "/",
  },
  {
    name: "Webpay Transacción Completa",
    path: "/full-transaction-mall",
  },
  {
    name: "Error",
    path: "/full-transaction-mall/create",
  },
];

type ErrorContentProps = {
  errorMessage: string;
};

export const ErrorContent = (props: ErrorContentProps) => {
  return (
    <>
      <Head>
        <title>Transbank SDK Node - Crear Transaccion</title>
      </Head>
      <Layout
        pageTitle="Transacción Completa Mall - Error"
        pageDescription="Error en la creación de la transacción."
        actualBread={actualBread}
        activeRoute="/full-transaction-mall/create"
        steps={[{ content: props.errorMessage }]}
      />
    </>
  );
};
