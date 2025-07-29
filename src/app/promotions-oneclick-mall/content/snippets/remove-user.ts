export const getStepOne = (tbkUser: string, userName: string) => {
  return `//tbkUser: ${tbkUser}
//userName: ${userName}

const tx = new Oneclick.MallInscription(
  IntegrationCommerceCodes.ONECLICK_MALL, // Código de comercio Mall
  IntegrationApiKeys.WEBPAY,
  Environment.Integration
);
  
await tx.delete("${tbkUser}", "${userName}");`;
};
