import { NextResponse } from "next/server";
import { commitStandardBrandTransaction } from "@/app/lib/transaccion-completa-standard-brand/data";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      token: string;
      commerce_code: string;
      buy_order: string;
      id_query_installments?: number;
    };

    const response = await commitStandardBrandTransaction(body.token, {
      details: [
        {
          commerce_code: body.commerce_code,
          buy_order: body.buy_order,
          id_query_installments:
            body.id_query_installments !== undefined
              ? Number(body.id_query_installments)
              : undefined,
        },
      ],
    });

    return NextResponse.json(response);
  } catch (error) {
    console.error(error);
    const message =
      error instanceof Error
        ? error.message
        : "Ocurrió un error al confirmar la transacción.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
