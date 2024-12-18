import { TBKCommitTransactionResponse } from "@/types/transactions";

export const getStepOne = (token: string) => {
  return `{
  'token_ws': ${token}
}`;
};

export const getStepTwo = () => {
  return `
const token = request.body.token_ws;
const commitResponse = await (new WebpayPlus.Transaction()).commit(token);`;
};

export const getStepThree = (commitResponse: TBKCommitTransactionResponse) => {
  const {
    vci,
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
    installments_amount,
    installments_number,
    balance,
  } = commitResponse;
  return `{
  "vci": "${vci}",
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
  "installments_amount": ${installments_amount ?? null}
  "installments_number": "${installments_number}"
  "balance": "${balance}"
  }`;
};
