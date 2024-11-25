import { Route, MenuRoute } from "./types/menu";

export const localStorageUserKey = "tbk-user";
export const localStorageFullTransactionDetails =
  "tbk-full-transaction-details";
export const localStorageFourFlow = "tbk-data-invalid-flow";
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

export const apiWebpayPlusRoutes: Route[] = [
  {
    name: "Webpay Plus",
    path: "/api-reference/webpay-plus",
  },
  {
    name: "Webpay Plus Diferido",
    path: "/api-reference/webpay-plus-deferred",
  },
  {
    name: "Webpay Mall",
    path: "/api-reference/webpay-mall",
  },
  {
    name: "Webpay Mall Diferido",
    path: "/api-reference/webpay-mall-deferred",
  },
];

export const apiWebpayOneClickRoutes: Route[] = [
  {
    name: "Oneclick Mall",
    path: "/api-reference/oneclick-mall",
  },
  {
    name: "Oneclick Mall Diferido",
    path: "/api-reference/oneclick-mall-deferred",
  },
];

export const apiWebpayFullTransactionRoutes: Route[] = [
  {
    name: "Transacción Completa",
    path: "/api-reference/transaccion-completa",
  },
  {
    name: "Transacción Completa Diferido",
    path: "/api-reference/transaccion-completa-deferred",
  },
  {
    name: "Transacción Completa Mall",
    path: "/api-reference/transaccion-completa-mall",
  },
  {
    name: "Transacción Completa Mall Diferido",
    path: "/api-reference/transaccion-completa-mall-deferred",
  },
];

export const apiPatpassTransactionRoutes: Route[] = [
  {
    name: "Patpass Comercio",
    path: "/api-reference/patpass-comercio",
  },
];

export const apiRefSidebar: MenuRoute[] = [
  {
    category: "Webpay Plus",
    routes: apiWebpayPlusRoutes,
  },
  {
    category: "Webpay Oneclick",
    routes: apiWebpayOneClickRoutes,
  },
  {
    category: "Webpay Transacción Completa",
    routes: apiWebpayFullTransactionRoutes,
  },
];
