import { generateRandomTransactionDataMall } from "@/helpers/transactions/transactionHelper";
import { SearchParams } from "@/types/general";
import { getErrorMessage } from "@/helpers/errorHandler";
import {
  CommitMallTransactionResult,
  StartTransactionDataMall,
  TBKCallbackType,
  TBKMallCommitTransactionResponse,
  TBKCreateTransactionResponse,
  TBKMallTransactionStatusResponse,
  TBKRefundTransactionResponse,
} from "@/types/transactions";
import { headers } from "next/headers";
import {
  WebpayPlus,
  TransactionDetail,
  Options,
  IntegrationCommerceCodes,
  IntegrationApiKeys,
  Environment,
} from "transbank-sdk";
import { ResultError } from "@/helpers/resultError";

export type CreateTransactionResult = TBKCreateTransactionResponse &
  StartTransactionDataMall;

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

export const getWebpayMallOptions = () => {
  return new Options(
    IntegrationCommerceCodes.WEBPAY_PLUS_MALL,
    IntegrationApiKeys.WEBPAY,
    Environment.Integration
  );
};

export const createMallTransaction =
  async (): Promise<CreateTransactionResult | ResultError> => {
    try {
      const headersList = headers();
      const protocol = headersList.get("x-forwarded-proto") || "http"; // https://github.com/vercel/next.js/issues/2469
      const host = headersList.get("host") || "localhost:3000";

      const randomTransactionDataMall = generateRandomTransactionDataMall(
        protocol as string,
        host
      );

      const details = [
        new TransactionDetail(
          randomTransactionDataMall.amount,
          randomTransactionDataMall.commerceCode,
          randomTransactionDataMall.childBuyOrder
        ),
        new TransactionDetail(
          randomTransactionDataMall.amount2,
          randomTransactionDataMall.commerceCode,
          randomTransactionDataMall.childBuyOrder2
        ),
      ];

      const createResponse: TBKCreateTransactionResponse =
        await new WebpayPlus.MallTransaction(
          getWebpayMallOptions()
        ).create(
          randomTransactionDataMall.buyOrder,
          randomTransactionDataMall.sessionId,
          randomTransactionDataMall.returnUrl,
          details
        );

      return {
        ...randomTransactionDataMall,
        ...createResponse,
      };
    } catch (exception) {
      return { errorMessage: getErrorMessage(exception) };
    }
  };

export const commitTransaction = async (
  parametersReceivedByTBK: SearchParams,
  options?: Options
): Promise<CommitMallTransactionResult | ResultError> => {
  try {
    const callbackType = getCallbackType(parametersReceivedByTBK);

    if (callbackType === TBKCallbackType.COMMIT_OK) {
      const commitResponse: TBKMallCommitTransactionResponse =
        await new WebpayPlus.MallTransaction(
          options ?? getWebpayMallOptions()
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
  } catch (exception) {
    return { errorMessage: getErrorMessage(exception) };
  }
};

export const getStatusTransaction = async (
  token_ws: string,
  options?: Options
): Promise<TBKMallTransactionStatusResponse | ResultError> => {
  try {
    const trxStatus: TBKMallTransactionStatusResponse =
      await new WebpayPlus.MallTransaction(
        options ?? getWebpayMallOptions()
      ).status(token_ws as string);

    return trxStatus;
  } catch (exception) {
    return { errorMessage: getErrorMessage(exception) };
  }
};

export const refundTransaction = async (
  token_ws: string,
  amount: number,
  buyOrder: string,
  commerceCode: string,
  options?: Options
): Promise<TBKRefundTransactionResponse | ResultError> => {
  try {
    const refundResponse = await new WebpayPlus.MallTransaction(
      options ?? getWebpayMallOptions()
    ).refund(token_ws as string, buyOrder, commerceCode, amount);

    return refundResponse
  } catch (exception) {

    return { errorMessage: getErrorMessage(exception) };
  }
};
