import Head from "next/head";
import { Layout } from "@/components/layout/Layout";

type ErrorContentProps = {
  errorMessage: string;
  productPage?: string;
  actualRoute?: string;
};

export const ErrorContent = (props: ErrorContentProps) => {
  const {
    productPage = "/transaccion-completa-standard-brand",
    actualRoute = "",
  } = props;

  const actualBread = [
    { name: "Inicio", path: "/" },
    { name: "Transacción Completa Estándar Marca", path: productPage },
    { name: "Error", path: `${productPage}${actualRoute}` },
  ];

  return (
    <>
      <Head>
        <title>Transacción Completa Estándar Marca - Error</title>
      </Head>
      <Layout
        pageTitle="Transacción Completa Estándar Marca - Error"
        pageDescription="Ocurrió un error al procesar la solicitud."
        actualBread={actualBread}
        activeRoute={`${productPage}${actualRoute}`}
        steps={[{ content: props.errorMessage }]}
      />
    </>
  );
};
