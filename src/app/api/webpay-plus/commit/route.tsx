import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();

  // Convertir el body a una cadena JSON y codificarlo para pasarlo en la URL
  const errorData = encodeURIComponent(JSON.stringify(body));
  return NextResponse.redirect(`/webpay-plus/commit/error?data=${errorData}`);
}
