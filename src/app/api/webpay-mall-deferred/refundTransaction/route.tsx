import { NextResponse } from "next/server";
import { refundTransaction } from "@/app/lib/webpay-mall-diferido/data";

export async function POST(request: Request) {
  const formData = await request.formData();
  const token = formData.get("token") as string;
  const commerceCode = formData.get("commerceCode") as string;
  const buyOrder = formData.get("buyOrder") as string;
  const amount = Number(formData.get("amount"));

  try {
    const trxStatus = await refundTransaction(
      token,
      amount,
      buyOrder,
      commerceCode
    );

    return NextResponse.json(trxStatus);
  } catch (error) {
    console.error(error);
    let errorMessage = "Ocurrió un error al hacer refund de la transacción.";
    if (error instanceof Error) {
      errorMessage = error.message;
    } else if (typeof error === "string") {
      errorMessage = error;
    }

    return NextResponse.json({ error: errorMessage });
  }
}
