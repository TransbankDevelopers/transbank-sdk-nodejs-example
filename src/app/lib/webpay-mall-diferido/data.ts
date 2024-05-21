import { generateRandomTransactionDataMallDeferred } from "@/helpers/webpay-plus/transactionHelper";
import { SearchParams } from "@/types/general";
import {
  CommitMallTransactionResult,
  StartTransactionDataMall,
  TBKCallbackType,
  TBKMallCommitTransactionResponse,
  TBKCreateTransactionResponse,
  TBKMallTransactionStatusResponse,
  TBKCaptureTransactionResponse,
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

export const getWebpatMallDeferredOptions = () => {
  return new Options(
    IntegrationCommerceCodes.WEBPAY_PLUS_MALL_DEFERRED,
    IntegrationApiKeys.WEBPAY,
    Environment.Integration
  );
};

export const createMallTransaction =
  async (): Promise<CreateTransactionResult> => {
    const headersList = headers();
    const protocol = headersList.get("x-forwarded-proto") ?? "http"; // https://github.com/vercel/next.js/issues/2469
    const host = headersList.get("host") ?? "localhost:3000";

    const RandomTransactionDataMallDeferred =
      generateRandomTransactionDataMallDeferred(protocol, host);

    const details = [
      new TransactionDetail(
        RandomTransactionDataMallDeferred.amount,
        RandomTransactionDataMallDeferred.commerceCode,
        RandomTransactionDataMallDeferred.childBuyOrder
      ),
      new TransactionDetail(
        RandomTransactionDataMallDeferred.amount2,
        RandomTransactionDataMallDeferred.commerceCode,
        RandomTransactionDataMallDeferred.childBuyOrder2
      ),
    ];

    const createResponse: TBKCreateTransactionResponse =
      await new WebpayPlus.MallTransaction(
        getWebpatMallDeferredOptions()
      ).create(
        RandomTransactionDataMallDeferred.buyOrder,
        RandomTransactionDataMallDeferred.sessionId,
        RandomTransactionDataMallDeferred.returnUrl,
        details
      );

    return {
      ...RandomTransactionDataMallDeferred,
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
        getWebpatMallDeferredOptions()
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

export const getStatusTransaction = async (token_ws: string) => {
  const trxStatus: TBKMallTransactionStatusResponse =
    await new WebpayPlus.MallTransaction(getWebpatMallDeferredOptions()).status(
      token_ws
    );

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
    getWebpatMallDeferredOptions()
  ).refund(token_ws, buyOrder, commerceCode, amount);

  return refundResponse;
};

type CaptureTransactionDTO = {
  childCommerceCode: string;
  token: string;
  buyOrder: string;
  authorizationCode: string;
  captureAmount: number;
};

export const captureTransaction = async (
  params: CaptureTransactionDTO
): Promise<TBKCaptureTransactionResponse> => {
  const {
    childCommerceCode,
    token,
    buyOrder,
    authorizationCode,
    captureAmount,
  } = params;

  WebpayPlus.configureForTestingDeferred();
  const captureResponse = await new WebpayPlus.MallTransaction(
    getWebpatMallDeferredOptions()
  ).capture(
    childCommerceCode,
    token,
    buyOrder,
    authorizationCode,
    captureAmount
  );

  return captureResponse;
};
