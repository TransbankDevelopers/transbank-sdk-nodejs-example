import { TBKFullTxCommitResponse } from "@/types/transactions";

export const getStepOne = () => {
  return `const tx = new TransaccionCompleta.Transaction(new Options(
  IntegrationCommerceCodes.TRANSACCION_COMPLETA_DEFERRED,
  IntegrationApiKeys.WEBPAY,
  Environment.Integration
));

const commitResponse = await tx.commit(
  token,
  idQueryInstallments,(opcional)
  deferred_period_index, (opcional)
  grace_period, (opcional)
);`;
};

export const getStepTwo = (commitResponse: TBKFullTxCommitResponse) => {
  return `{
  "amount":${commitResponse.amount},
  "status": "${commitResponse.status}",
  "buy_order": "${commitResponse.buy_order}",
  "session_id": "${commitResponse.session_id}",
  "card_detail": {
    "card_number": "${commitResponse.card_detail.card_number}"
  },
  "accounting_date": "${commitResponse.accounting_date}",
  "transaction_date": "${commitResponse.transaction_date}",
  "authorization_code": "${commitResponse.authorization_code}",
  "payment_type_code": "${commitResponse.payment_type_code}",
  "response_code": "${commitResponse.response_code}",
  "installments_number": ${commitResponse.installments_number}
}
 `;
};
