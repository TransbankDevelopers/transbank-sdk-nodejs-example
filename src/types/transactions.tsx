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
  FAILED = "FAILED",
}

export type TBKCardDetail = {
  card_number: string;
};

export enum PaymentTypeCode {
  VN = "VN",
}

export type TBKCommitTransactionResponse = {
  amount: number;
  status: TBKTransactionStatus;
  buy_order: string;
  session_id: string;
  card_detail: TBKCardDetail;
  accounting_date: string;
  transaction_date: string;
  authorization_code: string;
  payment_type_code: PaymentTypeCode;
  response_code: number;
  installments_number: number;
};

export type TBKTransactionStatusResponse = Omit<
  TBKCommitTransactionResponse,
  "card_detail" | "authorization_code" | "payment_type_code" | "response_code"
>;

export enum TBKRefundTypes {
  NULLIFIED = "NULLIFIED",
  REVERSED = "REVERSED",
}

export type TBKRefundTransactionResponse =
  | {
      type: TBKRefundTypes;
      balance: number;
      authorization_code: string;
      response_code: number;
      authorization_date: string;
      nullified_amount: number;
    }
  | {
      type: TBKRefundTypes;
    };

export type TBKAbortedResponse = {
  TBK_TOKEN: string;
  TBK_ORDEN_COMPRA: string;
  TBK_ID_SESION: string;
};

export type TBKTimeoutResponse = {
  TBK_ID_SESION: string;
  TBK_ORDEN_COMPRA: string;
};

export type CommitTransactionResult = {
  commitResponse?: TBKCommitTransactionResponse;
  abortedResponse?: TBKAbortedResponse;
  timeoutResponse?: TBKTimeoutResponse;
  type: TBKCallbackType;
};

export enum TBKCallbackType {
  COMMIT_OK = "commit_ok",
  TIMEOUT = "timeout",
  ABORTED = "aborted",
  REJECTED = "rejected",
  INVALID_PAYMENT = "invalid_payment",
}

export type TBKCaptureTransactionResponse = {
  authorization_code: string;
  authorization_date: string;
  captured_amount: number;
  response_code: number;
};
