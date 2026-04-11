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

async function proxyRequest(request: NextRequest, params: { path: string[] }) {
  const targetUrl = buildTargetUrl(request, params.path);

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
