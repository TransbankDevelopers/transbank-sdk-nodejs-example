import { createFullTransactionMallTransaction } from "@/app/lib/transaccion-completa-mall/data";
import { CreditCard } from "@/components/creditcard/CreditCard";
import { localStorageFullTransactionDetails } from "@/consts";
import { NextApiRequest } from "next";
import { cookies } from "next/headers";

export async function POST(req: NextApiRequest) {
  const cookiesStore = cookies();
  const jsonChunks = [];

  for await (const chunk of req.body) {
    jsonChunks.push(chunk);
  }

  const body = JSON.parse(Buffer.concat(jsonChunks).toString());

  if (!body) {
    const errorMessage = "No credit card data found";
    console.log(errorMessage);
    return new Response(errorMessage, {
      status: 500,
    });
  }

  const requiredFields = ["number", "expiry", "cvc", "name"];

  for (const field of requiredFields) {
    if (!body[field]) {
      console.log(`Missing required field: ${field}`);
    }
  }

  const cardState: Omit<CreditCard, "focus"> = {
    number: body.number,
    expiry: body.expiry,
    cvc: body.cvc,
    name: body.name,
  };

  try {
    const { token, details } = await createFullTransactionMallTransaction(
      cardState
    );

    cookiesStore.set(
      localStorageFullTransactionDetails,
      JSON.stringify(details)
    );

    return new Response(token, {
      status: 200,
    });
  } catch (_error) {
    const error = _error as Error;
    return new Response(error.message, {
      status: 500,
    });
  }
}
