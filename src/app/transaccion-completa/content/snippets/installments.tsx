import { InstallmentsFullTXResponse } from "@/types/transactions";
export const getStepOne = () => {
  return `const tx = new TranaccionCompleta.Transaction(new Options(
  IntegrationCommerceCodes.TRANSACCION_COMPLETA,
  IntegrationApiKeys.WEBPAY,
  Environment.Integration
));

const installmentsResponse = await tx.installments(
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
