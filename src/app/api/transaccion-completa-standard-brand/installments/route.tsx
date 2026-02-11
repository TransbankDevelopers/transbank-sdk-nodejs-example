import { NextResponse } from "next/server";
import { installmentsStandardBrandTransaction } from "@/app/lib/transaccion-completa-standard-brand/data";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      token: string;
      buy_order: string;
      commerce_code: string;
      installments_number: number;
    };

    const response = await installmentsStandardBrandTransaction(body.token, {
      buy_order: body.buy_order,
      commerce_code: body.commerce_code,
      installments_number: Number(body.installments_number),
    });

    return NextResponse.json(response);
  } catch (error) {
    console.error(error);
    const message =
      error instanceof Error
        ? error.message
        : "Ocurrió un error al consultar cuotas.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
