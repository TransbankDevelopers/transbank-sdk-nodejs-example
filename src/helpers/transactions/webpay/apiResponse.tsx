import { ColumnValues } from "@/components/table/Table";

export const webpayPlusStatus: ColumnValues[] = [
  {
    field: "vci",
    value: [
      "visita este link para ver la informacion detallada de este campo https://www.transbankdevelopers.cl/producto/webpay#vci",
    ],
  },
  {
    field: "amount",
    value:
      "Formato número entero para transacciones en peso y decimal para transacciones en dólares. Largo máximo: 17",
  },
  {
    field: "status",
    value:
      "Estado de la transacción (INITIALIZED, AUTHORIZED, REVERSED, FAILED, NULLIFIED, PARTIALLY_NULLIFIED, CAPTURED). Largo máximo: 64",
  },
  {
    field: "buy_order",
    value:
      "Orden de compra de la tienda indicado en Transaction.create(). Largo máximo: 26",
  },
  {
    field: "session_id",
    value:
      "Identificador de sesión, el mismo enviado originalmente por el comercio en Transaction.create(). Largo máximo: 61.",
  },
  {
    field: "card_detail",
    value:
      "Objeto que representa los datos de la tarjeta de crédito del tarjeta habiente.",
  },
  {
    field: "card_detail.card_number",
    value:
      "4 últimos números de la tarjeta de crédito del tarjetahabiente. Largo máximo: 19.",
  },
  {
    field: "accounting_date",
    value: "Fecha de la autorización. Largo: 4, formato MMDD",
  },
  {
    field: "transaction_date",
    value:
      "Fecha y hora de la autorización. Largo: 24, formato: ISO 8601 (Ej: yyyy-mm-ddTHH:mm:ss.xxxZ)",
  },
  {
    field: "authorization_code",
    value: "Código de autorización de la transacción. Largo máximo: 6",
  },
  {
    field: "payment_type_code",
    value: `Tipo de pago de la transacción.
      VD = Venta Débito.
      VN = Venta Normal.
      VC = Venta en cuotas.
      SI = 3 cuotas sin interés.
      S2 = 2 cuotas sin interés.
      NC = N Cuotas sin interés.
      VP = Venta Prepago`,
  },
  {
    field: "response_code",
    value: "Código de respuesta de la autorización.",
  },
  {
    field: "installments_amount",
    value: "Monto de las cuotas. Largo máximo: 17",
  },
  {
    field: "installments_number",
    value: "Cantidad de cuotas. Largo máximo: 2",
  },
  {
    field: "balance",
    value: "Monto restante para un detalle anulado. Largo máximo: 17",
  },
];

export const webpayPlusRefund: ColumnValues[] = [
  {
    field: "type",
    value:
      "Tipo de reembolso (REVERSED o NULLIFIED). Si es REVERSED no se devolverán datos de la transacción (authorization code, etc). Largo máximo: 10",
  },
  {
    field: "authorization_code",
    value:
      "(Solo si es NULLIFIED) Código de autorización de la anulación. Largo máximo: 6",
  },
  {
    field: "authorization_date",
    value: "(Solo si es NULLIFIED) Fecha y hora de la autorización.",
  },
  {
    field: "balance",
    value:
      "(Solo si es NULLIFIED) Saldo actualizado de la transacción (considera la venta menos el monto anulado). Largo máximo: 17",
  },
  {
    field: "nullified_amount",
    value: "(Solo si es NULLIFIED) Monto anulado. Largo máximo: 17",
  },
  {
    field: "response_code",
    value:
      "(Solo si es NULLIFIED) Código de resultado de la reversa/anulación. Si es exitoso es 0, de lo contrario la reversa/anulación no fue realizada Largo Máximo: 2",
  },
];

export const webpayPlusMallStatus: ColumnValues[] = [
  {
    field: "buy_order",
    value:
      "Orden de compra de la tienda indicado en Transaction.create(). Largo máximo: 26",
  },
  {
    field: "session_id",
    value:
      "Identificador de sesión, el mismo enviado originalmente por el comercio en Transaction.create(). Largo máximo: 61.",
  },
  {
    field: "card_detail",
    value:
      "Objeto que representa los datos de la tarjeta de crédito del tarjeta habiente.",
  },
  {
    field: "card_detail.card_number",
    value:
      "4 últimos números de la tarjeta de crédito del tarjetahabiente. Largo máximo: 19.",
  },
  {
    field: "accounting_date",
    value: "Fecha de la autorización. Largo: 4, formato MMDD",
  },
  {
    field: "transaction_date",
    value:
      "Fecha y hora de la autorización. Largo: 24, formato: ISO 8601 (Ej: yyyy-mm-ddTHH:mm:ss.xxxZ)",
  },
  {
    field: "vci",
    value: [
      "visita este link para ver la informacion detallada de este campo https://www.transbankdevelopers.cl/producto/webpay#vci",
    ],
  },
  {
    field: "details",
    value:
      "Lista con resultado de cada una de las transacciones enviados en Transaction.create().",
  },
  {
    field: "details[].authorization_code",
    value: "Código de autorización de la transacción. Largo máximo: 6",
  },
  {
    field: "details[].payment_type_code",
    value: `Tipo de pago de la transacción.
      VD = Venta Débito.
      VN = Venta Normal.
      VC = Venta en cuotas.
      SI = 3 cuotas sin interés.
      S2 = 2 cuotas sin interés.
      NC = N Cuotas sin interés.
      VP = Venta Prepago`,
  },
  {
    field: "details[].response_code",
    value: "Código de respuesta de la autorización.",
  },
  {
    field: "details[].amount",
    value:
      "Formato número entero para transacciones en peso y decimal para transacciones en dólares. Largo máximo: 10",
  },

  {
    field: "details[].installments_amount",
    value: "Monto de las cuotas. Largo máximo: 17",
  },
  {
    field: "details[].installments_number",
    value: "Cantidad de cuotas. Largo máximo: 2",
  },
  {
    field: "details[].commerce_code",
    value: "Código comercio de la tienda. Largo: 12",
  },
  {
    field: "details[].buy_order",
    value: "Orden de compra de la tienda. Largo máximo: 26",
  },
  {
    field: "details[].status",
    value:
      "Estado de la transacción (INITIALIZED, AUTHORIZED, REVERSED, FAILED, NULLIFIED, PARTIALLY_NULLIFIED, CAPTURED). Largo máximo: 64",
  },
  {
    field: "details[].balance",
    value: "Monto restante para un detalle anulado. Largo máximo: 17",
  },
];

export const webpayPlusMallRefund: ColumnValues[] = webpayPlusRefund;

export const webpayPlusDeferred: ColumnValues[] = [
  {
    field: "token",
    value: "Token de la transacción. Largo máximo: 64",
  },
  {
    field: "authorization_code",
    value: "Código de autorización de la captura diferida. Largo máximo: 6",
  },
  {
    field: "authorization_date",
    value: "Fecha y hora de la autorización.",
  },
  {
    field: "captured_amount",
    value: "Monto capturado. Largo máximo: 6",
  },
  {
    field: "response_code",
    value:
      "Código de resultado de la captura. Si es exitoso es 0,de lo contrario la captura no fue realizada. Largo máximo: 2",
  },
];

export const webpayPlusMallDeferred: ColumnValues[] = webpayPlusDeferred;
