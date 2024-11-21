import Head from "next/head";
import { Route } from "@/types/menu";
import { Layout } from "@/components/layout/Layout";
import { LayoutContent } from "@/components/layout/LayoutContent";
import { Snippet } from "@/components/snippet/Snippet";

export type InvalidViewProps = {
  errorMessage: string;
  actualBread: Route[]; 
}
export function CustomError({ errorMessage, actualBread }: InvalidViewProps){
  return (
      <Layout
        pageTitle="Se ha producido un error"
        pageDescription={
          <span>    
            Cuando se procesaba la operación, la API encontró un problema y devolvió un error.
          </span>
        }
        actualBread={actualBread}
        activeRoute={actualBread[actualBread.length - 1]?.path}
        additionalContent={
          <div className="error-details">
            <LayoutContent
              pageTitle="¿Por qué no fue posible realizar la operación?"
              pageDescription="Cuando ocurre un error en la operación con la API, el SDK lo captura automáticamente. A continuación, se muestra el detalle de la excepción, lo que te permitirá identificar y comprender el problema."
              steps={[]}
            />
              <Snippet code={errorMessage} />
          </div>
        }
      />
  );
};
