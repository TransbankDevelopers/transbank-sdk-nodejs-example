import { TBKfullTxCaptureResponse } from "@/types/transactions";
import {
  Environment,
  IntegrationApiKeys,
  IntegrationCommerceCodes,
  Options,
  TransaccionCompleta,
} from "transbank-sdk";

export const getFullTransactionMallDeferredOptions = () => {
  return new Options(
    IntegrationCommerceCodes.TRANSACCION_COMPLETA_MALL_DEFERRED,
    IntegrationApiKeys.WEBPAY,
    Environment.Integration
  );
};

type CaptureProps = {
  token: string;
  childCommerceCode: string;
  childBuyOrder: string;
  authorizationCode: string;
  amount: number;
};

export const captureTransaccionCompletaMallDeferido = async (
  props: CaptureProps
): Promise<TBKfullTxCaptureResponse> => {
  const { token, childBuyOrder, childCommerceCode, authorizationCode, amount } =
    props;

  const resp = await new TransaccionCompleta.MallTransaction(
    getFullTransactionMallDeferredOptions()
  ).capture(token, childCommerceCode, childBuyOrder, authorizationCode, amount);

  return resp;
};
