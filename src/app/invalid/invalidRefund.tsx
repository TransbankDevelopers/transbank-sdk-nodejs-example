import Head from "next/head";
import { Route } from "@/types/menu";
import { Layout } from "@/components/layout/Layout";
import { LayoutContent } from "@/components/layout/LayoutContent";
import { Snippet } from "@/components/snippet/Snippet";

export type InvalidViewProps = {
  errorMessage?: string;
  actualBread: Route[]; 
}
export const metadata = {
  title: "Transbank SDK Node - Error en Reembolso",
};
export function InvalidView({ errorMessage, actualBread }: InvalidViewProps){
  return (
      <Layout
        pageTitle="Reembolso no permitido"
        pageDescription={
          <span>    
            Lo sentimos, no fue posible realizar el reembolso.
          </span>
        }
        actualBread={actualBread}
        activeRoute={actualBread[actualBread.length - 1]?.path}
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
  );
};
