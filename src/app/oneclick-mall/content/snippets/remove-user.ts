export const getStepOne = (tbkUser: string, userName: string) => {
  return `await (new Oneclick.MallInscription()).delete("${tbkUser}", "${userName}");`;
};
