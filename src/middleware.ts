import { NextResponse, NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const routeMapping: { [key: string]: string } = {
    "/webpay-plus/commit": "/api/webpay-plus/commit",
    "/webpay-mall/commit": "/api/webpay-mall/commit",
    "/webpay-mall-diferido/commit": "/api/webpay-mall-diferido/commit",
    "/webpay-plus-deferred/commit": "/api/webpay-plus-deferred/commit",
    "/oneclick-mall/finish": "/api/oneclick-mall/finish",
    "/oneclick-mall-deferred/finish": "/api/oneclick-mall-deferred/finish",
  };

  if (request.method === "POST" && pathname in routeMapping) {
    const apiRoute = routeMapping[pathname];
    return NextResponse.rewrite(new URL(apiRoute, request.nextUrl.origin));
  }

  return NextResponse.next();
}
