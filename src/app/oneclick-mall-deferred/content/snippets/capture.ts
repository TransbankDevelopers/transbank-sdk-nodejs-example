import { TBKCaptureTransactionResponse } from "@/types/transactions";

export const getStepOne = (token: string) => {
  return `//buyOrder: ${token}
  const captureResponse = await (new WebpayPlus.Transaction()).capture(
  commerceCode,
  buyOrder,
  authorizationCode,
  captureAmount
);`;
};

export const getStepTwo = (captureResponse: TBKCaptureTransactionResponse) => {
  return `{
"authorization_code": "${captureResponse.authorization_code}",
"authorization_date": "${captureResponse.authorization_date}",
"captured_amount": ${captureResponse.captured_amount},
"response_code": ${captureResponse.response_code}
}`;
};
