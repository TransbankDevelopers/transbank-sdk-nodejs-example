import { generateRandomTxCompletaData } from "@/helpers/webpay-plus/transactionHelper";
import {
  Options,
  IntegrationCommerceCodes,
  IntegrationApiKeys,
  Environment,
  TransaccionCompleta,
} from "transbank-sdk";
import { getCardExpiry } from "@/helpers/webpay-plus/transactionHelper";

export const getWebpatMallDeferredOptions = () => {
  return new Options(
    IntegrationCommerceCodes.TRANSACCION_COMPLETA_DEFERRED,
    IntegrationApiKeys.WEBPAY,
    Environment.Integration
  );
};

export const createTxCompleteTransaction = async (
  cvv: number,
  cardNumber: string,
  cardExpirationDate: string
) => {
  const cardExpiration = getCardExpiry(cardExpirationDate);
  const randomTxCompletaData = generateRandomTxCompletaData();
  const createResponse = await new TransaccionCompleta.Transaction(
    getWebpatMallDeferredOptions()
  ).create(
    randomTxCompletaData.buyOrder,
    randomTxCompletaData.sessionId,
    randomTxCompletaData.amount,
    cvv,
    cardNumber,
    `${cardExpiration.year}/${cardExpiration.month}`
  );

  return {
    ...randomTxCompletaData,
    ...createResponse,
  };
};

export const commitTxCompleteTransaction = async (
  token: string,
  idQueryInstallments: string
) => {
  const commitResponse = await new TransaccionCompleta.Transaction(
    getWebpatMallDeferredOptions()
  ).commit(token, Number(idQueryInstallments));

  return commitResponse;
};

export const statusTxCompleteTransaction = async (token: string) => {
  const statusResponse = await new TransaccionCompleta.Transaction(
    getWebpatMallDeferredOptions()
  ).status(token);

  return statusResponse;
};

export const refundTxCompleteTransaction = async (
  token: string,
  amount: number
) => {
  const refundRequest = await new TransaccionCompleta.Transaction(
    getWebpatMallDeferredOptions()
  ).refund(token, amount);

  return refundRequest;
};

export const consultInstallmentsCompleteTransaction = async (
  token: string,
  installments: number
) => {
  const installmentsResponse = await new TransaccionCompleta.Transaction(
    getWebpatMallDeferredOptions()
  ).installments(token, installments);

  return installmentsResponse;
};

export const captureTxCompleteTransaction = async (
  token: string,
  buyOrder: string,
  authorizationCode: string,
  captureAmount: number
) => {
  const captureResponse = await new TransaccionCompleta.Transaction(
    getWebpatMallDeferredOptions()
  ).capture(token, buyOrder, authorizationCode, captureAmount);

  return captureResponse;
};
