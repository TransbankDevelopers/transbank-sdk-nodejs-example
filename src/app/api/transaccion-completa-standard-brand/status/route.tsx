import { NextResponse } from "next/server";
import { statusStandardBrandTransaction } from "@/app/lib/transaccion-completa-standard-brand/data";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { token: string };
    const response = await statusStandardBrandTransaction(body.token);
    return NextResponse.json(response);
  } catch (error) {
    console.error(error);
    const message =
      error instanceof Error
        ? error.message
        : "Ocurrió un error al consultar el estado.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
