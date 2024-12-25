import { NextResponse } from "next/server";

export async function GET() {
  try {
    const res = await fetch(`${process.env.HOST_DOMAIN}/csrf`);
    if (!res.ok) {
      throw new Error("Network response was not ok");
    }
    return res;
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }
}
