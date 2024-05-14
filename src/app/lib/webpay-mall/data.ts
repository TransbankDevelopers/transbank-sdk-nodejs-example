import { generateRandomTransactionDataMall } from "@/helpers/webpay-plus/transactionHelper";
import {
  StartTransactionDataMall,
  TBKCommitTransactionResponse,
  TBKCreateTransactionResponse,
  TBKTransactionStatusResponse,
} from "@/types/transactions";
import { headers } from "next/headers";
import { WebpayPlus, TransactionDetail } from "transbank-sdk";

export type CreateTransactionResult = TBKCreateTransactionResponse &
  StartTransactionDataMall;

export const createMallTransaction =
  async (): Promise<CreateTransactionResult> => {
    const headersList = headers();
    const protocol = headersList.get("x-forwarded-proto") || "http"; // https://github.com/vercel/next.js/issues/2469
    const host = headersList.get("host") || "localhost:3000";

    const StartTransactionDataMall = generateRandomTransactionDataMall(
      protocol as string,
      host
    );

    const details = [
      new TransactionDetail(
        StartTransactionDataMall.amount,
        StartTransactionDataMall.commerceCode,
        StartTransactionDataMall.childBuyOrder
      ),
      new TransactionDetail(
        StartTransactionDataMall.amount2,
        StartTransactionDataMall.commerceCode,
        StartTransactionDataMall.childBuyOrder2
      ),
    ];

    const createResponse: TBKCreateTransactionResponse =
      await new WebpayPlus.MallTransaction(
        WebpayPlus.getDefaultOptions()
      ).create(
        StartTransactionDataMall.buyOrder,
        StartTransactionDataMall.sessionId,
        StartTransactionDataMall.returnUrl,
        details
      );

    return {
      ...StartTransactionDataMall,
      ...createResponse,
    };
  };

export type CommitTransactionResult = {
  commitResponse: TBKCommitTransactionResponse;
};

export const commitTransaction = async (
  token_ws: string
): Promise<CommitTransactionResult> => {
  const commitResponse: TBKCommitTransactionResponse =
    await new WebpayPlus.Transaction(WebpayPlus.getDefaultOptions()).commit(
      token_ws as string
    );

  return {
    commitResponse,
  };
};

export const getStatusTransaction = async (token_ws: string) => {
  const trxStatus: TBKTransactionStatusResponse =
    await new WebpayPlus.Transaction(WebpayPlus.getDefaultOptions()).status(
      token_ws as string
    );

  return trxStatus;
};

export const refundTransaction = async (token_ws: string, amount: number) => {
  const refundResponse = await new WebpayPlus.Transaction(
    WebpayPlus.getDefaultOptions()
  ).refund(token_ws as string, amount);

  return refundResponse;
};
