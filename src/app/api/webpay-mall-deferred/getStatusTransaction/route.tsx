import { NextResponse } from "next/server";
import { getStatusTransaction } from "@/app/lib/webpay-mall-diferido/data";

export async function POST(request: Request) {
  const formData = await request.formData();
  const token = formData.get("token") as string;

  try {
    const trxStatus = await getStatusTransaction(token);
    return NextResponse.json(trxStatus);
  } catch (error) {
    console.error(error);
    let errorMessage =
      "Ocurrió un error al obtener el estado de la transacción.";
    if (error instanceof Error) {
      errorMessage = error.message;
    } else if (typeof error === "string") {
      errorMessage = error;
    }

    return NextResponse.json({ error: errorMessage });
  }
}
