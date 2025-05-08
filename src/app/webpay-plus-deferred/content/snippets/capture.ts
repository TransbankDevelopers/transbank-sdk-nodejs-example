import { TBKCaptureTransactionResponse } from "@/types/transactions";

export const getStepOne = (token: string) => {
  return `//token: ${token}
const tx = new WebpayPlus.Transaction(new Options(
  IntegrationCommerceCodes.WEBPAY_PLUS_DEFERRED,
  IntegrationApiKeys.WEBPAY,
  Environment.Integration
));

const captureResponse = await tx.capture(
  token,
  buyOrder,
  authorizationCode,
  captureAmount
);`;
};

export const getStepTwo = (commitResponse: TBKCaptureTransactionResponse) => {
  return `{
"authorization_code": "${commitResponse.authorization_code}",
"authorization_date": "${commitResponse.authorization_date}",
"captured_amount": ${commitResponse.captured_amount},
"response_code": ${commitResponse.response_code}
}`;
};
