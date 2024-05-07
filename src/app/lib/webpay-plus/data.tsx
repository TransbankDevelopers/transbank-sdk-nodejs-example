import { headers } from "next/headers";
import { generateRandomTransactionData } from "@/helpers/webpay-plus/transactionHelper";
import {
  StartTransactionData,
  TBKCreateTransactionResponse,
} from "@/types/transactions";
import { WebpayPlus } from "transbank-sdk";

export type CreateTRX =
  | (TBKCreateTransactionResponse & StartTransactionData)
  | { notFound: boolean };

export const createTransaction = async (): Promise<CreateTRX> => {
  const headersList = headers();
  const host = headersList.get("x-forwarded-host");
  const protocol = headersList.get("x-forwarded-proto");

  const startTransactionData = generateRandomTransactionData(
    protocol as string,
    host as string
  );

  const createResponse: TBKCreateTransactionResponse | null =
    await new WebpayPlus.Transaction(WebpayPlus.getDefaultOptions()).create(
      startTransactionData.buyOrder,
      startTransactionData.sessionId,
      startTransactionData.amount,
      startTransactionData.returnUrl
    );

  if (!createResponse) {
    return {
      notFound: true,
    };
  }

  return {
    ...startTransactionData,
    ...createResponse,
  };
};
