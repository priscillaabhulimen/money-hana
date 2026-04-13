import { API_URL } from "@/lib/env";
import { NextRequest } from "next/server";

const HOP_BY_HOP_HEADERS = new Set([
  "connection",
  "keep-alive",
  "proxy-authenticate",
  "proxy-authorization",
  "te",
  "trailer",
  "transfer-encoding",
  "upgrade",
  "host",
  "content-length",
]);

function buildTargetUrl(request: NextRequest, path: string[]) {
  const target = new URL(`${API_URL}/${path.join("/")}`);
  request.nextUrl.searchParams.forEach((value, key) => {
    target.searchParams.append(key, value);
  });
  return target;
}

function isSelfProxy(targetUrl: URL, request: NextRequest) {
  const targetPath = targetUrl.pathname.replace(/\/+$/, "");
  const requestPath = request.nextUrl.pathname.replace(/\/+$/, "");
  const sameOrigin = targetUrl.origin === request.nextUrl.origin;
  return sameOrigin && (targetPath === "/api" || requestPath.startsWith(targetPath));
}

async function proxyRequest(request: NextRequest, params: { path: string[] }) {
  try {
    const targetUrl = buildTargetUrl(request, params.path);

    if (isSelfProxy(targetUrl, request)) {
      return Response.json(
        {
          message:
            "API proxy is misconfigured: API_URL points to this frontend (/api), which creates a proxy loop.",
        },
        { status: 500 },
      );
    }

    const headers = new Headers();
    request.headers.forEach((value, key) => {
      const normalized = key.toLowerCase();
      if (!HOP_BY_HOP_HEADERS.has(normalized)) {
        headers.set(key, value);
      }
    });

    const method = request.method.toUpperCase();
    const body = method === "GET" || method === "HEAD" ? undefined : await request.text();

    const upstreamResponse = await fetch(targetUrl, {
      method,
      headers,
      body,
      cache: "no-store",
      redirect: "manual",
    });

    return new Response(upstreamResponse.body, {
      status: upstreamResponse.status,
      statusText: upstreamResponse.statusText,
      headers: upstreamResponse.headers,
    });
  } catch (error) {
    console.error("Proxy request failed", {
      path: params.path.join("/"),
      error,
    });

    return Response.json(
      {
        message:
          "Unable to reach upstream API. Verify API_URL is set to the backend URL (for example, https://your-api.onrender.com/api/v1).",
      },
      { status: 502 },
    );
  }
}

export async function GET(request: NextRequest, context: { params: Promise<{ path: string[] }> }) {
  const params = await context.params;
  return proxyRequest(request, params);
}

export async function POST(request: NextRequest, context: { params: Promise<{ path: string[] }> }) {
  const params = await context.params;
  return proxyRequest(request, params);
}

export async function PUT(request: NextRequest, context: { params: Promise<{ path: string[] }> }) {
  const params = await context.params;
  return proxyRequest(request, params);
}

export async function PATCH(request: NextRequest, context: { params: Promise<{ path: string[] }> }) {
  const params = await context.params;
  return proxyRequest(request, params);
}

export async function DELETE(request: NextRequest, context: { params: Promise<{ path: string[] }> }) {
  const params = await context.params;
  return proxyRequest(request, params);
}

export async function OPTIONS(request: NextRequest, context: { params: Promise<{ path: string[] }> }) {
  const params = await context.params;
  return proxyRequest(request, params);
}
