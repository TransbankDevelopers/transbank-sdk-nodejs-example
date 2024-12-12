import "./page.css";
import { Route } from "@/types/menu";
import { Layout } from "@/components/layout/Layout";
import Head from "next/head";
import { NextPageProps } from "@/types/general";
import { MallRefundCard } from "../../../components/mall-refund-card/MallRefundCard";
import { NavigationItem } from "@/components/layout/Navigation";
import { authorizeOneClickMallTransaction } from "@/app/lib/oneclick-mall/data";
import { getAuthorizeSteps } from "../content/steps/authorize";
import { MallStatusButton } from "../../../components/mall-status-button/MallStatusButton";
import { CustomError } from "@/components/customError/CustomError";

const getActualBread = (): Route[] => {
  return [
    {
      name: "Inicio",
      path: "/",
    },
    {
      name: "Webpay Oneclick",
      path: "/oneclick-mall",
    },
    {
      name: "Autorizar pago",
      path: "/oneclick-mall/authorize",
    },
  ];
};

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
    title: "Consultas",
    sectionId: "consultas",
  },
];

export default async function AuthorizeTransactionPage({
  searchParams,
}: NextPageProps) {
  const { user_name, tbk_user } = searchParams;
  const trxData = await authorizeOneClickMallTransaction(
    user_name as string,
    tbk_user as string
  );
  if ("errorMessage" in trxData) {
    return (
      <CustomError
        errorMessage={trxData.errorMessage}
        actualBread={getActualBread()}
      />
    );
  }
  return (
    <>
      <Head>
        <title>
          Transbank SDK Node - Webpay Oneclick Mall - Autorizar pago
        </title>
      </Head>
      <Layout
        pageTitle="Webpay Oneclick Mall - Autorizar pago"
        pageDescription="En este primer paso, procederemos a autorizar una transacción en la tarjeta que ha sido previamente inscrita."
        actualBread={getActualBread()}
        navigationItems={navigationItems}
        activeRoute="/oneclick-mall/authorize"
        steps={getAuthorizeSteps(trxData)}
        additionalContent={
          <>
            {trxData?.details.map((detail) => (
              <MallRefundCard
                key={detail.buy_order}
                buyOrder={trxData.buy_order}
                detail={detail}
              />
            ))}
            <MallStatusButton buyOrder={trxData.buy_order} />
          </>
        }
      />
    </>
  );
}
