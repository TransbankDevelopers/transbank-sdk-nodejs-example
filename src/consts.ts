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
    path: "/api-reference/transaccion-completa-diferido",
  },
  {
    name: "Transacción Completa Mall",
    path: "/api-reference/transaccion-completa-mall",
  },
  {
    name: "Transacción Completa Mall Diferido",
    path: "/api-reference/transaccion-completa-mall-diferido",
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

export interface SidebarSection {
  title: string;
  fullRoute?: string;
  collapsibles?: {
    title: string;
    fullRoute: string;
    apiReferenceRoute?: string;
    apiSections?: string[];
  }[];
}

export const sidebarConfig: SidebarSection[] = [
  {
    title: "Webpay Plus",
    collapsibles: [
      {
        title: "Webpay Plus",
        fullRoute: "/webpay-plus",
        apiReferenceRoute: "/api-reference/webpay-plus",
        apiSections: ["api-status", "api-refund"],
      },
      {
        title: "Webpay Plus Mall",
        fullRoute: "/webpay-mall",
        apiReferenceRoute: "/api-reference/webpay-mall",
        apiSections: ["api-status", "api-refund"],
      },
      {
        title: "Webpay Plus Diferido",
        fullRoute: "/webpay-plus-deferred",
        apiReferenceRoute: "/api-reference/webpay-plus-deferred",
        apiSections: ["api-status", "api-capture", "api-refund"],
      },
      {
        title: "Webpay Plus Mall Diferido",
        fullRoute: "/webpay-mall-deferred",
        apiReferenceRoute: "/api-reference/webpay-mall-deferred",
        apiSections: ["api-status", "api-capture", "api-refund"],
      },
    ],
  },
  {
    title: "Webpay Oneclick",
    collapsibles: [
      {
        title: "Oneclick Mall",
        fullRoute: "/oneclick-mall",
        apiReferenceRoute: "/api-reference/oneclick-mall",
        apiSections: ["api-authorize", "api-status", "api-refund"],
      },
      {
        title: "Oneclick Mall Diferido",
        fullRoute: "/oneclick-mall-deferred",
        apiReferenceRoute: "/api-reference/oneclick-mall-deferred",
        apiSections: [
          "api-authorize",
          "api-status",
          "api-capture",
          "api-refund",
        ],
      },
    ],
  },
  {
    title: "Webpay transaccion completa",
    collapsibles: [
      {
        title: "Transaccion Completa",
        fullRoute: "/transaccion-completa",
        apiReferenceRoute: "/api-reference/transaccion-completa",
        apiSections: ["api-status", "api-refund"],
      },
      {
        title: "Transaccion Completa Mall",
        fullRoute: "/transaccion-completa-mall",
        apiReferenceRoute: "/api-reference/transaccion-completa-mall",
        apiSections: ["api-status", "api-refund"],
      },
      {
        title: "Transaccion Completa Diferido",
        fullRoute: "/transaccion-completa-diferido",
        apiReferenceRoute: "/api-reference/transaccion-completa-diferido",
        apiSections: ["api-status", "api-capture", "api-refund"],
      },
      {
        title: "Transaccion Completa Mall Diferido",
        fullRoute: "/transaccion-completa-mall-diferido",
        apiReferenceRoute: "/api-reference/transaccion-completa-mall-diferido",
        apiSections: ["api-status", "api-capture", "api-refund"],
      },
    ],
  },
  {
    title: "Patpass",
    fullRoute: "/patpass",
  },
];
