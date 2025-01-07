"use client";
import { useState } from "react";
import { Button } from "@/components/button/Button";
import { Card } from "@/components/card/Card";
import { InputText } from "@/components/input/InputText";

export type AuthorizeFormProps = {
  tbkUser: string;
  userName: string;
  isDeferred?: boolean;
  productLink?: string;
};

export const AuthorizeForm = (props: AuthorizeFormProps) => {
  const { isDeferred = false, productLink = "/oneclick-mall" } = props;
  const [amountStoreOne, setAmountStoreOne] = useState<number>(1500);
  const [amountStoretwo, setAmountStoretwo] = useState<number>(1750);
  const [installmentsStoreOne, setInstallmentsStoreOne] = useState<number>(0);
  const [installmentsStoretwo, setInstallmentsStoretwo] = useState<number>(0);

  const handleAmountStoreOneChange = (value: string) => {
    setAmountStoreOne(Number(value));
  };

  const handleInstallmentsStoreOneChange = (value: string) => {
    setInstallmentsStoreOne(Number(value));
  };

  const handleAmountStoreTwoChange = (value: string) => {
    setAmountStoretwo(Number(value));
  };

  const handleInstallmentsStoreTwoChange = (value: string) => {
    setInstallmentsStoretwo(Number(value));
  };

  const trxRefundLink = {
    pathname: `${productLink}${isDeferred ? "-deferred" : ""}/authorize`,
    query: {
      tbkUser: props.tbkUser,
      userName: props.userName,
      amountStoreOne,
      amountStoretwo,
      installmentsStoreOne,
      installmentsStoretwo,
    },
  };

  return (
    <Card className="card-pay">
      <span className="large-title">tienda 1</span>
      <div className="tbk-input-group mb-6">
        <InputText
          name="amountStoreOne"
          label="monto:"
          value={amountStoreOne}
          onChange={handleAmountStoreOneChange}
          isNumber
        />
        <InputText
          name="installmentsStoreOne"
          label="cuotas:"
          value={installmentsStoreOne}
          onChange={handleInstallmentsStoreOneChange}
          isNumber
        />
      </div>

      <span className="large-title">tienda 2</span>
      <div className="tbk-input-group">
        <InputText
          name="amountStoretwo"
          label="monto:"
          value={amountStoretwo}
          onChange={handleAmountStoreTwoChange}
          isNumber
        />
        <InputText
          name="installmentsStoretwo"
          label="cuotas:"
          value={installmentsStoretwo}
          onChange={handleInstallmentsStoreTwoChange}
          isNumber
        />
      </div>
      <div className="button-container">
        <Button
          text="AUTORIZAR"
          className="small-button"
          link={trxRefundLink}
        />
      </div>
    </Card>
  );
};
