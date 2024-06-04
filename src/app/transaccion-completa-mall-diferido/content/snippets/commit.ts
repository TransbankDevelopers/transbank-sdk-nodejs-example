import { TBKMallCommitTransactionResponse } from "@/types/transactions";

export const getStepOne = () => {
  return `const TransaccionCompleta = require('transbank-sdk').TransaccionCompleta; // CommonJS
const CommitDetail = require('transbank-sdk').CommitDetail; // CommonJS
import { TransaccionCompleta, CommitDetail } from 'transbank-sdk'; // ES6 Modules

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

const commitResponse = await (new TransaccionCompleta.MallTransaction()).commit(
  token,
  details
);`;
};

export const getStepTwo = (trxData: TBKMallCommitTransactionResponse) => {
  return JSON.stringify(trxData, null, 2);
};
