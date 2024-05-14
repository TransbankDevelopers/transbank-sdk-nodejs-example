import { TBKCaptureTransactionResponse } from "@/types/transactions";

export const getStepOne = () => {
  return `const captureResponse = await (new WebpayPlus.Transaction()).capture(
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
