import { Route } from "@/types/menu";
import {
  StartTransactionData,
  TBKCreateTransactionResponse,
} from "@/types/transactions";
import { NavigationItem } from "@/components/layout/Navigation";
import { createOneclickMallTransaction } from "../lib/promotions-oneclick-mall/data";
import { PageContent } from "./content/PageContent";
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

export type CreateTRXProps = TBKCreateTransactionResponse &
  StartTransactionData;

export default async function CreateWebpyMallTransaction() {
  const trxData = await createOneclickMallTransaction();
  if ("errorMessage" in trxData) {
    return (
      <CustomError
        errorMessage={trxData.errorMessage}
        actualBread={actualBread}
      />
    );
  }
  return (
    <PageContent
      trxData={trxData}
      actualBread={actualBread}
      navigationItems={navigationItems}
    />
  );
}
