import { Layout } from "@/components/layout/Layout";
import { getCommitSteps } from "@/app/patpass-comercio/content/steps/commit";
import Head from "next/head";
import { statusPatpassTransaction } from "@/app/lib/patpass-comercio/data";
import { cookies } from "next/headers";
import { patpassJToken } from "@/consts";
import { Card } from "@/components/card/Card";
import { InputText } from "@/components/input/InputText";
import { Button, ButtonTypes } from "@/components/button/Button";

import { TBKPatpassStatusTxResponse } from "@/types/transactions";

const actualBread = [
  {
    name: "Inicio",
    path: "/",
  },
  {
    name: "Patpass Comercio",
    path: "/patpass-comercio",
  },
  {
    name: "Confirmar transacción",
    path: "/patpass-comercio/commit",
  },
];

export default async function CommitTransaction() {
  const cookiesStore = cookies();

  const data = cookiesStore.get(patpassJToken);
  const { j_token } = data?.value && JSON.parse(data.value);

  const commitResponse = await statusPatpassTransaction(j_token);

  return (
    <>
      <Head>
        <title>PatPass Comercio - Confirmar Registro</title>
      </Head>
      <Layout
        pageTitle="PatPass Comercio - Confirmar Registro"
        pageDescription={
          <p>
            Es necesario confirmar el registro, este solo se puede hacer una
            sola vez o retornara error.
          </p>
        }
        actualBread={actualBread}
        activeRoute="/patpass-comercio/commit"
        steps={getCommitSteps(commitResponse, j_token)}
        additionalContent={
          <Card className="card-pay">
            <span className="title">Formulario de redirección</span>
            <InputText label="Token" value={j_token} />
            <div className="button-container">
              <form action={commitResponse.voucherUrl} method="POST">
                <input type="hidden" name="tokenComercio" value={j_token} />
                <Button
                  text="VER VOUCHER"
                  className="button"
                  type={ButtonTypes.SUBMIT}
                />
              </form>
            </div>
          </Card>
        }
      />
    </>
  );
}
