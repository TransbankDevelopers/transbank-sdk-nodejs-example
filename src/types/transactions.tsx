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

export enum TBKTransactionStatus {
  AUTHORIZED = "AUTHORIZED",
}

export type TBKCardDetail = {
  card_number: string;
};

export enum PaymentTypeCode {
  VN = "VN",
}

export type TBKCommitTransactionResponse = {
  amount: number;
  status: TBKTransactionStatus.AUTHORIZED;
  buy_order: string;
  session_id: string;
  card_detail: TBKCardDetail;
  accounting_date: number;
  transaction_date: string;
  authorization_code: string;
  payment_type_code: PaymentTypeCode;
  response_code: number;
  installments_number: number;
};
