import { generateRandomTransactionData } from "@/helpers/transactions/transactionHelper";
import { SearchParams } from "@/types/general";
import { getErrorMessage} from "@/helpers/errorHandler";
import {
  CommitTransactionResult,
  StartTransactionData,
  TBKCallbackType,
  TBKCommitTransactionResponse,
  TBKCreateTransactionResponse,
  TBKTransactionStatusResponse,
  TBKRefundTransactionResponse,
} from "@/types/transactions";
import { headers } from "next/headers";
import { Options, WebpayPlus } from "transbank-sdk";
import {  ResultError } from "@/helpers/resultError";

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
  returnRoute: string = "/webpay-plus/commit",
  options?: Options
): Promise<CreateTransactionResult> => {
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
      options ?? WebpayPlus.getDefaultOptions()
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
};

export const commitTransaction = async (
  parametersReceivedByTBK: SearchParams,
  options?: Options
): Promise<CommitTransactionResult> => {
  const callbackType = getCallbackType(parametersReceivedByTBK);

  if (callbackType === TBKCallbackType.COMMIT_OK) {
    const commitResponse: TBKCommitTransactionResponse =
      await new WebpayPlus.Transaction(
        options ?? WebpayPlus.getDefaultOptions()
      ).commit(parametersReceivedByTBK.token_ws as string);

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
        TBK_TOKEN: TBK_TOKEN as string,
        TBK_ORDEN_COMPRA: TBK_ORDEN_COMPRA as string,
        TBK_ID_SESION: TBK_ID_SESION as string,
      },
    };
  }

  if (callbackType === TBKCallbackType.TIMEOUT) {
    const { TBK_ORDEN_COMPRA, TBK_ID_SESION } = parametersReceivedByTBK;

    return {
      type: TBKCallbackType.TIMEOUT,
      timeoutResponse: {
        TBK_ORDEN_COMPRA: TBK_ORDEN_COMPRA as string,
        TBK_ID_SESION: TBK_ID_SESION as string,
      },
    };
  }

  return {
    type: callbackType,
  };
};

export const getStatusTransaction = async (
  token_ws: string,
  options?: Options
) => {
  const trxStatus: TBKTransactionStatusResponse =
    await new WebpayPlus.Transaction(
      options ?? WebpayPlus.getDefaultOptions()
    ).status(token_ws as string);

  return trxStatus;
};
  
export const refundTransaction = async (
  token_ws: string,
  amount: number,
  options?: Options
): Promise<TBKRefundTransactionResponse|ResultError> => {
  
  try {
    const refundResponse = await new WebpayPlus.Transaction(
      options ?? WebpayPlus.getDefaultOptions()
    ).refund(token_ws as string, amount);

    return  refundResponse ;
  } catch (exception) {

    return { errorMessage: getErrorMessage(exception) };
  }
};
