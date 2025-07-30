import {
  Environment,
  Oneclick,
  Options,
  TransactionDetail,
} from "transbank-sdk";
import { generateRandomTransactionDataOneclickMallPromo } from "@/helpers/transactions/transactionHelper";
import { headers } from "next/headers";
import { getErrorMessage } from "@/helpers/errorHandler";
import {
  StartTransactionDataOneclickMall,
  TBKAuthorizeTransactionResponse,
  TBKCreateOneclickMallTransactionResponse,
  TBKFinishInscriptionResponse,
  TBKRefundMallTransactionResponse,
} from "@/types/transactions";
import { ResultError } from "@/helpers/resultError";

export type CreateTransactionResult = TBKCreateOneclickMallTransactionResponse &
  StartTransactionDataOneclickMall;

type RefundOneClickMallTransactionProps = {
  buyOrder: string;
  childCommerceCode: string;
  childBuyOrder: string;
  amount: number;
};

export interface AuthorizeTransactionOptions {
  prmDetails?: TransactionDetail[];
  prmBuyOrder?: string;
  deferredAmount?: number;
  deferredInstallments?: number;
}

export const getOneclickMallPromotionsOptions = () => {
  return new Options(
    "597060000001",
    "d8f06df8-39c7-4f01-8e74-b383c19ae836",
    Environment.Integration
  );
};

export const createOneclickMallTransaction = async (): Promise<
  CreateTransactionResult | ResultError
> => {
  try {
    const headersList = headers();
    const protocol = headersList.get("x-forwarded-proto") || "http"; // https://github.com/vercel/next.js/issues/2469
    const host = headersList.get("host") || "localhost:3000";

    const trxData = generateRandomTransactionDataOneclickMallPromo(
      protocol,
      host
    );
    const { userName, email, returnUrl } = trxData;

    const startResponse = await new Oneclick.MallInscription(
      getOneclickMallPromotionsOptions()
    ).start(userName, email, returnUrl);

    return { ...startResponse, ...trxData };
  } catch (exception) {
    return { errorMessage: getErrorMessage(exception) };
  }
};

export const finishOneclickMallTransaction = async (
  token: string
): Promise<TBKFinishInscriptionResponse | ResultError> => {
  try {
    const commitResponse = await new Oneclick.MallInscription(
      getOneclickMallPromotionsOptions()
    ).finish(token);

    return commitResponse;
  } catch (exception) {
    return { errorMessage: getErrorMessage(exception) };
  }
};

export const removeUserInscriptionOneclick = async (
  tbkUser: string,
  userName: string
): Promise<{ success: true } | ResultError> => {
  try {
    await new Oneclick.MallInscription(
      getOneclickMallPromotionsOptions()
    ).delete(tbkUser, userName);

    return { success: true };
  } catch (exception) {
    return { errorMessage: getErrorMessage(exception) };
  }
};

export const authorizeOneClickMallTransaction = async (
  userName: string,
  tbkUser: string,
  options?: AuthorizeTransactionOptions
): Promise<TBKAuthorizeTransactionResponse | ResultError> => {
  try {
    const { prmDetails, prmBuyOrder, deferredAmount, deferredInstallments } =
      options || {};
    const details: TransactionDetail[] = [];
    const commerceCodes = ["597060000002", "597060000003"];
    //NOSONAR: Math.random() is safe here because it is only used for sample/demo data
    const buyOrder = prmBuyOrder
      ? prmBuyOrder
      : "O-" + Math.floor(Math.random() * 10000) + 1;

    if (prmDetails) {
      details.push(...prmDetails);
    } else {
      for (const childCommerceCode of commerceCodes) {
        //NOSONAR: Math.random() is safe here because it is only used for sample/demo data
        const childBuyOrder = "O-" + Math.floor(Math.random() * 10000) + 1;
        //NOSONAR: Math.random() is safe here because it is only used for sample/demo data
        const amount =
          deferredAmount ?? Math.floor(Math.random() * 1000) + 1001;

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
      getOneclickMallPromotionsOptions()
    ).authorize(userName, tbkUser, buyOrder, details);

    return authorizeResponse;
  } catch (exception) {
    return { errorMessage: getErrorMessage(exception) };
  }
};

export const authorizeOneClickMallByDetails = async (
  userName: string,
  tbkUser: string,
  amountStoreOne: number,
  amountStoreTwo: number,
  installmentsStoreOne: number,
  installmentsStoreTwo: number
): Promise<TBKAuthorizeTransactionResponse | ResultError> => {
  try {
    const commerceCodes = ["597060000002", "597060000003"];
    //NOSONAR: Math.random() is safe here because it is only used for sample/demo data
    const amounts = [
      amountStoreOne ?? Math.floor(Math.random() * 1000) + 1001,
      amountStoreTwo ?? Math.floor(Math.random() * 1000) + 1001,
    ];
    const installments = [installmentsStoreOne, installmentsStoreTwo];
    //NOSONAR: Math.random() is safe here because it is only used for sample/demo data
    const buyOrder = "O-" + Math.floor(Math.random() * 10000) + 1;

    const details: TransactionDetail[] = commerceCodes.map(
      (childCommerceCode, index) => {
        //NOSONAR: Math.random() is safe here because it is only used for sample/demo data
        const childBuyOrder = "O-" + Math.floor(Math.random() * 10000) + 1;
        return new TransactionDetail(
          amounts[index],
          childCommerceCode,
          childBuyOrder,
          installments[index] ?? undefined
        );
      }
    );

    const authorizeResponse = await new Oneclick.MallTransaction(
      getOneclickMallPromotionsOptions()
    ).authorize(userName, tbkUser, buyOrder, details);

    return authorizeResponse;
  } catch (exception) {
    return { errorMessage: getErrorMessage(exception) };
  }
};

export const InfoBinOneclickMall = async (tbkUser: string) => {
  try {
    const binInfo = await new Oneclick.MallBinInfo(
      getOneclickMallPromotionsOptions()
    ).queryBin(tbkUser);
    return binInfo;
  } catch (exception) {
    return { errorMessage: getErrorMessage(exception) };
  }
};

export const refundOneClickMallTransaction = async (
  params: RefundOneClickMallTransactionProps
): Promise<TBKRefundMallTransactionResponse | ResultError> => {
  const { buyOrder, childCommerceCode, childBuyOrder, amount } = params;

  try {
    const refundRequest = await new Oneclick.MallTransaction(
      getOneclickMallPromotionsOptions()
    ).refund(buyOrder, childCommerceCode, childBuyOrder, amount);

    return refundRequest;
  } catch (exception) {
    return { errorMessage: getErrorMessage(exception) };
  }
};

export const getStatusOneclickMallTransaction = async (
  buyOrder: string
): Promise<TBKAuthorizeTransactionResponse | ResultError> => {
  try {
    const trxStatus = await new Oneclick.MallTransaction(
      getOneclickMallPromotionsOptions()
    ).status(buyOrder);

    return trxStatus;
  } catch (exception) {
    return { errorMessage: getErrorMessage(exception) };
  }
};
