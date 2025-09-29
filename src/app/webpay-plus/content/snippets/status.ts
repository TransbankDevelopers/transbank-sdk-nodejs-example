import { TBKTransactionStatusResponse } from "@/types/transactions";

export const getStepOne = (token_ws: string) => {
  return `// Token: ${token_ws}
const tx = new WebpayPlus.Transaction(new Options(
  IntegrationCommerceCodes.WEBPAY_PLUS,
  IntegrationApiKeys.WEBPAY,
  Environment.Integration
));
const statusResponse = await tx.status(token);`;
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
  "vci": ${vci ? `"${vci}"` : null},
  "amount": ${amount ?? null},
  "status": ${status ? `"${status}"` : null},
  "buy_order": ${buy_order ? `"${buy_order}"` : null},
  "session_id": ${session_id ? `"${session_id}"` : null},
  "card_detail": {
    "card_number": ${card_detail?.card_number ? `"${card_detail.card_number}"` : null}
  },
  "accounting_date": ${accounting_date ? `"${accounting_date}"` : null},
  "transaction_date": ${transaction_date ? `"${transaction_date}"` : null},
  "authorization_code": ${authorization_code ? `"${authorization_code}"` : null},
  "payment_type_code": ${payment_type_code ? `"${payment_type_code}"` : null},
  "response_code": ${response_code ?? null},
  "installments_amount": ${installments_amount ?? null},
  "installments_number": ${installments_number ?? null},
  "balance": ${balance ?? null}
}`;
};
