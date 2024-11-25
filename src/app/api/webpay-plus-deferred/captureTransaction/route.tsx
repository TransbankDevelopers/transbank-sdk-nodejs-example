import { NextResponse } from "next/server";
import { captureTransaction } from "@/app/lib/webpay-plus-deferred/data";

export async function POST(request: Request) {
  const formData = await request.formData();
  const token = formData.get("token") as string;
  const buyOrder = formData.get("buyOrder") as string;
  const authorizationCode = formData.get("authorizationCode") as string;
  const captureAmount = Number(formData.get("amount"));

  try {
    const trxStatus = await captureTransaction({
      token,
      buyOrder,
      authorizationCode,
      captureAmount,
    });

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
