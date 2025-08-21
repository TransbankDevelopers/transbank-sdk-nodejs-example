import { TBKCaptureTransactionResponse } from "@/types/transactions";

export const getStepOne = (token: string) => {
  return `//buyOrderStore: ${token}

const tx = new Oneclick.MallTransaction(new Options(
  IntegrationCommerceCodes.ONECLICK_MALL_DEFERRED, // Código de comercio Mall
  IntegrationApiKeys.WEBPAY,
  Environment.Integration
));

const captureResponse = await tx.capture(
  commerceCodeStore, // Código de comercio Tienda
  buyOrderStore,
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
