import { jwtVerify } from "jose";
import { NextRequest, NextResponse } from "next/server";

export async function proxy(request: NextRequest) {
 
  const token = request.cookies.get("authToken")?.value;
    console.log("Token from cookies:", token);
    console.log(request.cookies.get("authToken"));
  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);

    const { payload } = await jwtVerify(token, secret);

    console.log("Decoded JWT payload:", payload);

    if (
      request.nextUrl.pathname.startsWith("/dashboard") &&
      payload.role !== "admin"
    ) {
      return NextResponse.redirect(new URL("/unauthorized", request.url));
    }

    return NextResponse.next();
  } catch {
    return NextResponse.redirect(new URL("/dashboard/home", request.url));
  }
}

export const config = {
  matcher: [],
};