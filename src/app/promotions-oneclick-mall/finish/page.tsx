import { Route } from "@/types/menu";
import { NavigationItem } from "@/components/layout/Navigation";
import { finishOneclickMallTransaction } from "@/app/lib/promotions-oneclick-mall/data";
import { NextPageProps } from "@/types/general";
import { ContentOneClickMall } from "./content";
import { RejectedInscriptionView } from "./error/rejected";
import { AbortedView } from "./error/aborted";
import { TimeoutView } from "./error/timeout";
import { CustomError } from "@/components/customError/CustomError";

const actualBread: Route[] = [
  {
    name: "Inicio",
    path: "/",
  },
  {
    name: "Webpay Oneclick Mall",
    path: "/promotions-oneclick-mall",
  },
  {
    name: "Finalizar inscripción",
    path: "/promotions-oneclick-mall/finish",
  },
];

const navigationItems: NavigationItem[] = [
  {
    title: "Petición",
    sectionId: "peticion",
  },
  {
    title: "Respuesta",
    sectionId: "respuesta",
  },
  {
    title: "Creación del formulario",
    sectionId: "form",
  },
  {
    title: "Ejemplo",
    sectionId: "ejemplo",
  },
];

export default async function FinishOneclickInscription({
  searchParams,
}: Readonly<NextPageProps>) {
  const { TBK_TOKEN, TBK_ORDEN_COMPRA, TBK_ID_SESION } = searchParams;

  if (TBK_ORDEN_COMPRA) {
    return (
      <AbortedView
        abortedResponse={{
          TBK_TOKEN: TBK_TOKEN,
          TBK_ORDEN_COMPRA: TBK_ORDEN_COMPRA,
          TBK_ID_SESION: TBK_ID_SESION,
        }}
      />
    );
  }

  const trxData = await finishOneclickMallTransaction(TBK_TOKEN);

  if ("errorMessage" in trxData) {
    return (
      <CustomError
        errorMessage={trxData.errorMessage}
        actualBread={actualBread}
      />
    );
  }

  if (trxData.response_code === -1) {
    return <RejectedInscriptionView trxData={trxData} />;
  }

  if (trxData.response_code === -96) {
    return (
      <TimeoutView
        timeoutResponse={{
          response_code: trxData.response_code,
        }}
      />
    );
  }

  return (
    <ContentOneClickMall
      actualBread={actualBread}
      navigationItems={navigationItems}
      token={TBK_TOKEN}
      trxData={trxData}
    />
  );
}
