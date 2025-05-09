import { TBKFullTxStatusResponse } from "@/types/transactions";

export const getStepOne = (token_ws: string) => {
  return `// Token: ${token_ws}
const tx = new TransaccionCompleta.Transaction(new Options(
  IntegrationCommerceCodes.TRANSACCION_COMPLETA,
  IntegrationApiKeys.WEBPAY,
  Environment.Integration
));

const statusResponse = await tx.status(token);`;
};

export const getStepTwo = (statusResponse: TBKFullTxStatusResponse) => {
  return `{
  "amount": ${statusResponse.amount},
  "status": "${statusResponse.status}",
  "balance": ${statusResponse.balance},
  "buy_order": "${statusResponse.buy_order}",
  "session_id": "${statusResponse.session_id}",
  "card_detail": {
    "card_number": "${statusResponse.amount}"
  },
  "accounting_date": "${statusResponse.accounting_date}",
  "transaction_date": "${statusResponse.transaction_date}",
  "authorization_code": "${statusResponse.authorization_code}",
  "payment_type_code": "${statusResponse.payment_type_code}",
  "response_code": ${statusResponse.response_code},
  "installments_number": ${statusResponse.installments_number}
}`;
};
