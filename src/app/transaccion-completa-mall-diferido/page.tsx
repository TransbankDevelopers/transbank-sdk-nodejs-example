import { Route } from "@/types/menu";
import { NavigationItem } from "@/components/layout/Navigation";
import { PageContent } from "./content/PageContent";

const actualBread: Route[] = [
  {
    name: "Inicio",
    path: "/",
  },
  {
    name: "Transacción Completa Mall Diferido",
    path: "/transaccion-completa-mall-diferido",
  },
  {
    name: "Formulario",
    path: "/transaccion-completa-mall-diferido",
  },
];

const navigationItems: NavigationItem[] = [
  {
    title: "Formulario",
    sectionId: "formulario",
  },
];

export default async function CreateFullTransactionMallDiferidoTransaction() {
  return (
    <PageContent actualBread={actualBread} navigationItems={navigationItems} />
  );
}
