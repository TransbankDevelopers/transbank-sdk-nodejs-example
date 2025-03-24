import { Route } from "@/types/menu";
import { NavigationItem } from "@/components/layout/Navigation";
import { finishOneclickMallTransaction } from "@/app/lib/oneclick-mall/data";
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
    path: "/oneclick-mall",
  },
  {
    name: "Finalizar inscripción",
    path: "/oneclick-mall/finish",
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
}: NextPageProps) {
  const { TBK_TOKEN, TBK_ORDEN_COMPRA, TBK_ID_SESION } = searchParams;

  if (TBK_ORDEN_COMPRA) {
    return (
      <AbortedView
        abortedResponse={{
          TBK_TOKEN: TBK_TOKEN as string,
          TBK_ORDEN_COMPRA: TBK_ORDEN_COMPRA as string,
          TBK_ID_SESION: TBK_ID_SESION as string,
        }}
      />
    );
  }

  const trxData = await finishOneclickMallTransaction(TBK_TOKEN as string);

  if ("errorMessage" in trxData) {
    return (
      <CustomError
        errorMessage={trxData.errorMessage}
        actualBread={actualBread}
      />
    );
  }

  if (trxData.response_code === -1) {
    return (
      <RejectedInscriptionView trxData={trxData} token={TBK_TOKEN as string} />
    );
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
      token={TBK_TOKEN as string}
      trxData={trxData}
    />
  );
}
