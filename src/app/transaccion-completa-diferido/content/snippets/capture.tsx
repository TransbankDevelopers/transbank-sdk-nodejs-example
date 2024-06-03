import { TBKfullTxCaptureResponse } from "@/types/transactions";

export const getStepOne = () => {
  return `const TransaccionCompleta = require('transbank-sdk').TransaccionCompleta; // CommonJS
import { TransaccionCompleta } from 'transbank-sdk'; // ES6 Modules

const resp = await (new TransaccionCompleta.Transaction()).capture(
  token,
  buyOrder,
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
