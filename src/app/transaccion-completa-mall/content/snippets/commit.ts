import { TBKMallCommitTransactionResponse } from "@/types/transactions";

export const getStepOne = () => {
  return `const tx = new TransaccionCompleta.MallTransaction(new Options(
  IntegrationCommerceCodes.TRANSACCION_COMPLETA_MALL, // Código de comercio Mall
  IntegrationApiKeys.WEBPAY,
  Environment.Integration
));

const details = [
  new CommitDetail(
    commerceCodeStore1, // Código de comercio Tienda 1
    buyOrderStore1,
    idQueryInstallments1,
    deferredPeriodIndex1,
    gracePeriod1
  ),
  new CommitDetail(
    commerceCodeStore2, // Código de comercio Tienda 2
    buyOrderStore2,
    idQueryInstallments2,
    deferredPeriodIndex2,
    gracePeriod2
  )
];

const commitResponse = await tx.commit(
  token,
  details
);`;
};

export const getStepTwo = (trxData: TBKMallCommitTransactionResponse) => {
  return JSON.stringify(trxData, null, 2);
};
