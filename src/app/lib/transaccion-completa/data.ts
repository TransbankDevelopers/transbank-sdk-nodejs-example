import { generateRandomTxCompletaData } from "@/helpers/webpay-plus/transactionHelper";
import {
  Options,
  IntegrationCommerceCodes,
  IntegrationApiKeys,
  Environment,
  TransaccionCompleta,
} from "transbank-sdk";

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

export const commitTxCompleteTransaction = async (
  token: string,
  idQueryInstallments: string,
  deferred_period_index: string,
  grace_period: boolean
) => {
  const commitResponse = await new TransaccionCompleta.Transaction(
    getWebpatMallDeferredOptions()
  ).commit(
    token,
    Number(idQueryInstallments),
    Number(deferred_period_index),
    grace_period
  );

  return commitResponse;
};

export const statusTxCompleteTransaction = async (token: string) => {
  const statusResponse = await new TransaccionCompleta.Transaction(
    getWebpatMallDeferredOptions()
  ).status(token);

  return statusResponse;
};
