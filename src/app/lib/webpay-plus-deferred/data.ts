import { TBKCaptureTransactionResponse } from "@/types/transactions";

import {
  Environment,
  IntegrationApiKeys,
  IntegrationCommerceCodes,
  Options,
  WebpayPlus,
} from "transbank-sdk";

export type CaptureTransactionDTO = {
  token: string;
  buyOrder: string;
  authorizationCode: string;
  captureAmount: number;
};

export const getWebpayPlusDeferredOptions = () => {
  return new Options(
    IntegrationCommerceCodes.WEBPAY_PLUS_DEFERRED,
    IntegrationApiKeys.WEBPAY,
    Environment.Integration
  );
};

export const captureTransaction = async (
  params: CaptureTransactionDTO
): Promise<TBKCaptureTransactionResponse> => {
  const { token, buyOrder, authorizationCode, captureAmount } = params;

  WebpayPlus.configureForTestingDeferred();

  const captureResponse = await new WebpayPlus.Transaction(
    getWebpayPlusDeferredOptions()
  ).capture(token, buyOrder, authorizationCode, captureAmount);

  return captureResponse;
};
