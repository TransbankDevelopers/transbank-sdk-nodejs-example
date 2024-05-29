import { generateRandomTxCompletaData } from "@/helpers/webpay-plus/transactionHelper";
import { SearchParams } from "@/types/general";
import { TBKCallbackType } from "@/types/transactions";
import {
  Options,
  IntegrationCommerceCodes,
  IntegrationApiKeys,
  Environment,
  TransaccionCompleta,
} from "transbank-sdk";

const getCallbackType = (parameters: SearchParams): TBKCallbackType => {
  const { token_ws, TBK_TOKEN, TBK_ORDEN_COMPRA, TBK_ID_SESION } = parameters;

  if (token_ws && !(TBK_TOKEN && TBK_ORDEN_COMPRA && TBK_ID_SESION)) {
    return TBKCallbackType.COMMIT_OK;
  }

  if (TBK_ID_SESION && TBK_ORDEN_COMPRA && !TBK_TOKEN) {
    return TBKCallbackType.TIMEOUT;
  }

  if (TBK_ID_SESION && TBK_ORDEN_COMPRA && TBK_TOKEN) {
    return TBKCallbackType.ABORTED;
  }

  return TBKCallbackType.INVALID_PAYMENT;
};

export const getWebpatMallDeferredOptions = () => {
  return new Options(
    IntegrationCommerceCodes.TRANSACCION_COMPLETA,
    IntegrationApiKeys.WEBPAY,
    Environment.Integration
  );
};

export const createTxCompleteTransaction = async (
  cvv: number,
  cardNumber: string,
  cardExpirationDate: string
) => {
  console.log("createTxCompleteTransaction -> cvv", cvv);
  console.log("createTxCompleteTransaction -> cardNumber", cardNumber);
  console.log(
    "createTxCompleteTransaction -> cardExpirationDate",
    cardExpirationDate
  );
  const RandomTxCompletaData = generateRandomTxCompletaData();
  const createResponse = await new TransaccionCompleta.Transaction(
    getWebpatMallDeferredOptions()
  ).create(
    RandomTxCompletaData.buyOrder,
    RandomTxCompletaData.sessionId,
    RandomTxCompletaData.amount,
    cvv,
    cardNumber,
    cardExpirationDate
  );

  return {
    ...RandomTxCompletaData,
    ...createResponse,
  };
};