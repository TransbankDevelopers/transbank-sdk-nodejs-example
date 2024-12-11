import {
  Environment,
  IntegrationApiKeys,
  IntegrationCommerceCodes,
  Oneclick,
  Options,
} from "transbank-sdk";
import { TBKCaptureTransactionResponse } from "@/types/transactions";
import {  ResultError } from "@/helpers/resultError";
import { getErrorMessage} from "@/helpers/errorHandler";

export type CaptureOneclickMallDeferredProps = {
  commerceCode: string;
  childBuyOrder: string;
  authorizationCode: string;
  captureAmount: number;
};

export const getOneclickMallDeferredOptions = () => {
  return new Options(
    IntegrationCommerceCodes.ONECLICK_MALL_DEFERRED,
    IntegrationApiKeys.WEBPAY,
    Environment.Integration
  );
};

export const captureOneclickMallDeferredTransaction = async (
  props: CaptureOneclickMallDeferredProps
): Promise<TBKCaptureTransactionResponse|ResultError> => {
  try{
  const { commerceCode, childBuyOrder, authorizationCode, captureAmount } =
    props;

  const captureResponse = await new Oneclick.MallTransaction(
    getOneclickMallDeferredOptions()
  ).capture(commerceCode, childBuyOrder, authorizationCode, captureAmount);

  return captureResponse;
  } catch (exception) {
    return { errorMessage: getErrorMessage(exception) };
  }
};
