import { TBKCommitTransactionResponse } from "@/types/transactions";

export const getStepOne = (token: string) => {
  return `{
  'token_ws': ${token}
}`;
};

export const getStepTwo = () => {
  return `const token = request.body.token_ws;
const tx = new WebpayPlus.Transaction(new Options (
  IntegrationCommerceCodes.WEBPAY_PLUS_DEFERRED,
  IntegrationApiKeys.WEBPAY,
  Environment.Integration
));
const commitResponse = await tx.commit(token);`;
};

export const getStepThree = (commitResponse: TBKCommitTransactionResponse) => {
  const {
    amount,
    status,
    buy_order,
    session_id,
    card_detail,
    accounting_date,
    transaction_date,
    authorization_code,
    payment_type_code,
    response_code,
    installments_number,
  } = commitResponse;
  return `{
  "amount": ${amount},
  "status": "${status}",
  "buy_order": "${buy_order}",
  "session_id": "${session_id}",
  "card_detail": {
    "card_number": "${card_detail.card_number}",
  },
  "accounting_date": "${accounting_date}",
  "transaction_date": "${transaction_date}",
  "authorization_code": "${authorization_code}",
  "payment_type_code": "${payment_type_code}",
  "response_code": "${response_code}",
  "installments_number": "${installments_number}"
  }`;
};
