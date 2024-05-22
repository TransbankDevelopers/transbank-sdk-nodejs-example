import { Oneclick } from "transbank-sdk";
import { getOneclickMallDeferredOptions } from "../oneclick-mall/data";
import { TBKCaptureTransactionResponse } from "@/types/transactions";

export type CaptureOneclickMallDeferredProps = {
  commerceCode: string;
  childBuyOrder: string;
  authorizationCode: string;
  captureAmount: number;
};

export const captureOneclickMallDeferredTransaction = async (
  props: CaptureOneclickMallDeferredProps
): Promise<TBKCaptureTransactionResponse> => {
  const { commerceCode, childBuyOrder, authorizationCode, captureAmount } =
    props;

  const captureResponse = await new Oneclick.MallTransaction(
    getOneclickMallDeferredOptions()
  ).capture(commerceCode, childBuyOrder, authorizationCode, captureAmount);

  return captureResponse;
};
