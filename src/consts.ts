import { Route } from "./types/menu";

export const localStorageUserKey = "tbk-user";
export const localStorageFullTransactionDetails =
  "tbk-full-transaction-details";

export const webpayPlusRoutes: Route[] = [
  {
    name: "Webpay Plus",
    path: "/webpay-plus",
  },
  {
    name: "Webpay Plus Diferido",
    path: "/webpay-plus-deferred",
  },
  {
    name: "Webpay Mall",
    path: "/webpay-mall",
  },
  {
    name: "Webpay Mall Diferido",
    path: "/webpay-mall-diferido",
  },
];

export const webpayOneClickRoutes: Route[] = [
  {
    name: "Oneclick Mall",
    path: "/oneclick-mall",
  },
  {
    name: "Oneclick Mall Diferido",
    path: "/oneclick-mall-deferred",
  },
];

export const webpayFullTransactionRoutes: Route[] = [
  {
    name: "Transacción Completa",
    path: "/full-transaction",
  },
  {
    name: "Transacción Completa Diferido",
    path: "/full-transaction-deferred",
  },
  {
    name: "Transacción Completa Mall",
    path: "/full-transaction-mall",
  },
  {
    name: "Transacción Completa Mall Diferido",
    path: "/full-transaction-mall-deferred",
  },
];
