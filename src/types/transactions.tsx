export type StartTransactionData = {
  buyOrder: string;
  sessionId: string;
  amount: number;
  returnUrl: string;
};

export type TBKCreateTransactionResponse = {
  token: string;
  url: string;
};
