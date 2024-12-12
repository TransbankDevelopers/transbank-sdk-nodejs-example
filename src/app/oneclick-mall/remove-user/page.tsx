import { Route } from "@/types/menu";
import { NavigationItem } from "@/components/layout/Navigation";
import { removeUserInscriptionOneclick } from "@/app/lib/oneclick-mall/data";
import { NextPageProps } from "@/types/general";
import { Layout } from "@/components/layout/Layout";
import Head from "next/head";
import { getRemoveUserSteps } from "../content/steps/remove-user";
import { CustomError } from "@/components/customError/CustomError";

const actualBread: Route[] = [
  {
    name: "Inicio",
    path: "/",
  },
  {
    name: "Webpay Oneclick",
    path: "/oneclick-mall",
  },
  {
    name: "Borrar usuario",
    path: "/oneclick-mall/remove-user",
  },
];

const navigationItems: NavigationItem[] = [
  {
    title: "Ejemplo",
    sectionId: "peticion",
  },
];

export default async function RemoveUserInscriptionOneClick({
  searchParams,
}: NextPageProps) {
  const { tbk_user, user_name } = searchParams;
  const result = await removeUserInscriptionOneclick(tbk_user, user_name);

  if ("errorMessage" in result) {
    return (
      <CustomError
        errorMessage={result.errorMessage}
        actualBread={actualBread}
      />
    );
  }

  return (
    <>
      <Head>
        <title>Transbank SDK Node - Finalizar inscripción</title>
      </Head>
      <Layout
        pageTitle="Webpay Oneclick Mall - Finalizar inscripción"
        pageDescription="En esta fase, completaremos el proceso de inscripción, permitiéndonos posteriormente realizar cargos a la tarjeta que el tarjetahabiente haya inscrito."
        actualBread={actualBread}
        activeRoute="/oneclick-mall/remove-user"
        navigationItems={navigationItems}
        steps={getRemoveUserSteps(tbk_user as string, user_name as string)}
      />
    </>
  );
}
