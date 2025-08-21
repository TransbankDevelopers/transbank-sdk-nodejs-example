import { TBKfullTxCaptureResponse } from "@/types/transactions";

export const getStepOne = () => {
  return `const tx = new TransaccionCompleta.Transaction(new Options(
  IntegrationCommerceCodes.TRANSACCION_COMPLETA_MALL_DEFERRED, // Código de comercio Mall
  IntegrationApiKeys.WEBPAY,
  Environment.Integration
));

const resp = await tx.capture(
  token,
  buyOrderStore,
  commerceCodeStore, // Código de comercio Tienda
  authorizationCode,
  captureAmount
);`;
};

export const getStepTwo = (captureResponse: TBKfullTxCaptureResponse) => {
  return `{
  "authorization_code": "${captureResponse.authorization_code}",
  "authorization_date": "${captureResponse.authorization_date}",
  "captured_amount": ${captureResponse.captured_amount},
  "response_code": ${captureResponse.response_code}
}
 `;
};
