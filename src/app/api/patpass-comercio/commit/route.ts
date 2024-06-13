import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { patpassJToken } from "@/consts";

export async function POST(req: Request) {
  const contentType = req.headers.get("content-type");

  const cookiesStore = cookies();
  let body;
  if (contentType === "application/json") {
    body = await req.json();
  } else if (contentType === "text/plain") {
    body = await req.text();
  } else if (contentType === "application/x-www-form-urlencoded") {
    const textBody = await req.text();
    body = Object.fromEntries(new URLSearchParams(textBody));
  } else {
    console.error("Unknown content type:", contentType);
    return NextResponse.error();
  }

  cookiesStore.set(patpassJToken, JSON.stringify(body));
  return NextResponse.redirect(
    `${process.env.NGROK_SUBDOMAIN}/patpass-comercio/commit`
  );
}
