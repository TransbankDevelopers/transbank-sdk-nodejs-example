export const getStepOne = (tbkUser: string, userName: string) => {
  return `//tbkUser: ${tbkUser}
//userName: ${userName}

const tx = new Oneclick.MallInscription(
  "597060000001", // Código de comercio
  "d8f06df8-39c7-4f01-8e74-b383c19ae836", // API Key
  Environment.Integration
);
  
await tx.delete("${tbkUser}", "${userName}");`;
};
