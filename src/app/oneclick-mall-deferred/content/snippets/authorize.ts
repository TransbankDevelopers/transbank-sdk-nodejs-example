import { TBKAuthorizeTransactionResponse } from "@/types/transactions";

export const getStepOne = () => {
  return `const tx = new Oneclick.MallTransaction(new Options(
  IntegrationCommerceCodes.ONECLICK_MALL_DEFERRED,
  IntegrationApiKeys.WEBPAY,
  Environment.Integration
));

const details = [
  new TransactionDetail(amount, childCommerceCode, childBuyOrder), 
  new TransactionDetail(amount2, childCommerceCode2, childBuyOrder2)
)];

// Es necesario ejecutar dentro de una función async para utilizar await
const authorizeResponse = await tx.authorize(
  username, 
  tbk_user, 
  buyOrder,
  details
);`;
};

export const getStepTwo = (trxData: TBKAuthorizeTransactionResponse) => {
  return JSON.stringify(trxData, null, 2);
};
