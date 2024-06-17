import { generateRandomTransactionDataMall } from "@/helpers/transactions/transactionHelper";
import { SearchParams } from "@/types/general";
import {
  CommitMallTransactionResult,
  StartTransactionDataMall,
  TBKCallbackType,
  TBKMallCommitTransactionResponse,
  TBKCreateTransactionResponse,
  TBKMallTransactionStatusResponse,
} from "@/types/transactions";
import { headers } from "next/headers";
import { WebpayPlus, TransactionDetail, Options } from "transbank-sdk";

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

export const createMallTransaction =
  async (): Promise<CreateTransactionResult> => {
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
        WebpayPlus.getDefaultOptions()
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
  };

export const commitTransaction = async (
  parametersReceivedByTBK: SearchParams,
  options?: Options
): Promise<CommitMallTransactionResult> => {
  const callbackType = getCallbackType(parametersReceivedByTBK);

  if (callbackType === TBKCallbackType.COMMIT_OK) {
    const commitResponse: TBKMallCommitTransactionResponse =
      await new WebpayPlus.MallTransaction(
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
  const trxStatus: TBKMallTransactionStatusResponse =
    await new WebpayPlus.MallTransaction(
      options ?? WebpayPlus.getDefaultOptions()
    ).status(token_ws as string);

  return trxStatus;
};

export const refundTransaction = async (
  token_ws: string,
  amount: number,
  buyOrder: string,
  commerceCode: string,
  options?: Options
) => {
  const refundResponse = await new WebpayPlus.MallTransaction(
    options ?? WebpayPlus.getDefaultOptions()
  ).refund(token_ws as string, buyOrder, commerceCode, amount);

  return refundResponse;
};
