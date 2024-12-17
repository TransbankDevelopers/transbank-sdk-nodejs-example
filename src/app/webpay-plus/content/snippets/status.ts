import { TBKTransactionStatusResponse } from "@/types/transactions";

export const getStepOne = (token_ws: string) => {
  return `// Token: ${token_ws}
const statusResponse = await (new WebpayPlus.Transaction()).status(token);`;
};

export const getStepTwo = (commitResponse: TBKTransactionStatusResponse) => {
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
  "balance": ${balance ?? null}
  }`;
};
