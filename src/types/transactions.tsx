export type StartTxCompletedData = {
  buyOrder: string;
  sessionId: string;
  amount: number;
};

export type StartTransactionData = {
  buyOrder: string;
  sessionId: string;
  amount: number;
  returnUrl: string;
};

export type StartTransactionDataMall = {
  commerceCode: string;
  buyOrder: string;
  returnUrl: string;
  amount: number;
  childBuyOrder: string;
  childBuyOrder2: string;
  amount2: number;
  sessionId: string;
};

export type StartTransactionDataOneclickMall = {
  email: string;
  userName: string;
  returnUrl: string;
  showReturnUrl?: boolean;
};

export type ExtraProps = {
  showReturnUrl?: boolean;
};

export type TBKCreateTransactionResponse = {
  token: string;
  url: string;
};

export type TBKCreateOneclickMallTransactionResponse = {
  token: string;
  url_webpay: string;
};

export enum TBKTransactionStatus {
  AUTHORIZED = "AUTHORIZED",
  FAILED = "FAILED",
  CAPTURED = "CAPTURED",
  CONSTRAINTS_VIOLATED = "CONSTRAINTS_VIOLATED",
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

export type TransactionDetail = {
  amount: number;
  status: string;
  authorization_code: string;
  payment_type_code: string;
  response_code: number;
  installments_number: number;
  commerce_code: string;
  buy_order: string;
};

export type TBKMallCommitTransactionResponse = {
  vci: string;
  details: TransactionDetail[];
  buy_order: string;
  session_id: string;
  card_detail: TBKCardDetail;
  accounting_date: string;
  transaction_date: string;
};

export type TBKFullTxCommitResponse = {
  amount: number;
  status: string;
  buy_order: string;
  session_id: string;
  card_detail: TBKCardDetail;
  accounting_date: string;
  transaction_date: string;
  authorization_code: string;
  payment_type_code: string;
  response_code: number;
  installments_number: number;
};

export type TBKTransactionStatusResponse = Omit<
  TBKCommitTransactionResponse,
  "card_detail" | "authorization_code" | "payment_type_code" | "response_code"
>;

export type TBKMallTransactionStatusResponse = {
  details: TransactionDetail[];
  session_id?: string;
  buy_order: string;
  card_detail?: TBKCardDetail;
  accounting_date: string;
  transaction_date: string;
};

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

export type TBKMallTimeoutResponse = {
  response_code: number;
};

export type CommitTransactionResult = {
  commitResponse?: TBKCommitTransactionResponse;
  abortedResponse?: TBKAbortedResponse;
  timeoutResponse?: TBKTimeoutResponse;
  type: TBKCallbackType;
};
export type CommitMallTransactionResult = {
  commitResponse?: TBKMallCommitTransactionResponse;
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

export type TBKFinishInscriptionResponse = {
  response_code: number;
  tbk_user: string;
  authorization_code: string;
  card_type: string;
  card_number: string;
};

export type RefundAndStatusProps = {
  token: string;
  amount: number;
  buyOrder: string;
  commerceCode: string;
};

export type CaptureProps = {
  token?: string;
  amount: number;
  parentBuyOrder?: string;
  buyOrder: string;
  commerceCode: string;
  authorizationCode: string;
  isWebpay?: boolean;
  showCommerceCode?: boolean;
};

export type TBKAuthorizeTransactionResponse = {
  details: TransactionDetail[];
  buy_order: string;
  card_detail: TBKCardDetail;
  accounting_date: string;
  transaction_date: string;
};

export type TBKRefundResponseType = "NULLIFIED" | "REVERSED" | string;

export type TBKRefundMallTransactionResponse = {
  type: TBKRefundResponseType;
};
