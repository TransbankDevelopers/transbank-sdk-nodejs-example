import { ResultError } from "@/helpers/resultError";
import { getErrorMessage } from "@/helpers/errorHandler";
import {
  Environment,
  IntegrationApiKeys,
  IntegrationCommerceCodes,
  Options,
  WebpayPlus,
} from "transbank-sdk";
import { generateRandomTransactionData } from "@/helpers/transactions/transactionHelper";
import { SearchParams } from "@/types/general";
import {
  CommitTransactionResult,
  StartTransactionData,
  TBKCallbackType,
  TBKCommitTransactionResponse,
  TBKCreateTransactionResponse,
  TBKTransactionStatusResponse,
  TBKRefundTransactionResponse,
  TBKCaptureTransactionResponse
} from "@/types/transactions";
import { headers } from "next/headers";

export const getWebpayPlusDeferredOptions = () => {
  return new Options(
    IntegrationCommerceCodes.WEBPAY_PLUS_DEFERRED,
    IntegrationApiKeys.WEBPAY,
    Environment.Integration
  );
};

export type CreateTransactionResult = TBKCreateTransactionResponse &
  StartTransactionData;

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



export const createTransaction = async (
  returnRoute: string
): Promise<CreateTransactionResult | ResultError> => {
  try {
    const headersList = headers();
    const protocol = headersList.get("x-forwarded-proto") || "http"; // https://github.com/vercel/next.js/issues/2469
    const host = headersList.get("host") || "localhost:3000";

    const startTransactionData = generateRandomTransactionData(
      protocol as string,
      host,
      returnRoute
    );

    const createResponse: TBKCreateTransactionResponse =
      await new WebpayPlus.Transaction(
        getWebpayPlusDeferredOptions()
      ).create(
        startTransactionData.buyOrder,
        startTransactionData.sessionId,
        startTransactionData.amount,
        startTransactionData.returnUrl
      );

    return {
      ...startTransactionData,
      ...createResponse,
    };
  } catch (exception) {
    return { errorMessage: getErrorMessage(exception) };
  }
};

export const commitTransaction = async (
  parametersReceivedByTBK: SearchParams
): Promise<CommitTransactionResult | ResultError> => {
  try {
    const callbackType = getCallbackType(parametersReceivedByTBK);
    if (callbackType === TBKCallbackType.COMMIT_OK) {
      const commitResponse: TBKCommitTransactionResponse =
        await new WebpayPlus.Transaction(
          getWebpayPlusDeferredOptions()
        ).commit(parametersReceivedByTBK.token_ws);

      return {
        type: TBKCallbackType.COMMIT_OK,
        commitResponse,
      };
    }

    if (callbackType === TBKCallbackType.ABORTED) {
      const { TBK_TOKEN, TBK_ORDEN_COMPRA, TBK_ID_SESION } =
        parametersReceivedByTBK;

      return {
        type: TBKCallbackType.ABORTED,
        abortedResponse: {
          TBK_TOKEN: TBK_TOKEN,
          TBK_ORDEN_COMPRA: TBK_ORDEN_COMPRA,
          TBK_ID_SESION: TBK_ID_SESION,
        },
      };
    }

    if (callbackType === TBKCallbackType.TIMEOUT) {
      const { TBK_ORDEN_COMPRA, TBK_ID_SESION } = parametersReceivedByTBK;

      return {
        type: TBKCallbackType.TIMEOUT,
        timeoutResponse: {
          TBK_ORDEN_COMPRA: TBK_ORDEN_COMPRA,
          TBK_ID_SESION: TBK_ID_SESION
        },
      };
    }

    return {
      type: callbackType,
    };
  } catch (exception) {
    return { errorMessage: getErrorMessage(exception) };
  }
};

export const getStatusTransaction = async (
  token_ws: string
): Promise<TBKTransactionStatusResponse | ResultError> => {
  try {
    const trxStatus: TBKTransactionStatusResponse =
      await new WebpayPlus.Transaction(
        getWebpayPlusDeferredOptions()
      ).status(token_ws);

    return trxStatus;
  } catch (exception) {
    return { errorMessage: getErrorMessage(exception) };
  }
};

export const refundTransaction = async (
  token_ws: string,
  amount: number
): Promise<TBKRefundTransactionResponse | ResultError> => {

  try {
    const refundResponse = await new WebpayPlus.Transaction(
      getWebpayPlusDeferredOptions()
    ).refund(token_ws, amount);

    return refundResponse;
  } catch (exception) {

    return { errorMessage: getErrorMessage(exception) };
  }
};


export type CaptureTransactionDTO = {
  token: string;
  buyOrder: string;
  authorizationCode: string;
  captureAmount: number;
};

export const captureTransaction = async (
  params: CaptureTransactionDTO
): Promise<TBKCaptureTransactionResponse | ResultError> => {
  try {
    const { token, buyOrder, authorizationCode, captureAmount } = params;

    const captureResponse = await new WebpayPlus.Transaction(
      getWebpayPlusDeferredOptions()
    ).capture(token, buyOrder, authorizationCode, captureAmount);

    return captureResponse;
  } catch (exception) {
    return { errorMessage: getErrorMessage(exception) };
  }
};
