import Head from "next/head";
import { Route } from "@/types/menu";
import { Layout } from "@/components/layout/Layout";
import { LayoutContent } from "@/components/layout/LayoutContent";
import { Snippet } from "@/components/snippet/Snippet";



const actualBread: Route[] = [
  {
    name: "Inicio",
    path: "/",
  },
];
export type InvalidViewProps = {
  errorMessage?: string; 
}
export function InvalidView({ errorMessage }: InvalidViewProps){
  return (
    <>
      <Head>
        <title>Transbank SDK Node - Error en Reembolso</title>
      </Head>
      <Layout
        pageTitle="Reembolso no permitido"
        pageDescription={
          <span>    
            Lo sentimos, no fue posible realizar el reembolso.
          </span>
        }
        actualBread={actualBread}
        activeRoute="/webpay-plus/refund"
        additionalContent={
          <div className="unsupported-payment-status">
            <LayoutContent
              pageTitle="¿Por qué no fue posible realizar este reembolso?"
              pageDescription="Te proporcionamos una descripción detallada del error ocurrido al intentar realizar el reembolso, según la información proporcionada por el SDK."
              steps={[]}
            />
            {errorMessage && (
              <Snippet code={errorMessage} />
            )}
          </div>
        }
      />
    </>
  );
};
