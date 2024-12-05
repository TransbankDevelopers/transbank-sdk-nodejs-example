import {
  Environment,
  IntegrationApiKeys,
  IntegrationCommerceCodes,
  Oneclick,
  Options,
  TransactionDetail,
} from "transbank-sdk";
import { generateRandomTransactionDataOneclickMall } from "@/helpers/transactions/transactionHelper";
import { headers } from "next/headers";
import { getErrorMessage} from "@/helpers/errorHandler";
import {
  StartTransactionDataOneclickMall,
  TBKAuthorizeTransactionResponse,
  TBKCreateOneclickMallTransactionResponse,
  TBKFinishInscriptionResponse,
  TBKRefundMallTransactionResponse,
} from "@/types/transactions";
import { getOneclickMallDeferredOptions } from "../oneclick-mall-deferred/data";
import {  ResultError } from "@/helpers/resultError";

export type CreateTransactionResult = TBKCreateOneclickMallTransactionResponse &
  StartTransactionDataOneclickMall;

type RefundOneClickMallTransactionProps = {
  buyOrder: string;
  childCommerceCode: string;
  childBuyOrder: string;
  amount: number;
  isDeferred?: boolean;
};

export interface AuthorizeTransactionOptions {
  prmDetails?: TransactionDetail[];
  prmBuyOrder?: string;
  deferredAmount?: number;
  deferredInstallments?: number;
}

export const getOneclickMallOptions = () => {
  return new Options(
    IntegrationCommerceCodes.ONECLICK_MALL,
    IntegrationApiKeys.WEBPAY,
    Environment.Integration
  );
};

export const createOneclickMallTransaction = async (
  isDeferred = false
): Promise<CreateTransactionResult> => {
  const headersList = headers();
  const protocol = headersList.get("x-forwarded-proto") || "http"; // https://github.com/vercel/next.js/issues/2469
  const host = headersList.get("host") || "localhost:3000";

  const trxData = generateRandomTransactionDataOneclickMall(
    protocol,
    host,
    isDeferred || false
  );

  const { userName, email, returnUrl } = trxData;

  const startResponse = await new Oneclick.MallInscription(
    isDeferred ? getOneclickMallDeferredOptions() : getOneclickMallOptions()
  ).start(userName, email, returnUrl);

  return { ...startResponse, ...trxData };
};

export const finishOneclickMallTransaction = async (
  token: string,
  isDeferred?: boolean
): Promise<TBKFinishInscriptionResponse> => {
  const commitResponse = await new Oneclick.MallInscription(
    isDeferred ? getOneclickMallDeferredOptions() : getOneclickMallOptions()
  ).finish(token);

  return commitResponse;
};

export const removeUserInscriptionOneclick = async (
  tbkUser: string,
  userName: string,
  isDeferred = false
) => {
  return await new Oneclick.MallInscription(
    isDeferred ? getOneclickMallDeferredOptions() : getOneclickMallOptions()
  ).delete(tbkUser, userName);
};

export const authorizeOneClickMallTransaction = async (
  userName: string,
  tbkUser: string,
  isDeferred?: boolean,
  options?: AuthorizeTransactionOptions
): Promise<TBKAuthorizeTransactionResponse> => {
  const { prmDetails, prmBuyOrder, deferredAmount, deferredInstallments } =
    options || {};
  const details: TransactionDetail[] = [];
  const commerceCodes = [
    isDeferred
      ? IntegrationCommerceCodes.ONECLICK_MALL_CHILD1_DEFERRED
      : IntegrationCommerceCodes.ONECLICK_MALL_CHILD1,
    isDeferred
      ? IntegrationCommerceCodes.ONECLICK_MALL_CHILD2_DEFERRED
      : IntegrationCommerceCodes.ONECLICK_MALL_CHILD2,
  ];

  const buyOrder = prmBuyOrder
    ? prmBuyOrder
    : "O-" + Math.floor(Math.random() * 10000) + 1;

  if (prmDetails) {
    details.push(...prmDetails);
  } else {
    for (const childCommerceCode of commerceCodes) {
      const childBuyOrder = "O-" + Math.floor(Math.random() * 10000) + 1;
      const amount = deferredAmount ?? Math.floor(Math.random() * 1000) + 1001;

      details.push(
        new TransactionDetail(
          amount,
          childCommerceCode,
          childBuyOrder,
          deferredInstallments ?? undefined
        )
      );
    }
  }

  const authorizeResponse = await new Oneclick.MallTransaction(
    isDeferred ? getOneclickMallDeferredOptions() : getOneclickMallOptions()
  ).authorize(userName, tbkUser, buyOrder, details);

  return authorizeResponse;
};

  
export const refundOneClickMallTransaction = async (
  params: RefundOneClickMallTransactionProps
): Promise<TBKRefundMallTransactionResponse|ResultError> => {
  const {
    buyOrder,
    childCommerceCode,
    childBuyOrder,
    amount,
    isDeferred = false,
  } = params;

  try{
    const refundRequest = await new Oneclick.MallTransaction(
      isDeferred ? getOneclickMallDeferredOptions() : getOneclickMallOptions()
    ).refund(buyOrder, childCommerceCode, childBuyOrder, amount);
  
    return  refundRequest;
  }  catch (exception) {

    return { errorMessage: getErrorMessage(exception) };
  }
};

export const getStatusOneclickMallTransaction = async (
  buyOrder: string,
  isDeferred?: boolean
) => {
  return await new Oneclick.MallTransaction(
    isDeferred ? getOneclickMallDeferredOptions() : getOneclickMallOptions()
  ).status(buyOrder);
};
