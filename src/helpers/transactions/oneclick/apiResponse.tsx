import { ColumnValues } from "@/components/table/Table";

export const OneClickMallAuthorize: ColumnValues[] = [
  {
    field: "buy_order",
    value:
      "Orden de compra de la tienda del mall. Este número debe ser único para cada transacción. Largo máximo: 26. La orden de compra puede tener: Números, letras, mayúsculas y minúsculas, y los signos |_=&%.,~:/?[+!@()>-. Los caracteres con signos no están soportados, como los acentos o signos no especificados.",
  },
  {
    field: "card_detail",
    value:
      "Objeto que contiene información de la tarjeta utilizado por el tarjetahabiente.",
  },
  {
    field: "card_detail.card_number",
    value: "Los últimos 4 dígitos de la tarjeta usada en la transacción.",
  },
  {
    field: "accounting_date",
    value: "Fecha contable de la autorización del pago.",
  },
  {
    field: "transaction_date",
    value: "Fecha completa (timestamp) de la autorización del pago. ISO 8601",
  },
  {
    field: "details",
    value: "Lista con el resultado de cada transacción de las tiendas hijas.",
  },
  {
    field: "details [].amount",
    value: "Monto de la transacción de pago.",
  },
  {
    field: "details [].status",
    value:
      "Estado de la transacción (INITIALIZED, AUTHORIZED, REVERSED, FAILED, NULLIFIED, PARTIALLY_NULLIFIED, CAPTURED).",
  },
  {
    field: "details [].authorization_code",
    value: "Código de autorización de la transacción de pago.",
  },
  {
    field: "details [].payment_type_code",
    value: [
      "Tipo de pago de la transaccion.",
      "VD = Venta Débito.",
      "VP = Venta prepago",
      "VN = Venta Normal.",
      "VC = Venta en cuotas.",
      "SI = 3 cuotas sin interés.",
      "S2 = 2 cuotas sin interés.",
      "NC = N Cuotas sin interés",
    ],
  },
  {
    field: "details [].response_code",
    value: `Código del resultado del pago, donde: 0 (cero) es aprobado. Valores posibles:
      0 = Transacción aprobada
      Puedes revisar los códigos de respuesta de rechazo en el siguiente link
      Algunos códigos específicos para Oneclick son:
      -96: tbk_user no existente
      -97: Límites Oneclick, máximo monto diario de pago excedido.
      -98: Límites Oneclick, máximo monto de pago excedido
      -99: Límites Oneclick, máxima cantidad de pagos diarios excedido.`,
  },
  {
    field: "details [].installments_number",
    value: "Cantidad de cuotas de la transacción de pago.",
  },
  {
    field: "details [].commerce_code",
    value: "Código de comercio del comercio hijo (tienda).",
  },
  {
    field: "details [].buy_order",
    value:
      "Orden de compra generada por el comercio hijo para la transacción de pago.",
  },
];

export const OneClickMallStatus: ColumnValues[] = [
  {
    field: "type",
    value:
      "Tipo de reembolso, REVERSED o NULLIFIED, si es REVERSED no se devolverán datos de la transacción (authorization code, etc). Largo máximo: 10",
  },
  {
    field: "authorization_code",
    value: "(Solo si es NULLIFIED) Código de autorización. Largo máximo: 6",
  },
  {
    field: "authorization_date",
    value: "(Solo si es NULLIFIED) Fecha de la autorización de la transacción",
  },
  {
    field: "nullified_amount",
    value: "(Solo si es NULLIFIED) Monto anulado. Largo máximo: 17",
  },
  {
    field: "balance",
    value:
      "(Solo si es NULLIFIED) Monto restante de la transacción de pago original: monto inicial – monto anulado. Largo máximo: 17",
  },
  {
    field: "response_code",
    value:
      "(Solo si es NULLIFIED) Código del resultado del pago, donde: 0 (cero) es aprobado. Largo máximo: 2",
  },
  {
    field: "buy_order",
    value:
      "(Solo si es NULLIFIED) Orden de compra generada por el comercio hijo para la transacción de pago. Largo máximo: 26.",
  },
];

export const OneClickMallRefund: ColumnValues[] = [
  {
    field: "type",
    value:
      "Tipo de reembolso, REVERSED o NULLIFIED, si es REVERSED no se devolverán datos de la transacción (authorization code, etc). Largo máximo: 10",
  },
  {
    field: "authorization_code",
    value: "(Solo si es NULLIFIED) Código de autorización. Largo máximo: 6",
  },
  {
    field: "authorization_date",
    value: "(Solo si es NULLIFIED) Fecha de la autorización de la transacción.",
  },
  {
    field: "nullified_amount",
    value: "(Solo si es NULLIFIED) Monto anulado. Largo máximo: 17",
  },
  {
    field: "balance",
    value:
      "(Solo si es NULLIFIED) Monto restante de la transacción de pago original: monto inicial – monto anulado. Largo máximo: 17",
  },
  {
    field: "response_code",
    value:
      "(Solo si es NULLIFIED) Código del resultado del pago, donde: 0 (cero) es aprobado. Largo máximo: 2",
  },
  {
    field: "buy_order",
    value:
      "(Solo si es NULLIFIED) Orden de compra generada por el comercio hijo para la transacción de pago. Largo máximo: 26.",
  },
];

export const OneClickMallCapture: ColumnValues[] = [
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
