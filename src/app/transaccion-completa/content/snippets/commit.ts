import { TBKFullTxResponse } from "@/types/transactions";

export const getStepOne = () => {
  return `const TransaccionCompleta = require('transbank-sdk').TransaccionCompleta; // CommonJS
import { TransaccionCompleta } from 'transbank-sdk'; // ES6 Modules

const commitResponse = await (new TransaccionCompleta.Transaction()).commit(
  token,
  idQueryInstallments,(opcional)
  deferred_period_index, (opcional)
  grace_period (opcional)
);`;
};

export const getStepTwo = (commitResponse: TBKFullTxResponse) => {
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
