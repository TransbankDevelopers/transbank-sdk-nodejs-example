import { redirect } from "next/navigation";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { localStorageFourFlow } from "@/consts";

export async function POST(req: Request) {
  const cookiesStore = cookies();
  const contentType = req.headers.get("content-type");

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
  cookiesStore.set(localStorageFourFlow, JSON.stringify(body), {
    httpOnly: true,
    path: "/invalid",
    maxAge: 60,
  });

  return redirect("/invalid");
}
