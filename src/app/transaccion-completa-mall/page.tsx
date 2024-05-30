import { Route } from "@/types/menu";
import { NavigationItem } from "@/components/layout/Navigation";
import { PageContent } from "./content/PageContent";

const actualBread: Route[] = [
  {
    name: "Inicio",
    path: "/",
  },
  {
    name: "Webpay Transaccion Completa",
    path: "/transaccion-completa-mall",
  },
  {
    name: "Formulario",
    path: "/transaccion-completa-mall",
  },
];

const navigationItems: NavigationItem[] = [
  {
    title: "Formulario",
    sectionId: "formulario",
  },
];

export default async function CreateFullTransactionMallTransaction() {
  return (
    <PageContent actualBread={actualBread} navigationItems={navigationItems} />
  );
}
