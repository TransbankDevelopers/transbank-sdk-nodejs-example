export const getStepOne = (tbkUser: string, userName: string) => {
  return `//tbkUser: ${tbkUser}
//userName: ${userName}

const tx = new Oneclick.MallInscription(
  IntegrationCommerceCodes.ONECLICK_MALL,
  IntegrationApiKeys.WEBPAY,
  Environment.Integration
);
  
await tx.delete("${tbkUser}", "${userName}");`;
};
