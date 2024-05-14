import { TBKTransactionStatusResponse } from "@/types/transactions";

export const getStepOne = (token_ws: string) => {
  return `// Token: ${token_ws}
const statusResponse = await (new WebpayPlus.Transaction()).status(token);`;
};

export const getStepTwo = (commitResponse: TBKTransactionStatusResponse) => {
  const {
    amount,
    status,
    buy_order,
    session_id,
    accounting_date,
    transaction_date,
    installments_number,
  } = commitResponse;
  return `{
  "amount": ${amount},
  "status": "${status}",
  "buy_order": "${buy_order}",
  "session_id": "${session_id}",
  "accounting_date": "${accounting_date}",
  "transaction_date": "${transaction_date}",
  "installments_number": "${installments_number}"
  }`;
};
