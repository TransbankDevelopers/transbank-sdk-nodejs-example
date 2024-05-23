import "./page.css";
import { Route } from "@/types/menu";
import { Layout } from "@/components/layout/Layout";
import Head from "next/head";
import { NextPageProps } from "@/types/general";
import { NavigationItem } from "@/components/layout/Navigation";
import { authorizeOneClickMallTransaction } from "@/app/lib/oneclick-mall/data";
import { getAuthorizeSteps } from "../content/steps/authorize";
import { CaptureCard } from "@/app/webpay-mall-diferido/commit/components/CaptureCard";

const getActualBread = (): Route[] => {
  return [
    {
      name: "Inicio",
      path: "/",
    },
    {
      name: "Webpay Oneclick Mall Diferido",
      path: "/oneclick-mall-deferred",
    },
    {
      name: "Autorizar pago",
      path: "/oneclick-mall-deferred/authorize",
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
  const { user_name, tbk_user, amount, installments } = searchParams;
  const trxData = await authorizeOneClickMallTransaction(
    user_name as string,
    tbk_user as string,
    Number(amount),
    Number(installments)
  );

  return (
    <>
      <Head>
        <title>
          Transbank SDK Node - Webpay Oneclick Mall Diferido - Autorizar pago
        </title>
      </Head>
      <Layout
        pageTitle="Webpay Oneclick Mall - Autorizar pago"
        pageDescription="En este primer paso, procederemos a autorizar una transacción en la tarjeta que ha sido previamente inscrita."
        actualBread={getActualBread()}
        navigationItems={navigationItems}
        activeRoute="/oneclick-mall-deferred/authorize"
        steps={getAuthorizeSteps(trxData)}
        additionalContent={
          <div className="capture-container">
            {trxData?.details?.map((detail, key) => {
              return (
                <div className="capture-card-mall" key={key}>
                  <CaptureCard
                    amount={Number(amount)}
                    parentBuyOrder={trxData.buy_order}
                    buyOrder={detail.buy_order}
                    commerceCode={detail.commerce_code}
                    authorizationCode={detail.authorization_code}
                    showCommerceCode
                    isWebpay={false}
                  />
                </div>
              );
            })}
          </div>
        }
      />
    </>
  );
}
