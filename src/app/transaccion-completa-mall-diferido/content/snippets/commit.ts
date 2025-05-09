import { TBKMallCommitTransactionResponse } from "@/types/transactions";

export const getStepOne = () => {
  return `const tx = new TransaccionCompleta.MallTransaction(new Options(
  IntegrationCommerceCodes.TRANSACCION_COMPLETA_MALL_DEFERRED,
  IntegrationApiKeys.WEBPAY,
  Environment.Integration
));

const details = [
  new CommitDetail(
    childCommerceCode1,
    childBuyOrder1,
    idQueryInstallments1,
    deferredPeriodIndex1,
    gracePeriod1
  ),
  new CommitDetail(
    childCommerceCode2,
    childBuyOrder2,
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
