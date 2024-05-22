import {
  Environment,
  IntegrationApiKeys,
  IntegrationCommerceCodes,
  Oneclick,
  Options,
  TransactionDetail,
} from "transbank-sdk";
import { generateRandomTransactionDataOneclickMall } from "@/helpers/webpay-plus/transactionHelper";
import { headers } from "next/headers";
import {
  StartTransactionDataOneclickMall,
  TBKAuthorizeTransactionResponse,
  TBKCreateOneclickMallTransactionResponse,
  TBKFinishInscriptionResponse,
  TBKRefundMallTransactionResponse,
} from "@/types/transactions";

export type CreateTransactionResult = TBKCreateOneclickMallTransactionResponse &
  StartTransactionDataOneclickMall;

type RefundOneClickMallTransactionProps = {
  buyOrder: string;
  childCommerceCode: string;
  childBuyOrder: string;
  amount: number;
};

export const getOneclickMallOptions = () => {
  return new Options(
    IntegrationCommerceCodes.ONECLICK_MALL,
    IntegrationApiKeys.WEBPAY,
    Environment.Integration
  );
};

export const createOneclickMallTransaction =
  async (): Promise<CreateTransactionResult> => {
    const headersList = headers();
    const protocol = headersList.get("x-forwarded-proto") || "http"; // https://github.com/vercel/next.js/issues/2469
    const host = headersList.get("host") || "localhost:3000";

    const trxData = generateRandomTransactionDataOneclickMall(protocol, host);

    const { userName, email, returnUrl } = trxData;

    const startResponse = await new Oneclick.MallInscription(
      getOneclickMallOptions()
    ).start(userName, email, returnUrl);

    return { ...startResponse, ...trxData };
  };

export const finishOneclickMallTransaction = async (
  token: string
): Promise<TBKFinishInscriptionResponse> => {
  const commitResponse = await new Oneclick.MallInscription(
    getOneclickMallOptions()
  ).finish(token);

  return commitResponse;
};

export const removeUserInscriptionOneclick = async (
  tbkUser: string,
  userName: string
) => {
  return await new Oneclick.MallInscription(getOneclickMallOptions()).delete(
    tbkUser,
    userName
  );
};

export const authorizeOneClickMallTransaction = async (
  userName: string,
  tbkUser: string
): Promise<TBKAuthorizeTransactionResponse> => {
  const details: TransactionDetail[] = [];
  const commerceCodes = [
    IntegrationCommerceCodes.ONECLICK_MALL_CHILD1,
    IntegrationCommerceCodes.ONECLICK_MALL_CHILD2,
  ];
  const buyOrder = "O-" + Math.floor(Math.random() * 10000) + 1;

  for (const childCommerceCode of commerceCodes) {
    const childBuyOrder = "O-" + Math.floor(Math.random() * 10000) + 1;
    const amount = Math.floor(Math.random() * 1000) + 1001;

    details.push(
      new TransactionDetail(amount, childCommerceCode, childBuyOrder)
    );
  }

  const authorizeResponse = await new Oneclick.MallTransaction(
    getOneclickMallOptions()
  ).authorize(userName, tbkUser, buyOrder, details);

  return authorizeResponse;
};

export const refundOneClickMallTransaction = async (
  params: RefundOneClickMallTransactionProps
): Promise<TBKRefundMallTransactionResponse> => {
  const { buyOrder, childCommerceCode, childBuyOrder, amount } = params;

  const refundRequest = await new Oneclick.MallTransaction(
    getOneclickMallOptions()
  ).refund(buyOrder, childCommerceCode, childBuyOrder, amount);

  return refundRequest;
};

export const getStatusOneclickMallTransaction = async (buyOrder: string) => {
  return await new Oneclick.MallTransaction(getOneclickMallOptions()).status(
    buyOrder
  );
};
