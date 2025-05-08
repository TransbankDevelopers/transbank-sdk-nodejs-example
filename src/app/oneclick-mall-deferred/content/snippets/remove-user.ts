export const getStepOne = (tbkUser: string, userName: string) => {
  return `//tbkUser: ${tbkUser}
//userName ${userName}

const tx = new Oneclick.MallInscription(new Options(
  IntegrationCommerceCodes.ONECLICK_MALL_DEFERRED,
  IntegrationApiKeys.WEBPAY,
  Environment.Integration
));
  
await tx.delete("${tbkUser}", "${userName}");`;
};
