import { TBKTransactionStatusResponse } from "@/types/transactions";

export const getStepOne = () => {
  return `// Token: 01ab8fb16e5dee67fcc392b97d679a01d29b77b4cd8b9ee6ade278203feee1b4
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
