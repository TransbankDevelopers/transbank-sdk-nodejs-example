import { NextResponse } from "next/server";
import { getStatusOneclickMallTransaction } from "@/app/lib/oneclick-mall/data";

export async function POST(request: Request) {
  const formData = await request.formData();
  const buyOrder = formData.get("buyOrder") as string;

  try {
    const trxStatus = await getStatusOneclickMallTransaction(buyOrder);

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
