"use client";
import "./page.css";
import { Layout } from "@/components/layout/Layout";
import { NavigationItem } from "@/components/layout/Navigation";
import { Route } from "@/types/menu";
import { TBKFinishInscriptionResponse } from "@/types/transactions";
import Head from "next/head";
import { getFinishInscritionSteps } from "../content/steps/finish";
import { Card } from "@/components/card/Card";
import { Text } from "@/components/text/Text";
import { Button } from "@/components/button/Button";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { localStorageUserKey } from "@/consts";
import { InputText } from "@/components/input/InputText";

export type ContentOneclickProps = {
  actualBread: Route[];
  navigationItems: NavigationItem[];
  token: string;
  trxData: TBKFinishInscriptionResponse;
};

export const ContentOneClickMall = (props: ContentOneclickProps) => {
  const router = useRouter();
  const [userName, setUserName] = useState("User-XXXX");
  const [installments, setInstallments] = useState<number>(0);
  const [amount, setAmount] = useState<number>(
    Math.floor(Math.random() * 1000) + 1001
  );

  useEffect(() => {
    const user = window.localStorage.getItem(localStorageUserKey);
    if (user) {
      setUserName(user);
    }
  }, []);

  const handleRemoveUser = () => {
    router.push(
      `/oneclick-mall-deferred/remove-user?tbk_user=${props.trxData.tbk_user}&user_name=${userName}`
    );
  };

  const handleAuthorizeTransaction = () => {
    router.push(
      `/oneclick-mall-deferred/authorize?tbk_user=${props.trxData.tbk_user}&user_name=${userName}&amount=${amount}&installments=${installments}`
    );
  };

  const handleAmountChange = (value: string) => {
    if (isNaN(Number(value))) return;
    setAmount(Number(value));
  };

  const handleInstallmentsChange = (value: string) => {
    if (isNaN(Number(value))) return;
    setInstallments(Number(value));
  };

  return (
    <>
      <Head>
        <title>Transbank SDK Node - Finalizar inscripción</title>
      </Head>
      <Layout
        pageTitle="Webpay Oneclick Mall Diferido - Finalizar inscripción"
        pageDescription="En esta fase, completaremos el proceso de inscripción, permitiéndonos posteriormente realizar cargos a la tarjeta que el tarjetahabiente haya inscrito."
        actualBread={props.actualBread}
        activeRoute="/oneclick-mall-deferred/finish"
        navigationItems={props.navigationItems}
        steps={getFinishInscritionSteps(
          props.token,
          props.trxData,
          userName as string
        )}
        additionalContent={
          <div className="mt-8">
            <Card className="finish-card">
              <div className="finish-card-inputs">
                <InputText
                  label="Monto a autorizar"
                  value={Number(amount)}
                  onChange={handleAmountChange}
                />
                <InputText
                  label="Cuotas"
                  value={installments}
                  onChange={handleInstallmentsChange}
                />
              </div>
              <div className="finish-card-divided">
                <div className="finish-text">
                  <Text>
                    Después de una inscripción exitosa, tienen dos opciones:
                    autorizar un pago o borrar al usuario que se acaba de
                    inscribir.
                  </Text>
                </div>

                <div className="button-container">
                  <Button text="BORRAR USUARIO" onClick={handleRemoveUser} />
                  <Button
                    text="AUTORIZAR UN PAGO"
                    onClick={handleAuthorizeTransaction}
                  />
                </div>
              </div>
            </Card>
          </div>
        }
      />
    </>
  );
};
