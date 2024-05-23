"use client";
import { Button } from "@/components/button/Button";
import { Card } from "@/components/card/Card";
import { InputText } from "@/components/input/InputText";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { CaptureProps } from "@/types/transactions";
import { Text, TextVariant } from "@/components/text/Text";

export const CaptureCard = ({
  token,
  amount,
  buyOrder,
  commerceCode,
  authorizationCode,
  isWebpay = true,
  showCommerceCode = false,
  parentBuyOrder,
}: CaptureProps) => {
  const router = useRouter();
  const [captureAmount, setCaptureAmount] = useState<number>(
    Number(amount || 0)
  );

  const handleRefund = (value: string) => {
    if (isNaN(Number(value))) return;
    setCaptureAmount(Number(value));
  };

  const handleGoToTRXCapture = () => {
    router.push(
      `/${
        isWebpay ? "webpay-mall-diferido" : "oneclick-mall-deferred"
      }/capture?${
        isWebpay ? `token=${token}&` : ""
      }captureAmount=${captureAmount}&buyOrder=${
        parentBuyOrder ?? buyOrder
      }&childCommerceCode=${commerceCode}&authorizationCode=${authorizationCode}${
        parentBuyOrder ? `&childBuyOrder=${buyOrder}` : ""
      }`
    );
  };

  return (
    <Card className="refund-card">
      <div>
        {showCommerceCode ? (
          <>
            <Text
              className="refund-card-title-alt"
              variant={TextVariant.PARAGRAPH}
            >
              Codigo de Comercio: <b>{commerceCode}</b>
            </Text>
            <Text
              className="refund-card-title-alt"
              variant={TextVariant.PARAGRAPH}
            >
              Orden de Compra: <b>{buyOrder}</b>
            </Text>
          </>
        ) : (
          <div className="refund-card-title">
            Orden De Compra <span className="value">{`${buyOrder}`}</span>
          </div>
        )}
      </div>
      <InputText
        label="Monto a Capturar:"
        value={captureAmount}
        onChange={handleRefund}
      />
      <div className="button-container">
        <Button
          text="Capturar"
          className="small-button"
          onClick={handleGoToTRXCapture}
        />
      </div>
    </Card>
  );
};
