import { NextResponse } from "next/server";
import { refundOneClickMallTransaction } from "@/app/lib/oneclick-mall/data";

export async function POST(request: Request) {
  const formData = await request.formData();
  const childBuyOrder = formData.get("childBuyOrder") as string;
  const childCommerceCode = formData.get("childCommerceCode") as string;
  const buyOrder = formData.get("buyOrder") as string;
  const amount = Number(formData.get("amount"));
  const isDeferred = true;

  try {
    const trxStatus = await refundOneClickMallTransaction({
      buyOrder,
      childCommerceCode,
      childBuyOrder,
      amount,
      isDeferred,
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
