import { Route } from "@/types/menu";
import { Layout } from "@/components/layout/Layout";
import { cookies } from "next/headers";
import { localStorageFourFlow } from "@/consts";
import { Snippet } from "@/components/snippet/Snippet";

const actualBread: Route[] = [
  {
    name: "Inicio",
    path: "/",
  },
];

export const metadata = {
  title: "Transbank SDK Node - Recuperar transacción",
};

const InvalidPaymentView = async () => {
  const cookiesStore = cookies();
  const data = cookiesStore.get(localStorageFourFlow);
  const erroDataTbkFrom = data?.value
    ? JSON.stringify(JSON.parse(data.value), null, 2)
    : "undefined";

  return (
    <>
      <Layout
        pageTitle="Recuperar transacción"
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
        activeRoute="/"
        steps={[]}
        additionalContent={<Snippet code={erroDataTbkFrom}></Snippet>}
      />
    </>
  );
};

export default InvalidPaymentView;
