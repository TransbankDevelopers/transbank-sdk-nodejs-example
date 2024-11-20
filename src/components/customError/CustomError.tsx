import Head from "next/head";
import { Route } from "@/types/menu";
import { Layout } from "@/components/layout/Layout";
import { LayoutContent } from "@/components/layout/LayoutContent";
import { Snippet } from "@/components/snippet/Snippet";

export type InvalidViewProps = {
  errorMessage?: string;
  actualBread: Route[]; 
}
export function InvalidView({ errorMessage, actualBread }: InvalidViewProps){
  return (
      <Layout
        pageTitle="Ocurrió un error"
        pageDescription={
          <span>    
            Lo sentimos, no fue posible realizar la operación solicitada.
          </span>
        }
        actualBread={actualBread}
        activeRoute={actualBread[actualBread.length - 1]?.path}
        additionalContent={
          <div className="error-details">
            <LayoutContent
              pageTitle="¿Por qué no fue posible realizar la operación?"
              pageDescription="Te proporcionamos una descripción detallada del error ocurrido, según la información proporcionada por el SDK."
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
