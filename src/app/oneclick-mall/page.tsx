import { Route } from "@/types/menu";
import {
  StartTransactionData,
  TBKCreateTransactionResponse,
} from "@/types/transactions";
import { NavigationItem } from "@/components/layout/Navigation";
import { createOneclickMallTransaction } from "../lib/oneclick-mall/data";
import { PageContent } from "./content/PageContent";

const actualBread: Route[] = [
  {
    name: "Inicio",
    path: "/",
  },
  {
    name: "Webpay Oneclick",
    path: "/oneclick-mall",
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

  return (
    <PageContent
      trxData={trxData}
      actualBread={actualBread}
      navigationItems={navigationItems}
    />
  );
}
