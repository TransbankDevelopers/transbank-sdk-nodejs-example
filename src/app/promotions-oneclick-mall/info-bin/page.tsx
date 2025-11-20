import { Route } from "@/types/menu";
import { Layout } from "@/components/layout/Layout";
import Head from "next/head";
import { getInfoBinTRXSteps } from "@/app/promotions-oneclick-mall/content/steps/info-bin";
import { NextPageProps } from "@/types/general";
import { NavigationItem } from "@/components/layout/Navigation";
import { InfoBinOneclickMall } from "@/app/lib/promotions-oneclick-mall/data";
import { CustomError } from "@/components/customError/CustomError";

const actualBread: Route[] = [
  {
    name: "Inicio",
    path: "/",
  },
  {
    name: "Webpay Oneclick",
    path: "/promotions-oneclick-mall",
  },
  {
    name: "Webpay Oneclick",
    path: "/promotions-oneclick-mall/info-bin",
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
];

export default async function InfoBinView({
  searchParams,
}: Readonly<NextPageProps>) {
  const { tbk_user } = searchParams;
  const trxBin = await InfoBinOneclickMall(tbk_user);
  if ("errorMessage" in trxBin) {
    return (
      <CustomError
        errorMessage={trxBin.errorMessage}
        actualBread={actualBread}
      />
    );
  }

  return (
    <>
      <Head>
        <title>Transbank SDK Node - Consulta servicio de bines</title>
      </Head>
      <Layout
        pageTitle="Webpay Oneclick Mall - Promociones"
        pageDescription={`Con esta operación puedes iniciar una consulta al servicio de consulta de bines contratado`}
        actualBread={actualBread}
        activeRoute="/promotions-oneclick-mall/info-bin"
        steps={getInfoBinTRXSteps(tbk_user, trxBin)}
        navigationItems={navigationItems}
      />
    </>
  );
}
