import { InstallmentsFullTXResponse } from "@/types/transactions";
export const getStepOne = () => {
  return `const TransaccionCompleta = require('transbank-sdk').TransaccionCompleta; // ES5
import { TransaccionCompleta } from 'transbank-sdk'; // ES6

const installmentsResponse = await (new TransaccionCompleta.Transaction()).installments(
  token, 
  installments, 
);`;
};

export const getStepTwo = (
  installmentsResponse: InstallmentsFullTXResponse
) => {
  return `{
 "installments_amount": ${installmentsResponse.installments_amount},
 "id_query_installments": ${installmentsResponse.id_query_installments},
 "deferred_periods": []
}`;
};
