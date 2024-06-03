import { Route } from "@/types/menu";
import { NavigationItem } from "@/components/layout/Navigation";
import { PageContent } from "@/app/transaccion-completa-diferido/content/PageContent";

const actualBread: Route[] = [
  {
    name: "Inicio",
    path: "/",
  },
  {
    name: "Webpay Transaccion Completa diferido",
    path: "/transaccion-completa-diferido",
  },
];

const navigationItems: NavigationItem[] = [
  {
    title: "Formulario",
    sectionId: "formulario",
  },
];

export default async function InittxFullPage() {
  return (
    <PageContent actualBread={actualBread} navigationItems={navigationItems} />
  );
}
