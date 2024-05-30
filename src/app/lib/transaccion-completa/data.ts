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
