import { NextResponse } from "next/server";
import { refundStandardBrandTransaction } from "@/app/lib/transaccion-completa-standard-brand/data";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      token: string;
      commerce_code: string;
      buy_order: string;
      amount: number;
    };

    const response = await refundStandardBrandTransaction(body.token, {
      commerce_code: body.commerce_code,
      buy_order: body.buy_order,
      amount: Number(body.amount),
    });

    return NextResponse.json(response);
  } catch (error) {
    console.error(error);
    const message =
      error instanceof Error
        ? error.message
        : "Ocurrió un error al reembolsar la transacción.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
