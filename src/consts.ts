import { Route } from "./types/menu";

export const localStorageUserKey = "tbk-user";
export const localStorageFullTransactionDetails =
  "tbk-full-transaction-details";
export const patpassJToken = "tbk-patpass-jtoken";

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
    path: "/transaccion-completa",
  },
  {
    name: "Transacción Completa Diferido",
    path: "/transaccion-completa-diferido",
  },
  {
    name: "Transacción Completa Mall",
    path: "/transaccion-completa-mall",
  },
  {
    name: "Transacción Completa Mall Diferido",
    path: "/transaccion-completa-mall-diferido",
  },
];

export const patpassTransactionRoutes: Route[] = [
  {
    name: "Patpass Comercio",
    path: "/patpass-comercio",
  },
];
