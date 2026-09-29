import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { maintenanceEnabled } from "@/lib/maintenance";

function requestHeaders(request: NextRequest, bare: boolean) {
  const headers = new Headers(request.headers);
  headers.delete("x-beehive-maintenance");
  if (bare) headers.set("x-beehive-maintenance", "1");
  return headers;
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (pathname.startsWith("/admin")) {
    return NextResponse.next({
      request: { headers: requestHeaders(request, false) },
    });
  }

  const on = await maintenanceEnabled();
  const preview = pathname === "/maintenance";
  if (!on && !preview) {
    return NextResponse.next({
      request: { headers: requestHeaders(request, false) },
    });
  }

  const headers = requestHeaders(request, true);
  if (preview) {
    return NextResponse.next({ request: { headers } });
  }

  const url = request.nextUrl.clone();
  url.pathname = "/maintenance";
  return NextResponse.rewrite(url, {
    status: 503,
    request: { headers },
  });
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|icon.svg|apple-icon.png|logo/|photos/).*)",
  ],
};
