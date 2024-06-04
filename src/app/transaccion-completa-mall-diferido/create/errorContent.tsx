import { Layout } from "@/components/layout/Layout";
import Head from "next/head";
import { useMemo } from "react";

type ErrorContentProps = {
  errorMessage: string;
  productPage?: string;
  actualRoute?: string;
};

export const ErrorContent = (props: ErrorContentProps) => {
  const {
    productPage = "/transaccion-completa-mall-diferido",
    actualRoute = "/create",
  } = props;

  const actualBread = useMemo(() => {
    return [
      {
        name: "Inicio",
        path: "/",
      },
      {
        name: "Webpay Transacción Completa Mall Diferido",
        path: `${productPage}`,
      },
      {
        name: "Error",
        path: `${productPage}${actualRoute}`,
      },
    ];
  }, [actualRoute, productPage]);

  return (
    <>
      <Head>
        <title>Transbank SDK Node - Crear Transaccion</title>
      </Head>
      <Layout
        pageTitle="Transacción Completa Mall Diferido - Error"
        pageDescription="Error en la creación de la transacción."
        actualBread={actualBread}
        activeRoute={`${productPage}${actualRoute}`}
        steps={[{ content: props.errorMessage }]}
      />
    </>
  );
};
